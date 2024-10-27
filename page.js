"use client";
// pages/groups/[group].js
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

const GroupDetail = () => {
  const router = useRouter();
  const { group } = router.query; // Get the group name from the query parameters
  const [groupNameSafe, setGroupNameSafe] = useState('');

  useEffect(() => {
    if (group) {
      setGroupNameSafe(group); // Set the group name when it's available
    }
  }, [group]);

  // Sample user data for demonstration; replace with actual data as needed
  const usersData = [
    { user: 'Alice', points: 120 },
    { user: 'Bob', points: 90 },
    { user: 'Charlie', points: 150 },
    { user: 'David', points: 110 },
  ];

  // Sort users by points in descending order
  const sortedUsers = [...usersData].sort((a, b) => b.points - a.points);

  return (
    <div className="bg-[#9D968D] flex flex-col items-center min-h-screen p-6">
      <h1 className="text-3xl font-bold mb-6 text-black">
        {groupNameSafe || "Loading..."}
      </h1>
      <p className="text-lg text-black mb-6">
        Details about {groupNameSafe || "this group"}...
      </p>

      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-black text-center">Leaderboard</h2>
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-[#CEB888] text-black">
              <th className="py-2 px-4 border-b">User</th>
              <th className="py-2 px-4 border-b">Points</th>
            </tr>
          </thead>
          <tbody>
            {sortedUsers.length > 0 ? (
              sortedUsers.map((userData, index) => (
                <tr key={index} className="hover:bg-gray-100">
                  <td className="py-2 px-4 border-b text-black">{userData.user}</td>
                  <td className="py-2 px-4 border-b text-black">{userData.points}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="2" className="py-2 px-4 text-center text-black">No users found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GroupDetail;
