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
    // Submit to Stamped.io API
    const response = await fetch('https://api.stamped.io/v2/reviews', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Stamped-Auth': process.env.VITE_STAMPED_PUBLIC_KEY,
      },
      body: JSON.stringify({
        storeHash: process.env.VITE_STAMPED_STORE_HASH,
        productId: product_external_id,
        rating: parseInt(rating),
        reviewerName: reviewer_name || 'Anonymous',
        reviewText: body,
        source: 'webform',
      })
    });

    if (!response.ok) {
      const error = await response.json();
      return res.status(response.status).json({ error: error.message || 'Failed to submit review' });
    }

    const data = await response.json();
    return res.status(200).json({ success: true, review: data });
  } catch (error) {
    console.error('Stamped.io review submission error:', error);
    return res.status(500).json({ error: 'Failed to submit review' });
  }
}
