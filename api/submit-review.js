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
    const storeHash = process.env.VITE_STAMPED_STORE_HASH;
    const publicKey = process.env.VITE_STAMPED_PUBLIC_KEY;

    console.log('Submitting review to Stamped.io:', {
      storeHash,
      productId: product_external_id,
      rating
    });

    const response = await fetch(`https://api.stamped.io/v2/${storeHash}/reviews`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${publicKey}`,
      },
      body: JSON.stringify({
        productId: product_external_id,
        rating: parseInt(rating),
        reviewerName: reviewer_name || 'Anonymous',
        reviewText: body,
        source: 'webform',
      })
    });

    const responseText = await response.text();
    console.log('Stamped.io response status:', response.status);
    console.log('Stamped.io response:', responseText);

    if (!response.ok) {
      return res.status(response.status).json({ error: `Stamped.io API error: ${response.status}` });
    }

    const data = JSON.parse(responseText);
    return res.status(200).json({ success: true, review: data });
  } catch (error) {
    console.error('Stamped.io review submission error:', error.message);
    return res.status(500).json({ error: error.message || 'Failed to submit review' });
  }
}
