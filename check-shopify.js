// Quick script to check if products exist in Shopify
const SHOPIFY_DOMAIN = 'zlfr-collection.myshopify.com'
const STOREFRONT_TOKEN = 'fba5d898268844547a3f237c9a4c41fb'

async function checkProducts() {
  try {
    const response = await fetch(`https://${SHOPIFY_DOMAIN}/api/2024-01/graphql.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': STOREFRONT_TOKEN,
      },
      body: JSON.stringify({
        query: `{
          products(first: 10) {
            edges {
              node {
                title
                handle
                variants(first: 1) {
                  edges {
                    node {
                      id
                    }
                  }
                }
              }
            }
          }
        }`
      })
    })

    const json = await response.json()
    
    if (json.errors) {
      console.error('❌ Shopify API Errors:', json.errors)
      return
    }

    const products = json.data.products.edges
    
    if (products.length === 0) {
      console.log('\n❌ NO PRODUCTS FOUND IN SHOPIFY\n')
      console.log('You need to add products to your Shopify store:')
      console.log('1. Go to: https://zlfr-collection.myshopify.com/admin/products')
      console.log('2. Click "Add product"')
      console.log('3. Add title, price, description, images')
      console.log('4. Add tags: zulfiqar, calligraphy, or legacy')
      console.log('5. Make sure product is Active\n')
    } else {
      console.log(`\n✅ Found ${products.length} product(s) in Shopify:\n`)
      products.forEach((edge, i) => {
        const product = edge.node
        const variantId = product.variants.edges[0]?.node.id || 'NO VARIANT'
        console.log(`${i + 1}. ${product.title}`)
        console.log(`   Handle: ${product.handle}`)
        console.log(`   Variant ID: ${variantId}\n`)
      })
    }
  } catch (error) {
    console.error('❌ Error fetching from Shopify:', error.message)
  }
}

checkProducts()
