import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// Read .env file (only in development, gracefully handle missing file)
function readEnv() {
  const env = {}
  
  // Try to read .env file in development
  try {
    const envPath = path.join(__dirname, '.env')
    if (fs.existsSync(envPath)) {
      const envContent = fs.readFileSync(envPath, 'utf-8')
      envContent.split('\n').forEach(line => {
        const [key, value] = line.split('=')
        if (key && value) {
          env[key.trim()] = value.trim()
        }
      })
    }
  } catch (err) {
    console.log('Could not read .env file, using process.env')
  }

  // Fallback to process.env (for Vercel and production)
  if (!env.VITE_STAMPED_STORE_HASH) {
    env.VITE_STAMPED_STORE_HASH = process.env.VITE_STAMPED_STORE_HASH || ''
  }
  if (!env.VITE_STAMPED_PUBLIC_KEY) {
    env.VITE_STAMPED_PUBLIC_KEY = process.env.VITE_STAMPED_PUBLIC_KEY || ''
  }

  return env
}

const envVars = readEnv()

// Custom plugin to handle API routes in development
function apiPlugin() {
  return {
    name: 'api-plugin',
    configureServer(server) {
      return () => {
        server.middlewares.use('/api', async (req, res, next) => {
          if (req.url === '/submit-review' && req.method === 'POST') {
            try {
              let body = ''
              req.on('data', chunk => {
                body += chunk.toString()
              })
              req.on('end', async () => {
                const data = JSON.parse(body)
                const { rating, body: reviewBody, reviewer_name, product_external_id } = data

                // Validate
                if (!rating || !reviewBody || !product_external_id) {
                  res.writeHead(400, { 'Content-Type': 'application/json' })
                  res.end(JSON.stringify({ error: 'Missing required fields' }))
                  return
                }

                try {
                  console.log('Submitting review with:', {
                    shop_domain: envVars.VITE_JUDGEME_SHOP_DOMAIN,
                    product_external_id: product_external_id,
                    rating: rating,
                    body: reviewBody.substring(0, 50) + '...'
                  })

                  // Use Judge.me's public review submission endpoint
                  const response = await fetch('https://api.judge.me/v1/reviews', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                      shop_domain: envVars.VITE_JUDGEME_SHOP_DOMAIN,
                      api_token: envVars.VITE_JUDGEME_API_TOKEN,
                      review: {
                        body: reviewBody,
                        rating: parseInt(rating),
                        reviewer_name: reviewer_name || 'Anonymous',
                        product_external_id: String(product_external_id),
                      }
                    })
                  })

                  const responseText = await response.text()
                  console.log('Judge.me API response status:', response.status)
                  console.log('Judge.me API response body:', responseText.substring(0, 500))

                  if (!response.ok) {
                    console.error('Judge.me API error - Status:', response.status)
                    res.writeHead(response.status, { 'Content-Type': 'application/json' })
                    res.end(JSON.stringify({ error: `Judge.me API returned ${response.status}. Please check your credentials.` }))
                    return
                  }

                  const result = JSON.parse(responseText)
                  res.writeHead(200, { 'Content-Type': 'application/json' })
                  res.end(JSON.stringify({ success: true, review: result }))
                } catch (error) {
                  console.error('Review submission error:', error.message)
                  console.error('Error stack:', error.stack)
                  res.writeHead(500, { 'Content-Type': 'application/json' })
                  res.end(JSON.stringify({ error: error.message || 'Failed to submit review' }))
                }
              })
            } catch (error) {
              console.error('Request parsing error:', error)
              res.writeHead(400, { 'Content-Type': 'application/json' })
              res.end(JSON.stringify({ error: 'Invalid request' }))
            }
          } else {
            next()
          }
        })
      }
    }
  }
}

export default defineConfig({
  plugins: [react(), apiPlugin()],
  resolve: {
    alias: { '@': path.resolve(__dirname, './src') },
  },
})
