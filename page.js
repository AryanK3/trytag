"use client";
// pages/groups/[group].js
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

async function getLeaderboard(groupName) {
  const res = await fetch("http://localhost:3000/leaderboar/${groupName}")
  return res.json()
}

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
    <p>
      {getLeaderboard()}
    </p>
  );
};

export default GroupDetail;
