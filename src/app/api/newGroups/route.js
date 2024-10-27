import clientPromise from "../../lib/mongodb";
import { NextResponse } from 'next/server';

export async function POST(request) {
    const client = await clientPromise;
    const data = await request.json();
    const email = data.email;
    const groupName = data.groupName;
    const points = 0; 
    if (!groupName || typeof groupName !== 'string') {
        return new Response("Invalid group name", { status: 400 });
    }
    const db = client.db("group");
    const collection = db.collection("groups");
    const group = await collection.findOne({ groupName: groupName });
    if (group) {
        return new Response("Group exists", { status: 409 });
    } else {
        await collection.updateOne(
            { groupName: groupName },
            { 
                $set: { tag: email },
                $push: { members: { [email]: points } },
            },
            { upsert: true }
        );

        const db2 = client.db("users");
        const collection2 = db2.collection("profiles");
        await collection2.updateOne(
            { mail: email },
            { $push: { groups: groupName } }
        );

        return new Response("Created the group successfully", { status: 200 });
    }
}
