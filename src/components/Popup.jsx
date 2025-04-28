// components/PopupForm.jsx
'use client';

import { useEffect, useState } from 'react';
import { useSession, signIn } from 'next-auth/react';

export default function PopupForm() {
  const { data: session, status } = useSession();
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    if (status !== 'loading' && !session) {
      const timer = setTimeout(() => {
        setShowPopup(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [session, status]);

  const handleGoogleLogin = () => {
    signIn('google', {
      callbackUrl: '/DashboardTabs' // Login success hone par redirect kahan karna hai
    });
  };

  if (status === 'loading') return null;
  if (!showPopup || session) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Login Required</h2>
          <button 
            onClick={() => setShowPopup(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>
        
        <div className="space-y-4">
          <p>Please login to continue using our services</p>
          <button
            onClick={handleGoogleLogin}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-800 flex items-center justify-center gap-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12.545 10.239v3.821h5.445c-0.712 2.315-2.647 3.972-5.445 3.972-3.332 0-6.033-2.701-6.033-6.032s2.701-6.032 6.033-6.032c1.498 0 2.866 0.549 3.921 1.453l2.814-2.814c-1.786-1.667-4.166-2.698-6.735-2.698-5.522 0-10 4.477-10 10s4.478 10 10 10c8.396 0 10-7.524 10-10 0-0.61-0.056-1.229-0.158-1.835h-9.842z" />
            </svg>
            Login with Google
          </button>
        </div>
      </div>
    </div>
  );
}