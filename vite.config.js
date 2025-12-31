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
      server.middlewares.use('/api/submit-review', async (req, res, next) => {
        if (req.method !== 'POST') {
          next()
          return
        }

        try {
          let body = ''
          req.on('data', chunk => {
            body += chunk.toString()
          })
          req.on('end', async () => {
            try {
              const data = JSON.parse(body)
              const { productId, rating, reviewText, reviewerName } = data

              // Validate
              if (!rating || !reviewText || !productId) {
                res.writeHead(400, { 'Content-Type': 'application/json' })
                res.end(JSON.stringify({ error: 'Missing required fields: productId, rating, reviewText' }))
                return
              }

              const storeHash = envVars.VITE_STAMPED_STORE_HASH
              const publicKey = envVars.VITE_STAMPED_PUBLIC_KEY

              console.log('Submitting review to Stamped.io:', {
                storeHash,
                productId,
                rating
              })

              // Submit to Stamped.io API
              const response = await fetch(`https://stamped.io/api/reviews`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  storeHash: storeHash,
                  productId: productId,
                  rating: parseInt(rating),
                  reviewerName: reviewerName || 'Anonymous',
                  reviewText: reviewText,
                  source: 'webform',
                })
              })

              const responseText = await response.text()
              console.log('Stamped.io API response status:', response.status)
              console.log('Stamped.io API response body:', responseText.substring(0, 500))

              if (!response.ok) {
                console.error('Stamped.io API error - Status:', response.status)
                res.writeHead(response.status, { 'Content-Type': 'application/json' })
                res.end(JSON.stringify({ error: `Stamped.io API returned ${response.status}` }))
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
      })
    }
  }
}

export default defineConfig({
  plugins: [react(), apiPlugin()],
  resolve: {
    alias: { '@': path.resolve(__dirname, './src') },
  },
})
