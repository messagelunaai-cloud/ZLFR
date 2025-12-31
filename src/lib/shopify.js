// Shopify Storefront API Client
const SHOPIFY_DOMAIN = import.meta.env.VITE_SHOPIFY_STORE_DOMAIN
const STOREFRONT_TOKEN = import.meta.env.VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN

async function shopifyFetch(query, variables = {}) {
  const response = await fetch(`https://${SHOPIFY_DOMAIN}/api/2024-01/graphql.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': STOREFRONT_TOKEN,
    },
    body: JSON.stringify({ query, variables }),
  })

  const json = await response.json()
  
  if (json.errors) {
    console.error('Shopify API errors:', json.errors)
    json.errors.forEach((err, i) => {
      console.error(`Error ${i + 1}:`, err.message || err)
    })
    throw new Error('Failed to fetch from Shopify')
  }

  return json.data
}

// Fetch all products
export async function getProducts() {
  const query = `
    query GetProducts {
      products(first: 50) {
        edges {
          node {
            id
            handle
            title
            description
            priceRange {
              minVariantPrice {
                amount
                currencyCode
              }
            }
            images(first: 1) {
              edges {
                node {
                  url
                  altText
                }
              }
            }
            variants(first: 1) {
              edges {
                node {
                  id
                }
              }
            }
            tags
          }
        }
      }
    }
  `

  const data = await shopifyFetch(query)
  
  // Collection mapping - manually assign collections based on product title/handle
  const collectionMap = {
    'jewelry-example-product-1': 'calligraphy',     // La Fatah La Ali
    'jewelry-example-product-2': 'legacy',          // Silver Signature
    'jewelry-example-product-3': 'legacy',          // Black Rise
    'jewelry-example-product-4': 'calligraphy',     // Silver Frost
    'golden-ruby': 'calligraphy',
    'ruby-silver': 'calligraphy',
    'timless-steel': 'calligraphy',
    'silent-emerald': 'calligraphy',
    'minimalist-piece': 'legacy',
    'ruby-intense': 'calligraphy',
  }

  return data.products.edges.map(({ node }) => ({
    id: node.handle,
    name: node.title,
    price: parseFloat(node.priceRange.minVariantPrice.amount),
    image: node.images.edges[0]?.node.url || 'https://via.placeholder.com/400',
    desc: node.description || '',
    collection: collectionMap[node.handle] || node.tags.find(tag => ['zulfiqar', 'calligraphy', 'legacy'].includes(tag.toLowerCase())) || 'zulfiqar',
    variantId: node.variants.edges[0]?.node.id,
  }))
}

// Fetch single product by handle
export async function getProduct(handle) {
  const query = `
    query GetProduct($handle: String!) {
      product(handle: $handle) {
        id
        handle
        title
        description
        priceRange {
          minVariantPrice {
            amount
            currencyCode
          }
        }
        images(first: 5) {
          edges {
            node {
              url
              altText
            }
          }
        }
        variants(first: 1) {
          edges {
            node {
              id
            }
          }
        }
        tags
      }
    }
  `

  const data = await shopifyFetch(query, { handle })
  const product = data.product

  if (!product) return null

  // Collection mapping - manually assign collections based on product title/handle
  const collectionMap = {
    'jewelry-example-product-1': 'calligraphy',     // La Fatah La Ali
    'jewelry-example-product-2': 'legacy',          // Silver Signature
    'jewelry-example-product-3': 'legacy',          // Black Rise
    'jewelry-example-product-4': 'calligraphy',     // Silver Frost
    'golden-ruby': 'calligraphy',
    'ruby-silver': 'calligraphy',
    'timless-steel': 'calligraphy',
    'silent-emerald': 'calligraphy',
    'minimalist-piece': 'legacy',
    'ruby-intense': 'calligraphy',
  }

  return {
    id: product.handle,
    name: product.title,
    price: parseFloat(product.priceRange.minVariantPrice.amount),
    image: product.images.edges[0]?.node.url || 'https://via.placeholder.com/400',
    images: product.images.edges.map(({ node }) => node.url),
    desc: product.description || '',
    collection: collectionMap[product.handle] || product.tags.find(tag => ['zulfiqar', 'calligraphy', 'legacy'].includes(tag.toLowerCase())) || 'zulfiqar',
    variantId: product.variants.edges[0]?.node.id,
  }
}

// Create checkout with items (using new Cart API)
export async function createCheckout(lineItems) {
  // Log what we're sending to help debug
  console.log('Creating checkout with items:', lineItems)
  
  // Filter out items without variantId
  const validItems = lineItems.filter(item => {
    if (!item.variantId) {
      console.error('Item missing variantId:', item)
      return false
    }
    return true
  })

  if (validItems.length === 0) {
    throw new Error('No valid items to checkout. Please refresh the page and try adding products again.')
  }

  const query = `
    mutation cartCreate($input: CartInput!) {
      cartCreate(input: $input) {
        cart {
          id
          checkoutUrl
        }
        userErrors {
          field
          message
        }
      }
    }
  `

  const variables = {
    input: {
      lines: validItems.map(item => ({
        merchandiseId: item.variantId,
        quantity: item.qty,
      })),
    },
  }

  console.log('Sending to Shopify:', JSON.stringify(variables, null, 2))

  const data = await shopifyFetch(query, variables)
  
  console.log('Shopify response:', data)
  
  if (data.cartCreate.userErrors.length > 0) {
    console.error('Checkout errors:', data.cartCreate.userErrors)
    throw new Error('Failed to create checkout')
  }

  return data.cartCreate.cart.checkoutUrl
}
