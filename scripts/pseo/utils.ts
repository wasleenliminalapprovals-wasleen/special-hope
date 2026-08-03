/**
 * Shared helpers for the pSEO generation engine.
 * - `sleep` — delay for retry/backoff
 * - `parseJsonContent` — extract + parse the JSON object DeepSeek returns
 *   (defends against stray code fences or prose around the JSON)
 */
import { existsSync } from "node:fs";
import { join } from "node:path";
import { ROOT } from "./queue";

/**
 * Load `.env.local` into `process.env` (dependency-free, Node 20.12+ built-in).
 *
 * Safe to call from any script:
 *   - no-op when the key is already provided (CI secrets / shell env)
 *   - no-op when `.env.local` is missing (so the app still builds pre-pilot)
 *   - never overwrites an already-set variable
 */
export function loadEnvLocal(): void {
  if (process.env.DEEPSEEK_API_KEY) return;
  const path = join(ROOT, ".env.local");
  if (!existsSync(path)) return;
  try {
    process.loadEnvFile(path);
  } catch (err) {
    console.warn(`loadEnvLocal: could not load ${path}: ${(err as Error).message}`);
  }
}

/** Promise-based delay. */
export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Extract a JSON object from a model response. DeepSeek JSON-mode usually
 * returns pure JSON, but we defensively strip Markdown code fences and trim
 * any prose before/after the first `{` … last `}`.
 */
export function parseJsonContent<T = unknown>(content: string): T {
  let text = content.trim();

  // Strip ```json ... ``` fences if present.
  const fence = text.match(/```(?:json)?\s*([\s\S]*?)```/i);
  if (fence) text = fence[1].trim();

  // Find the outermost JSON object.
  const firstBrace = text.indexOf("{");
  const lastBrace = text.lastIndexOf("}");
  if (firstBrace === -1 || lastBrace === -1 || lastBrace < firstBrace) {
    throw new Error(`No JSON object found in model output: ${text.slice(0, 200)}`);
  }
  const json = text.slice(firstBrace, lastBrace + 1);

  try {
    return JSON.parse(json) as T;
  } catch (err) {
    throw new Error(`Failed to parse model JSON: ${(err as Error).message} (input: ${json.slice(0, 200)})`);
  }
}

/** Normalize text for similarity / word-count checks (lowercase, strip punctuation). */
export function normalizeText(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9\u0600-\u06FF\s]/g, " ").replace(/\s+/g, " ").trim();
}

/** Count words (EN + Arabic-aware: splits on whitespace). */
export function wordCount(text: string): number {
  const normalized = text.trim().replace(/\s+/g, " ");
  return normalized.length === 0 ? 0 : normalized.split(/\s+/).length;
}

/** True when `outer` contains `needle` (case-insensitive, optional whole-word). */
export function contains(outer: string, needle: string): boolean {
  return normalizeText(outer).includes(normalizeText(needle));
}
