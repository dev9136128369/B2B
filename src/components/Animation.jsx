'use client'; // Client component banana zaroori hai

import { useState } from 'react';
import { useRouter } from 'next/navigation'; // Next.js ke navigation hook


function SubmitButton() {
  const [loading, setLoading] = useState(false);
  const [showArrow, setShowArrow] = useState(false);
  const router = useRouter();

  const handleSubmit = () => {
    setLoading(true);
    setShowArrow(true);
    
    // 1 second ke baad redirect hoga
    setTimeout(() => {
      router.push('/next-page'); // Apne target page ka path daalein
    }, 1000);
  };

  return (
    <button
      type="submit"
      className={`w-full bg-green-600 text-white p-2 rounded hover:bg-green-700 transition relative overflow-hidden ${loading ? 'cursor-not-allowed' : ''}`}
      disabled={loading}
      onClick={handleSubmit}
    >
      {loading ? (
        <div className="flex items-center justify-center">
          <span>Submitting</span>
          {showArrow && (
            <span className="arrow-animation ml-2">
              → {/* Arrow character */}
            </span>
          )}
        </div>
      ) : (
        'Submit'
      )}
    </button>
  );
}

export default SubmitButton;