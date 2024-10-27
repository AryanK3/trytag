import clientPromise from "../../../lib/mongodb"; 
import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
    const { groupName } = params;
    const client = await clientPromise;
    const db = client.db("group");
    const collection = db.collection("groups");
    try {
        const group = await collection.findOne({ groupName: groupName });
        if (!group) {
            return NextResponse.json({ message: "Group doesn't exist" }, { status: 404 });
        }

        const leaderboard = group.members.map(member => ({
            email: Object.keys(member)[0],
            points: Object.values(member)[0],
        }));
        return NextResponse.json({data: leaderboard, tag: group.tag}, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Server error" }, { status: 500 });
    }
}
