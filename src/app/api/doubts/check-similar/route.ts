import { NextRequest } from "next/server";
import { getSession } from "@/lib/auth";
import { db } from "@/lib/db";

// Common English stopwords to strip from text for better similarity matching
const STOPWORDS = new Set([
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
  "please", "help", "question", "doubt", "problem", "issue", "understand",
]);

/**
 * Normalize text for comparison:
 * - lowercase
 * - strip punctuation
 * - remove stopwords
 * - return set of unique tokens
 */
function tokenize(text: string): Set<string> {
  const cleaned = text
    .toLowerCase()
    .replace(/[^\w\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  const tokens = cleaned.split(" ").filter(
    (t) => t.length > 1 && !STOPWORDS.has(t)
  );

  return new Set(tokens);
}

/**
 * Compute Jaccard similarity between two token sets.
 * J(A,B) = |A ∩ B| / |A ∪ B|
 */
function jaccardSimilarity(a: Set<string>, b: Set<string>): number {
  if (a.size === 0 && b.size === 0) return 0;

  let intersection = 0;
  for (const token of a) {
    if (b.has(token)) intersection++;
  }

  const union = a.size + b.size - intersection;
  return union === 0 ? 0 : intersection / union;
}

// GET /api/doubts/check-similar?title=...&subjectId=...
export async function GET(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return Response.json(
        { success: false, error: "Not authenticated" },
        { status: 401 }
      );
    }

    const { searchParams } = request.nextUrl;
    const title = searchParams.get("title");
    const subjectId = searchParams.get("subjectId");

    if (!title || title.length < 3) {
      return Response.json({ success: true, data: [] });
    }

    const queryTokens = tokenize(title);
    if (queryTokens.size === 0) {
      return Response.json({ success: true, data: [] });
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const where: any = {};
    if (subjectId) where.subjectId = subjectId;

    // Fetch candidates from the same subject (limit to recent 200 for performance)
    const candidates = await db.doubt.findMany({
      where,
      select: {
        id: true,
        title: true,
        description: true,
        status: true,
        _count: { select: { answers: true } },
      },
      take: 200,
      orderBy: { createdAt: "desc" },
    });

    // Compute similarity scores
    const scored = candidates
      .map((doubt) => {
        const doubtTokens = tokenize(`${doubt.title} ${doubt.description}`);
        const score = jaccardSimilarity(queryTokens, doubtTokens);
        return { ...doubt, similarityScore: Math.round(score * 100) / 100 };
      })
      .filter((d) => d.similarityScore >= 0.3)
      .sort((a, b) => b.similarityScore - a.similarityScore)
      .slice(0, 5);

    // Future upgrade path: For embedding-based similarity, add a pgvector
    // extension to PostgreSQL, store embeddings in a vector column on Doubt,
    // and use a cosine similarity query via Prisma raw SQL:
    //   SELECT id, title, 1 - (embedding <=> $queryEmbedding) as similarity
    //   FROM doubts ORDER BY embedding <=> $queryEmbedding LIMIT 5;

    return Response.json({ success: true, data: scored });
  } catch (error) {
    console.error("Error checking similar doubts:", error);
    return Response.json(
      { success: false, error: "Failed to check similar doubts" },
      { status: 500 }
    );
  }
}
