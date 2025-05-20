import clientPromise from '@/lib/mongodb'; 

export async function POST(request) {
  try {
    const { url, shorturl } = await request.json();

    if (!url) {
      return new Response(JSON.stringify({ message: 'URL is required' }), {
        status: 400,
      });
    }

    const client = await clientPromise;
    const db = client.db('BitLinks');
    const collection = db.collection('urls');
    
    // Check if the URL already exists
    // const existing = await collection.findOne({ originalUrl: url });
    // if (existing) {
    //   const shortUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/${existing.shortId}`;
    //   return new Response(JSON.stringify({ shortUrl, message: 'URL already shortened' }), {
    //     status: 200,
    //     headers: { 'Content-Type': 'application/json' },
    //   });
    // }

    // Check if shorturl is custom and already taken
    if (shorturl) {
      const existingShort = await collection.findOne({ shortId: shorturl });
      if (existingShort) {
        return new Response(JSON.stringify({ message: 'Short URL already in use' }), {
          status: 409,
        });
      }
    }

    const shortId = shorturl || Math.random().toString(36).substring(2, 8);
    await collection.insertOne({ originalUrl: url, shortId });

    const shortUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/${shortId}`;

    return new Response(JSON.stringify({ shortUrl }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Shorten API error:', error);
    return new Response(JSON.stringify({ message: 'Internal Server Error' }), {
      status: 500,
    });
  }
}
