"use client";
import Head from 'next/head';
import { useState, useEffect } from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';



export default function Home() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  useEffect(() => {
    setIsPopupOpen(true);
  }, []);

  return (
    <div>
      <Head>
        <title>Google Login Popup Example</title>
        <meta name="description" content="Example of a centered Google login popup on website open." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto p-4">
        <h1 className="text-3xl font-bold">Welcome to Our Website</h1>
        <p className="text-gray-700">This is the homepage content.</p>
      </main>

      {/* Centered Login Popup */}
      {isPopupOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-2xl font-bold mb-4">Login with Google</h2>
            <GoogleOAuthProvider clientId="68746846557-c1ujti9eq3lid47a309p19hntgpiatmd.apps.googleusercontent.com">
              <GoogleLogin
                onSuccess={(credentialResponse) => {
                  console.log(credentialResponse);
                  alert('Login successful!');
                  setIsPopupOpen(false);
                }}
                onError={() => {
                  console.log('Login Failed');
                  alert('Login failed!');
                }}
              />
            </GoogleOAuthProvider>
            <button
              onClick={() => setIsPopupOpen(false)}
              className="mt-4 w-full bg-red-600 text-white p-2 rounded hover:bg-red-700"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}