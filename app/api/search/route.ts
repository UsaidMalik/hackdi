import { NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI as string;
const client = new MongoClient(uri);

async function connectToDatabase() {
  await client.connect();
  return client.db('mqt3');
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q');

  if (!query) {
    return NextResponse.json({ error: 'Query parameter "q" is required' }, { status: 400 });
  }

  try {
    const db = await connectToDatabase();
    const collection = db.collection<any>('entities');

    const entities = await collection.find({
      $or: [
        { entity_name: { $regex: query, $options: 'i' } },
        { tags: { $regex: query, $options: 'i' } }
      ]
    }).toArray();

    const plainResults = entities.map((entity) => ({
        ...entity,
        _id: entity._id.toString(),
    }));

    const uniqueResults = Array.from(new Map(plainResults.map(e => [e._id, e])).values());

    const pinnaclePath = uniqueResults.filter(e => e.score > 80);
    const disengagementPath = uniqueResults.filter(e => e.score > 60 && e.score <= 80);
    const lesserEvilPath = uniqueResults.filter(e => e.score > 40 && e.score <= 60);
    const harmfulPath = uniqueResults.filter(e => e.score <= 40);

    return NextResponse.json({
      pinnaclePath,
      disengagementPath,
      lesserEvilPath,
      harmfulPath,
    });
  } catch (error)
    {
        console.error(error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
