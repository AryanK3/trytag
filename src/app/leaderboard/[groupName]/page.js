"use client";
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation'; 
import { useSession } from 'next-auth/react';

export default function Leaderboard () {
  const { data: session } = useSession({ required: true });
  const { groupName } = useParams();  
  const [members, setMembers] = useState([]);
  const [error, setError] = useState(null);
  const [secret, setSecret] = useState('');
  const [message, setMessage] = useState('');
  const [groupTag, setgroupTag] = useState(null);

  useEffect(() => {
      const fetchMembers = async () => {
          try {
              const response = await fetch(`/api/leaderboard/${groupName}`);
              if (!response.ok) {
                  throw new Error('Failed to fetch members');
              }
              const data = await response.json();
              setMembers(data.data);
              setgroupTag(data.tag)
          } catch (error) {
              setError(error.message);
          }
      };
      fetchMembers();
  }, [groupName]); 

  const sortedMembers = [...members].sort((a, b) => b.points - a.points);

  const handleTag = async () => {
    try {
        const response = await fetch(`/api/tags`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ secret, groupName, email: session.user.email}),
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to tag player');
        }
        const data = await response.json();
        setMessage(data.message); 
    } catch (error) {
        setMessage(error.message); 
    }
  };

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="bg-[#9D968D] flex flex-col items-center min-h-screen p-6">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-black text-center">Leaderboard</h2>
        <h3 className="text-2xl font-bold mb-4 text-black text-center">{groupName}</h3>
        <h5 className="text-2xl font-bold mb-4 text-black text-center">Current: {groupTag}</h5>
        <div>
          <input 
              type="text" 
              value={secret} 
              onChange={(e) => setSecret(e.target.value)} 
              placeholder="Enter player secret" 
              className="border border-gray-300 p-2 rounded text-black"
          />
          <button onClick={handleTag} className="bg-[#CEB888] font-bold text-black px-4 py-2 rounded ml-1">Tag Player</button>
          {message && <p className="text-black">{message}</p>} 
        </div>
   
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-[#CEB888] text-black">
              <th className="py-2 px-4 border-b">User</th>
              <th className="py-2 px-4 border-b">Points</th>
            </tr>
          </thead>
          <tbody>
            {sortedMembers.length > 0 ? (
              sortedMembers.map((members, index) => (
                <tr key={index} className="hover:bg-gray-100">
                  <td className="py-2 px-4 border-b text-black">{members.email}</td>
                  <td className="py-2 px-4 border-b text-black">{members.points}</td>
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
}