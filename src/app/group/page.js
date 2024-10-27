"use client";
import Image from "next/image";
import { signIn, signOut, useSession } from 'next-auth/react';
import { useState } from "react";

export default function Group() {
  const { data: session } = useSession({ required: true });
  const [groupName, setGroupName] = useState('');

  async function upload() {
    const jsonObject = {
      email: session.user.email,
      groupName: groupName,
    };
    await fetch('/api/groups', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(jsonObject)
    });
  }

  if (session && session.user) {
    return (
      <div>
        <h2>Create or Join a Group</h2>
        <input 
          type="text" 
          placeholder="Group Name" 
          value={groupName} 
          onChange={(e) => setGroupName(e.target.value)} 
        />
        <button onClick={upload}>Upload</button>
        <button onClick={() => signOut()}>{session.user.name} Sign Out</button>
      </div>
    );
  }

  return <button onClick={() => signIn()}>Sign In</button>;
}
