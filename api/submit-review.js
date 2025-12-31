export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { rating, body, reviewer_name, product_external_id } = req.body;

  // Validate required fields
  if (!rating || !body || !product_external_id) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const response = await fetch('https://api.judge.me/v1/reviews', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        shop_domain: process.env.VITE_JUDGEME_SHOP_DOMAIN,
        api_token: process.env.VITE_JUDGEME_API_TOKEN,
        review: {
          title: 'Product Review',
          body: body,
          rating: rating,
          reviewer_name: reviewer_name || 'Anonymous',
          product_external_id: product_external_id,
        }
      })
    });

    if (!response.ok) {
      const error = await response.json();
      return res.status(response.status).json({ error: error.message || 'Failed to submit review' });
    }

    const data = await response.json();
    return res.status(200).json({ success: true, review: data });
  } catch (error) {
    console.error('Review submission error:', error);
    return res.status(500).json({ error: 'Failed to submit review' });
  }
}
