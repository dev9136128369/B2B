"use client"
import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import {
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
} from "react-icons/fa";

const ContactPage = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [responseMsg, setResponseMsg] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResponseMsg("");

    const { name, email, message } = formData;

    try {
      const res = await fetch("/api/contact-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });

      const data = await res.json();

      if (res.ok) {
        setResponseMsg("Message sent successfully!");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setResponseMsg(`Error: ${data.error || "Something went wrong"}`);
      }
    } catch (error) {
      setResponseMsg(`Error: ${error.message}`);
    }

    setLoading(false);
  };

  return (
    <>
      <Navbar />
      <div className="bg-gray-100 min-h-screen py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center mb-8">Contact Us
          <div className="w-[100px] h-1 bg-pink-500 mx-auto mt-4 rounded-full mb-5"></div>

          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Contact Form */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold mb-4">Send Us a Message</h2>
              <form onSubmit={handleSubmit}>
                {["name", "email", "message"].map((field) => (
                  <div className="mb-4" key={field}>
                    <label className="text-lg block text-black mb-2 capitalize">{field}</label>
                    {field === "message" ? (
                      <textarea
                        name={field}
                        rows="5"
                        value={formData[field]}
                        onChange={handleChange}
                        required
                        placeholder={`Enter your ${field}`}
                        className="text-lg w-full p-2 border border-gray-300 rounded-lg"
                      />
                    ) : (
                      <input
                        type={field === "email" ? "email" : "text"}
                        name={field}
                        value={formData[field]}
                        onChange={handleChange}
                        required
                        placeholder={`Enter your ${field}`}
                        className="w-full border p-2 rounded-2xl transition duration-300"
                        style={{
                          boxShadow: '0 0 0 transparent',
                        }}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.boxShadow = '0 4px 12px rgba(255, 0, 76, 0.46)')
                        }
                        onMouseLeave={(e) => (e.currentTarget.style.boxShadow = '0 0 0 transparent')}
                      />
                      
                    )}
                  </div>
                ))}
                <button type="submit" disabled={loading} className="text-lg bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600">
                  {loading ? "Sending..." : "Send Message"}
                </button>
                {responseMsg && <p className="mt-4 font-semibold">{responseMsg}</p>}
              </form>
            </div>

            {/* Contact Info */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold mb-4">Contact Information</h2>
              <div className="space-y-4">
                <div className="flex items-center"><FaMapMarkerAlt className="text-2xl text-blue-500 mr-2" /><p>CipherShield Technology<br />J.S. Arcade, Sec - 18, Noida</p></div>
                <div className="flex items-center"><FaPhone className="text-2xl text-blue-500 mr-2" /><p>+91 1204375355</p></div>
                <div className="flex items-center"><FaEnvelope className="text-2xl text-blue-500 mr-2" /><p>support@ciphererp.com</p></div>
              </div>

              <h3 className="text-xl font-bold mt-8 mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                <a href="https://facebook.com" className="text-gray-600 hover:text-blue-500"><FaFacebook size={24} /></a>
                <a href="https://twitter.com" className="text-gray-600 hover:text-blue-500"><FaTwitter size={24} /></a>
                <a href="https://instagram.com" className="text-gray-600 hover:text-blue-500"><FaInstagram size={24} /></a>
                <a href="https://linkedin.com" className="text-gray-600 hover:text-blue-500"><FaLinkedin size={24} /></a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactPage;
