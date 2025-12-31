// Shopify Customer Authentication

const SHOPIFY_DOMAIN = import.meta.env.VITE_SHOPIFY_STORE_DOMAIN
const STOREFRONT_TOKEN = import.meta.env.VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN

// Create a customer access token
export async function createCustomerAccessToken(email, password) {
  const query = `
    mutation CustomerAccessTokenCreate($input: CustomerAccessTokenCreateInput!) {
      customerAccessTokenCreate(input: $input) {
        customerAccessToken {
          accessToken
          expiresAt
        }
        customerUserErrors {
          field
          message
        }
      }
    }
  `

  const response = await fetch(`https://${SHOPIFY_DOMAIN}/api/2024-01/graphql.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': STOREFRONT_TOKEN,
    },
    body: JSON.stringify({
      query,
      variables: {
        input: {
          email,
          password,
        },
      },
    }),
  })

  const data = await response.json()
  console.log('Shopify login response:', data)

  if (data.errors) {
    console.error('Shopify errors:', data.errors)
    throw new Error(data.errors[0]?.message || 'Login failed')
  }

  const result = data.data?.customerAccessTokenCreate
  if (!result) {
    throw new Error('Invalid response from Shopify')
  }

  if (result.customerUserErrors?.length > 0) {
    console.error('Customer errors:', result.customerUserErrors)
    throw new Error(result.customerUserErrors[0].message)
  }

  if (!result.customerAccessToken?.accessToken) {
    throw new Error('No access token received')
  }

  return result.customerAccessToken
}

// Get customer info
export async function getCustomer(accessToken) {
  const query = `
    query GetCustomer {
      customer {
        id
        email
        firstName
        lastName
        phone
        orders(first: 10) {
          edges {
            node {
              id
              orderNumber
              createdAt
              totalPrice {
                amount
                currencyCode
              }
              fulfillmentStatus
              lineItems(first: 10) {
                edges {
                  node {
                    title
                    quantity
                  }
                }
              }
            }
          }
        }
      }
    }
  `

  const response = await fetch(`https://${SHOPIFY_DOMAIN}/api/2024-01/graphql.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': STOREFRONT_TOKEN,
      'X-Shopify-Customer-Access-Token': accessToken,
    },
    body: JSON.stringify({ query }),
  })

  const data = await response.json()

  if (data.errors) {
    throw new Error(data.errors[0]?.message || 'Failed to fetch customer')
  }

  return data.data.customer
}

// Create a new customer
export async function createCustomer(input) {
  const query = `
    mutation CreateCustomer($input: CustomerCreateInput!) {
      customerCreate(input: $input) {
        customer {
          id
          email
        }
        customerUserErrors {
          field
          message
        }
      }
    }
  `

  const response = await fetch(`https://${SHOPIFY_DOMAIN}/api/2024-01/graphql.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': STOREFRONT_TOKEN,
    },
    body: JSON.stringify({
      query,
      variables: { input },
    }),
  })

  const data = await response.json()

  if (data.errors) {
    throw new Error(data.errors[0]?.message || 'Signup failed')
  }

  if (data.data.customerCreate.customerUserErrors.length > 0) {
    throw new Error(data.data.customerCreate.customerUserErrors[0].message)
  }

  return data.data.customerCreate.customer
}

// Store token in localStorage
export function saveToken(token) {
  localStorage.setItem('shopifyAccessToken', token)
}

// Get token from localStorage
export function getToken() {
  return localStorage.getItem('shopifyAccessToken')
}

// Remove token
export function removeToken() {
  localStorage.removeItem('shopifyAccessToken')
}

// Check if user is logged in
export function isLoggedIn() {
  return !!getToken()
}
