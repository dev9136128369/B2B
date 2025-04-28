'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

function SubmitButton({ formData }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleClick = async () => {
    setLoading(true);

    try {
      // 1. Fetch existing data
      const existing = JSON.parse(localStorage.getItem('partners') || '[]');

      // 2. Push new form data
      existing.push(formData);

      // 3. Save updated data
      localStorage.setItem('partners', JSON.stringify(existing));

      // 4. Wait a bit and then navigate
      setTimeout(() => {
        router.push('/DashboardTabs'); // change path as needed
      }, 1000);
    } catch (err) {
      console.error('Submission error:', err);
      setLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={loading}
      className={`w-full flex justify-center items-center gap-2 bg-blue-600 text-white p-2 rounded-2xl transition-all duration-300 hover:bg-blue-700 relative overflow-hidden ${
        loading ? 'cursor-not-allowed opacity-80' : ''
      }`}
    >
      {loading ? (
        <>
          <span className="animate-pulse">Submitting</span>
          <span className="animate-bounce text-xl">→</span>
        </>
      ) : (
        'Submit'
      )}
    </button>
  );
}

export default SubmitButton;
