import { NextRequest } from "next/server";
import { getSession } from "@/lib/auth";
import { db } from "@/lib/db";

// Common generic words to skip during keyword extraction
const SKIP_WORDS = new Set([
  "a", "an", "the", "is", "it", "in", "on", "at", "to", "of", "for", "and",
  "or", "but", "not", "with", "as", "by", "this", "that", "from", "was",
  "were", "be", "been", "being", "have", "has", "had", "do", "does", "did",
  "will", "would", "could", "should", "can", "may", "might", "shall", "must",
  "am", "are", "i", "me", "my", "we", "our", "you", "your", "he", "she",
  "his", "her", "they", "them", "their", "its", "what", "which", "who",
  "whom", "how", "when", "where", "why", "if", "then", "so", "no", "yes",
  "all", "each", "every", "both", "few", "more", "most", "other", "some",
  "such", "only", "own", "same", "than", "too", "very", "just", "about",
  "above", "after", "again", "any", "because", "before", "between", "during",
  "into", "through", "under", "until", "up", "down", "out", "off", "over",
  "also", "here", "there", "once", "get", "got", "need", "want", "know",
  "like", "use", "make", "way", "find", "many", "much", "well", "still",
  "even", "new", "give", "look", "come", "take", "try", "ask", "tell",
  "think", "work", "call", "seem", "feel", "point", "hand", "keep", "turn",
  "begin", "show", "part", "help", "question", "doubt", "problem", "please",
  "thank", "thanks", "hello", "hi", "sir", "maam",
]);

/**
 * Extract significant keywords from text using frequency-based heuristics.
 * Returns top N keywords by frequency, filtering out common words.
 */
function extractKeywords(text: string, maxTags: number = 5): string[] {
  const cleaned = text
    .toLowerCase()
    .replace(/[^\w\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  const words = cleaned.split(" ").filter(
    (w) => w.length > 2 && !SKIP_WORDS.has(w) && !/^\d+$/.test(w)
  );

  // Count frequency
  const freq: Record<string, number> = {};
  for (const w of words) {
    freq[w] = (freq[w] || 0) + 1;
  }

  // Sort by frequency desc, then alphabetically
  const sorted = Object.entries(freq)
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .slice(0, maxTags)
    .map(([word]) => word);

  return sorted;
}

// POST /api/doubts/[id]/generate-tags — generate tags for a doubt
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

    const doubt = await db.doubt.findUnique({
      where: { id },
      include: { subject: true, chapter: true },
    });

    if (!doubt) {
      return Response.json(
        { success: false, error: "Doubt not found" },
        { status: 404 }
      );
    }

    let tags: string[];

    // If ANTHROPIC_API_KEY is set, try Claude for better tag generation
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
            max_tokens: 100,
            messages: [
              {
                role: "user",
                content: `Generate 3-5 relevant academic tags for this doubt. Return ONLY a JSON array of lowercase strings, no explanation.\n\nSubject: ${doubt.subject.name}\nChapter: ${doubt.chapter.name}\nTitle: ${doubt.title}\nDescription: ${doubt.description}`,
              },
            ],
          }),
        });

        if (response.ok) {
          const data = await response.json();
          const content = data.content?.[0]?.text || "";
          const parsed = JSON.parse(content);
          if (Array.isArray(parsed) && parsed.every((t: unknown) => typeof t === "string")) {
            tags = parsed.slice(0, 5);
          } else {
            throw new Error("Invalid AI response format");
          }
        } else {
          throw new Error(`Anthropic API error: ${response.status}`);
        }
      } catch (aiErr) {
        console.error("AI tagging failed, falling back to keyword extraction:", aiErr);
        tags = extractKeywords(`${doubt.title} ${doubt.description}`, 5);
      }
    } else {
      // Fallback: keyword extraction
      tags = extractKeywords(`${doubt.title} ${doubt.description}`, 5);
    }

    // Add subject and chapter as tags if not already present
    const subjectTag = doubt.subject.name.toLowerCase();
    const chapterTag = doubt.chapter.name.toLowerCase();
    if (!tags.includes(subjectTag)) tags.unshift(subjectTag);
    if (!tags.includes(chapterTag)) tags.splice(1, 0, chapterTag);
    tags = tags.slice(0, 7); // max 7 tags

    // Save tags to doubt
    const updated = await db.doubt.update({
      where: { id },
      data: { tags },
    });

    return Response.json({ success: true, data: { tags: updated.tags } });
  } catch (error) {
    console.error("Error generating tags:", error);
    return Response.json(
      { success: false, error: "Failed to generate tags" },
      { status: 500 }
    );
  }
}
