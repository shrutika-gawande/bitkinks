// app/api/shorten/route.js
import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb'; // adjust path if needed

export async function POST(req) {
  try {
    const { originalUrl, shortId } = await req.json();

    if (!originalUrl || !shortId) {
      return NextResponse.json({ message: 'Missing fields' }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db('bitlinks');
    const collection = db.collection('links');

    const existing = await collection.findOne({ shortId });

    if (existing) {
      return NextResponse.json({ message: 'Short ID already exists' }, { status: 409 });
    }

    const result = await collection.insertOne({
      originalUrl,
      shortId,
      createdAt: new Date(),
    });

    const fullShortUrl = `https://bitkinks.vercel.app/${shortId}`;
    return NextResponse.json({ message: 'Short link created', shortUrl: fullShortUrl }, { status: 201 });

  } catch (error) {
    console.error("❌ Server Error in /api/shorten:", error);
    return NextResponse.json({ message: 'Server Error', error: error.message }, { status: 500 });
  }
}
