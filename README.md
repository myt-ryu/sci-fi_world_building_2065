# Sci-Fi World Building 2065

React + Vite + Tailwind CSS v4 で作成した 2065 年世界設定サイトです。

## Local Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## AI Chat Architecture

- クライアントは `src/components/features/ai-guide/aiService.ts` から `/api/chat` を呼びます。
- AI プロバイダ呼び出しは `api/chat.ts`（Vercel Functions）で実行します。
- API キーはサーバー側環境変数のみで扱います（ブラウザに公開しない）。

## Environment Variables

`.env.example` をコピーして `.env` を作成してください。

```bash
cp .env.example .env
```

Required:

- `OPENAI_API_KEY`
- `OPENAI_MODEL` (default: `gpt-4.1-mini`)

Optional (local dev only):

- `VITE_GEMINI_API_KEY`
- `VITE_GEMINI_MODEL` (default: `gemini-2.5-flash`)

When `npm run dev` and `VITE_GEMINI_API_KEY` is set, the chat uses Gemini directly from the browser for local testing.
Production deployment continues to use `/api/chat` (server-side OpenAI).

## Deploy (Vercel)

1. GitHub に push
2. Vercel でプロジェクトを Import
3. Build Command: `npm run build`
4. Output Directory: `dist`
5. Vercel の Environment Variables に以下を設定
   - `OPENAI_API_KEY`
   - `OPENAI_MODEL`
6. Deploy

## Security Notes

- `VITE_` プレフィックスの環境変数はブラウザへ埋め込まれます。
- API キーは必ず `VITE_` なしでサーバー側のみで利用してください。
- もしキーを公開してしまった場合は、即時ローテーション（再発行）してください。
