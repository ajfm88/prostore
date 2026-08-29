import OpenAI from "openai";

// Model used for the admin product-copy helpers
export const AI_MODEL = "gpt-4o-mini";

// Lazily instantiate the client so a missing key never breaks module load.
// `product.actions.ts` is imported by the storefront, so constructing the
// client at import time (OpenAI throws when the key is absent) would take the
// whole app down. We only build it when an AI action actually runs.
let client: OpenAI | null = null;

export function getOpenAI(): OpenAI {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error("OPENAI_API_KEY is not set");
  }
  if (!client) {
    client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  }
  return client;
}

export const REPHRASE_TITLE_SYSTEM_PROMPT = `You are an expert e-commerce copywriter. Rewrite the given product name into a clean, shoppable product title.

Rules:
- Output ONLY the product title — no quotes, no markdown, no explanations.
- Lead with the brand when one is provided, followed by key descriptors and the product type.
- Keep it concise and natural, and use title case.
- Preserve the original meaning and key details from the input.
- Do not invent brands, materials, or details that aren't in the input.
- Keep it under 70 characters.

Return only the rephrased title, nothing else.`;

export const GENERATE_DESCRIPTION_SYSTEM_PROMPT = `You are an expert e-commerce copywriter for an online store.

Write a short, compelling product description from the provided name, category, brand, and any existing description. Highlight quality, materials, fit, or everyday use without repeating the name verbatim.

Rules:
- Output ONLY the description — no markdown, no quotes, no headings.
- Be factual and helpful; write in a warm but professional tone.
- Two to three sentences, under 300 characters.
- Do not invent specs, materials, or claims that aren't implied by the input.
- Do not repeat the product name verbatim.

Return only the description, nothing else.`;
