import { sleep } from "./utils";

const API_URL = "https://api.deepseek.com/chat/completions";
const MODEL = "deepseek-chat";

export interface DeepSeekCallOptions {
  system: string;
  user: string;
  /** Use DeepSeek JSON output mode. */
  jsonMode?: boolean;
  maxTokens?: number;
  temperature?: number;
}

/** Call the DeepSeek chat API with retry + exponential backoff (max 4 attempts). */
export async function callDeepSeek(opts: DeepSeekCallOptions, attempt = 1): Promise<string> {
  const apiKey = process.env.DEEPSEEK_API_KEY;
  if (!apiKey) {
    throw new Error("DEEPSEEK_API_KEY is not set (add to .env.local / GitHub Actions secret).");
  }

  const body = {
    model: MODEL,
    messages: [
      { role: "system", content: opts.system },
      { role: "user", content: opts.user },
    ],
    temperature: opts.temperature ?? 0.7,
    max_tokens: opts.maxTokens ?? 4096,
    stream: false,
    ...(opts.jsonMode ? { response_format: { type: "json_object" } } : {}),
  };

  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const text = await res.text().catch(() => "");
      const retriable = res.status === 429 || res.status >= 500 || res.status === 408;
      if (retriable && attempt < 4) {
        const wait = Math.min(2 ** attempt * 2000, 30000);
        console.warn(`DeepSeek ${res.status} on attempt ${attempt}; retrying in ${wait / 1000}s`);
        await sleep(wait);
        return callDeepSeek(opts, attempt + 1);
      }
      throw new Error(`DeepSeek API error ${res.status}: ${text.slice(0, 500)}`);
    }

    const data = (await res.json()) as {
      choices?: { message?: { content?: string } }[];
    };
    const content = data.choices?.[0]?.message?.content;
    if (!content) throw new Error("DeepSeek returned empty content.");
    return content;
  } catch (err) {
    if (attempt < 4) {
      const wait = Math.min(2 ** attempt * 2000, 30000);
      console.warn(`DeepSeek network error on attempt ${attempt}; retrying in ${wait / 1000}s`);
      await sleep(wait);
      return callDeepSeek(opts, attempt + 1);
    }
    throw err;
  }
}
