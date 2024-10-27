import clientPromise from '../../lib/mongodb';
import { NextResponse } from 'next/server';

const generateNewSecret = () => {
    const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let secret = '';
    for (let i = 0; i < 5; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        secret += characters[randomIndex];
    }
    return secret;
};

export async function POST(request) {
    const client = await clientPromise;
    const data = await request.json();
    const { secret, groupName, email } = data;

    const db = client.db("users");
    const collection = db.collection("profiles");
    const player = await collection.findOne({ secret: secret });
    if (!player || player.mail == email ) {
        return NextResponse.json({ message: "Invalid secret" }, { status: 409 });
    }
    const db2 = client.db("group");
    const collection2 = db2.collection("groups");
    const group = await collection2.findOne({ groupName });
    if (!group || !group.members || group.tag === player.mail || !(group.tag === email)) {
        return NextResponse.json({ message: "Invalid data" }, { status: 409 });
    }    
    await collection2.updateOne(
        { groupName: groupName },
        { $set: { tag: player.mail } }
    );
    const newSecret = generateNewSecret();
    await collection.updateMany(
        { 
            groups: groupName 
        },
        { 
            $set: {
                secret : newSecret
            },
        },
    );
    return NextResponse.json({ message: "Updated successfully" }, { status: 200 });
}


