import NextAuth from "next-auth/next"
import GoogleProvider from 'next-auth/providers/google'
import clientPromise from "../../../lib/mongodb";

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: <clientid>,
        }),
    ],
    callbacks: {
        async signIn({credentials,profile,email,account,user}) {
        const client = await clientPromise;
        const db = client.db("users");
        const userCollection = db.collection("profiles");
        const existingUser = await userCollection.findOne({ mail: profile.email });
        if (!existingUser) {
            const newUserProfile = {
                firstName: profile.given_name,
                lastName: profile.family_name,
                mail: profile.email,
                img: profile.picture,
                groups: [],
            };
            await userCollection.insertOne(newUserProfile);
        }
        return true
    }}
});
export { handler as GET, handler as POST };
