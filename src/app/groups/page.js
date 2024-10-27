"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link'
import { useSession } from 'next-auth/react'; 
const UserGroups = () => {
  const { data: session } = useSession();
  const [groups, setGroups] = useState([]);
  const [newGroupName, setNewGroupName] = useState('');
  const [joinGroupName, setJoinGroupName] = useState('');

  useEffect(() => {
    const fetchGroups = async () => {
      if (session?.user?.email) {
        const response = await fetch('/api/getGroups', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email: session.user.email }),
        });
        if (response.ok) {
          const data = await response.json();
          setGroups(data);
        } else {
          console.error('Error fetching groups:', response.statusText);
        }
      }
    };
    fetchGroups();
  }, [session]);

  const handleJoinGroup = async () => {
    const response = await fetch('/api/groups', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: session.user.email, groupName: joinGroupName }),
    });
    if (response.ok) {
      alert('Joined the group successfully');
    } else {
      alert('Error joining group: ' + response.statusText);
    }
  };

  const handleCreateGroup = async () => {
    const response = await fetch('/api/newGroups', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: session.user.email, groupName: newGroupName }),
    });
    if (response.ok) {
      alert('Created the group successfully');
    } else {
      alert('Error creating group: ' + response.statusText);
    }
  };

  return (
    <div className="bg-[#9D968D] flex flex-col items-center min-h-screen p-6">
      <div className="bg-white rounded-lg shadow-lg p-6 pb-2  mb-6 w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-black text-center">Groups</h1>
      </div>
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6 w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4 text-black">Your Groups</h2>
        <ul className="space-y-2">
        {groups.map((group) => (
          <li key={group}>
            <Link href={`/leaderboard/${group}`} className="text-blue">{group}</Link>
          </li>
        ))}
      </ul>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6 mb-6 w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4 text-black">Join Group</h2>
        <input
          type="text"
          value={joinGroupName}
          onChange={(e) => setJoinGroupName(e.target.value)}
          placeholder="Enter group name"
          className="border border-gray-300 text-gray-700 rounded p-2 w-full mb-4"
        />
        <button 
          onClick={handleJoinGroup}
          className="w-full bg-black text-[#CEB888] rounded py-2 hover:bg-[#CEB888] hover:text-black transition duration-200"
        >
          Join Group
        </button>
      </div>
      
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4 text-black">Create Group</h2>
        <input
          type="text"
          value={newGroupName}
          onChange={(e) => setNewGroupName(e.target.value)}
          placeholder="Enter group name"
          className="border border-gray-300 text-gray-700 rounded p-2 w-full mb-4"
        />
        <button 
          onClick={handleCreateGroup}
          className="w-full bg-black text-[#CEB888] rounded py-2 hover:bg-[#CEB888] hover:text-black transition duration-200"
        >
          Create Group
        </button>
      </div>
    </div>
  );
};

export default UserGroups;
