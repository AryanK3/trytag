// pages/index.js

"use client"; // Add this directive to make the component a Client Component

import { useRouter } from 'next/navigation'; // Use next/navigation instead of next/router

export default function Home() {
  const router = useRouter();

  const handleSignIn = () => {
    router.push('/groups'); // Navigate to the Group component/page
  };

  return (
    <div className="bg-[#9D968D] flex items-center justify-center min-h-screen">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
        <h1 className="text-2xl font-bold text-center mb-4 text-black">Welcome to Tag</h1>
        <div className="flex flex-col space-y-4">
          <button
            onClick={handleSignIn} // Call the handleSignIn function on click
            className="w-full bg-black text-[#CEB888] rounded py-2 hover:bg-[#CEB888] hover:text-black transition duration-200"
          >
            Sign In
          </button>
          <button className="w-full border border-black text-black rounded py-2 hover:bg-[#CEB888] hover:text-black transition duration-200">
            Create Account
          </button>
        </div>
      </div>
    </div>
  );
}
