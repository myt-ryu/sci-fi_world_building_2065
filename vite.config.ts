import { defineConfig, loadEnv, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import chatHandler from './api/chat'

const localApiPlugin = (): Plugin => ({
  name: 'local-api-chat',
  configureServer(server) {
    server.middlewares.use(async (req, res, next) => {
      if (!req.url?.startsWith('/api/chat')) {
        next()
        return
      }

      const method = req.method ?? 'GET'
      const chunks: Uint8Array[] = []

      req.on('data', (chunk: Buffer) => {
        chunks.push(chunk)
      })

      req.on('end', async () => {
        try {
          const bodyText = Buffer.concat(chunks).toString('utf8')
          const headers = new Headers()

          for (const [key, value] of Object.entries(req.headers)) {
            if (typeof value === 'string') headers.set(key, value)
            else if (Array.isArray(value)) headers.set(key, value.join(','))
          }

          const request = new Request(`http://localhost${req.url}`, {
            method,
            headers,
            body: method === 'GET' || method === 'HEAD' ? undefined : bodyText,
          })

          const response = await chatHandler(request)
          res.statusCode = response.status

          response.headers.forEach((value, key) => {
            res.setHeader(key, value)
          })

          const text = await response.text()
          res.end(text)
        } catch (error: unknown) {
          const message = error instanceof Error ? error.message : 'Unknown local API error'
          res.statusCode = 500
          res.setHeader('Content-Type', 'application/json; charset=utf-8')
          res.end(JSON.stringify({ error: `Local API middleware failed: ${message}` }))
        }
      })
    })
  },
})

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  if (env.OPENAI_API_KEY && !process.env.OPENAI_API_KEY) {
    process.env.OPENAI_API_KEY = env.OPENAI_API_KEY
  }
  if (env.OPENAI_MODEL && !process.env.OPENAI_MODEL) {
    process.env.OPENAI_MODEL = env.OPENAI_MODEL
  }

  return {
    plugins: [react(), tailwindcss(), localApiPlugin()],
  }
})
