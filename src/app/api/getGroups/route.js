import clientPromise from "../../lib/mongodb";
import { NextResponse } from 'next/server';

export async function POST(request) {
  const client = await clientPromise;
  const data = await request.json();
  const email = data.email;
  const db = client.db("users"); 
  const collection = db.collection("profiles");
  const userProfile = await collection.findOne({ mail: email });
  if (!userProfile || !userProfile.groups) {
    return new Response("User not found or no groups found", { status: 404 });
  }
  return NextResponse.json(userProfile.groups);
}
