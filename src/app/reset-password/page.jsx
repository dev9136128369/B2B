"use client";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import PropTypes from "prop-types";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const searchParams = useSearchParams();
  const router = useRouter();
  const oobCode = searchParams.get("oobCode");

  const validatePasswords = () => {
    if (password !== confirmPassword) {
      setMessage("Passwords do not match.");
      return false;
    }
    if (password.length < 6) {
      setMessage("Password must be at least 6 characters.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!oobCode) {
      setMessage("Invalid reset link.");
      return;
    }

    if (!validatePasswords()) {
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ oobCode, newPassword: password }),
      });

      const data = await res.json();
      console.log("Reset response:", data);

      if (res.ok) {
        setSuccess(true);
        console.log("✅ Password reset success");
        setTimeout(() => {
          console.log("🔁 Redirecting...");
          router.push("/login");
        }, 2500);
      } else {
        setMessage(data.error || "Reset failed");
      }
    } catch (error) {
      console.error("Reset error:", error);
      setMessage("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center ">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow w-full max-w-md ">
        <h2 className="text-xl font-bold mb-4">Reset Password</h2>
        {message && <p className="text-red-500 mb-3">{message}</p>}
        {success && <p className="text-green-600 mb-3">✅ Password reset successful! Redirecting...</p>}
        <input
          type="password"
          placeholder="New password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={6}
          className="w-full border p-2 mb-3"
        />
        <input
          type="password"
          placeholder="Confirm password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          minLength={6}
          className="w-full border p-2 mb-4"
        />
        
        <button type="submit" disabled={loading} className="w-full bg-blue-500 text-white py-2 rounded">
          {loading ? "Resetting..." : "Reset Password"}
        </button>
      </form>
    </div>
  );
}

ResetPassword.propTypes = {
  // Add any prop types if this component receives props
};