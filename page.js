
"use client"; // Add this directive to make the component a Client Component

import { useState } from 'react';
import Link from 'next/link'; // Import Link for routing

export default function Group() {
  const [currentGroups, setCurrentGroups] = useState(['Group A', 'Group B']); // Example current groups
  const [joinGroupName, setJoinGroupName] = useState('');
  const [createGroupName, setCreateGroupName] = useState('');

  const handleJoinGroup = () => {
    if (joinGroupName) {
      setCurrentGroups([...currentGroups, joinGroupName]);
      setJoinGroupName('');
    }
  };

  const handleCreateGroup = () => {
    if (createGroupName) {
      setCurrentGroups([...currentGroups, createGroupName]);
      setCreateGroupName('');
    }
  };

  const handleDeleteGroup = (groupNameToDelete) => {
    setCurrentGroups(currentGroups.filter(group => group !== groupNameToDelete));
  };

  return (
    <div className="bg-[#9D968D] flex flex-col items-center min-h-screen p-6">
      <div className="bg-white rounded-lg shadow-lg p-6 pb-2  mb-6 w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-black text-center">Groups</h1>
      </div>
      
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6 w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4 text-black">Your Groups</h2>
        <ul className="space-y-2">
          {currentGroups.map((group, index) => (
            <li key={index} className="flex justify-between items-center text-lg text-black hover:text-[#CEB888]">
              <Link href={`/groups/${group}`} className="flex-grow">
                {group}
              </Link>
              <button 
                onClick={() => handleDeleteGroup(group)}
                className="ml-4 text-red-600 hover:text-red-800"
                aria-label={`Delete ${group}`}
              >
                🗑️
              </button>
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
          value={createGroupName}
          onChange={(e) => setCreateGroupName(e.target.value)}
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
}
