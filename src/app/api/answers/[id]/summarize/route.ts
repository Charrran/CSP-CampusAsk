import { NextRequest } from "next/server";
import { getSession } from "@/lib/auth";
import { db } from "@/lib/db";

/**
 * Basic extractive summarization: pick the first sentence and up to 2 more
 * "high-information" sentences (longest sentences tend to carry more info).
 */
function extractiveSummarize(text: string, maxSentences: number = 3): string {
  const sentences = text
    .replace(/\n+/g, " ")
    .split(/(?<=[.!?])\s+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 10);

  if (sentences.length <= maxSentences) {
    return sentences.join(" ");
  }

  // Always include the first sentence
  const result = [sentences[0]];
  const remaining = sentences.slice(1);

  // Pick the longest remaining sentences (likely most informative)
  const sorted = remaining
    .map((s, i) => ({ s, i, len: s.length }))
    .sort((a, b) => b.len - a.len)
    .slice(0, maxSentences - 1)
    .sort((a, b) => a.i - b.i); // restore original order

  for (const item of sorted) {
    result.push(item.s);
  }

  return result.join(" ");
}

// POST /api/answers/[id]/summarize — summarize a long answer
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSession();
    if (!session) {
      return Response.json(
        { success: false, error: "Not authenticated" },
        { status: 401 }
      );
    }

    const { id } = await params;

    const answer = await db.answer.findUnique({
      where: { id },
      include: {
        doubt: { select: { title: true, subject: { select: { name: true } } } },
      },
    });

    if (!answer) {
      return Response.json(
        { success: false, error: "Answer not found" },
        { status: 404 }
      );
    }

    // Return cached summary if available
    if (answer.summary) {
      return Response.json({ success: true, data: { summary: answer.summary, cached: true } });
    }

    // Only summarize long answers (>300 words)
    const wordCount = answer.content.split(/\s+/).length;
    if (wordCount <= 300) {
      return Response.json({
        success: true,
        data: { summary: answer.content, cached: false, note: "Answer is short enough; no summarization needed" },
      });
    }

    let summary: string;

    // If ANTHROPIC_API_KEY is set, use Claude for summarization
    const anthropicKey = process.env.ANTHROPIC_API_KEY;
    if (anthropicKey) {
      try {
        const response = await fetch("https://api.anthropic.com/v1/messages", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": anthropicKey,
            "anthropic-version": "2023-06-01",
          },
          body: JSON.stringify({
            model: "claude-sonnet-4-20250514",
            max_tokens: 200,
            messages: [
              {
                role: "user",
                content: `Summarize this academic answer concisely in 2-3 sentences. Keep technical accuracy.\n\nQuestion: ${answer.doubt.title}\nSubject: ${answer.doubt.subject.name}\n\nAnswer:\n${answer.content}`,
              },
            ],
          }),
        });

        if (response.ok) {
          const data = await response.json();
          summary = data.content?.[0]?.text || extractiveSummarize(answer.content);
        } else {
          throw new Error(`Anthropic API error: ${response.status}`);
        }
      } catch (aiErr) {
        console.error("AI summarization failed, using extractive fallback:", aiErr);
        summary = extractiveSummarize(answer.content);
      }
    } else {
      summary = extractiveSummarize(answer.content);
    }

    // Cache the summary
    await db.answer.update({
      where: { id },
      data: { summary },
    });

    return Response.json({ success: true, data: { summary, cached: false } });
  } catch (error) {
    console.error("Error summarizing answer:", error);
    return Response.json(
      { success: false, error: "Failed to summarize answer" },
      { status: 500 }
    );
  }
}
