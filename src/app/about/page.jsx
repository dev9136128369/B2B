"use client"; // Client-side component banane ke liye
import React from 'react';
import { FaUsers, FaLightbulb, FaHandshake, FaRocket, FaSmile, FaChartLine } from 'react-icons/fa';
import Navbar from "@/components/Navbar"


const AboutPage = () => {
  return (
    <><Navbar/>
    <div className="bg-gray-100 min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">About Us</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We are a leading e-commerce platform dedicated to providing the best products and services to our customers. Our mission is to make online shopping easy, fast, and secure.
          </p>
        </div>

        {/* Our Services */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {/* Service 1 */}
          <div className="bg-white p-6 rounded-lg shadow-lg text-center hover:shadow-xl transition-shadow duration-300">
            <FaRocket className="text-blue-500 text-4xl mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">Fast Delivery</h3>
            <p className="text-gray-600">
              We deliver your orders quickly and efficiently, ensuring you get your products on time.
            </p>
          </div>
          {/* Service 2 */}
          <div className="bg-white p-6 rounded-lg shadow-lg text-center hover:shadow-xl transition-shadow duration-300">
            <FaSmile className="text-blue-500 text-4xl mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">Customer Satisfaction</h3>
            <p className="text-gray-600">
              Your satisfaction is our priority. We offer easy returns and 24/7 support.
            </p>
          </div>
          {/* Service 3 */}
          <div className="bg-white p-6 rounded-lg shadow-lg text-center hover:shadow-xl transition-shadow duration-300">
            <FaChartLine className="text-blue-500 text-4xl mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">Growth Focused</h3>
            <p className="text-gray-600">
              We continuously innovate to bring you the latest products and technologies.
            </p>
          </div>
        </div>

        {/* Our Values */}
        <div className="bg-white p-8 rounded-lg shadow-lg mb-12">
          <h2 className="text-2xl font-bold mb-6 text-center">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Value 1 */}
            <div className="text-center">
              <FaUsers className="text-blue-500 text-4xl mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Customer First</h3>
              <p className="text-gray-600">
                We prioritize our customers' needs and ensure their satisfaction with every purchase.
              </p>
            </div>
            {/* Value 2 */}
            <div className="text-center">
              <FaLightbulb className="text-blue-500 text-4xl mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Innovation</h3>
              <p className="text-gray-600">
                We continuously innovate to bring the latest products and technologies to our customers.
              </p>
            </div>
            {/* Value 3 */}
            <div className="text-center">
              <FaHandshake className="text-blue-500 text-4xl mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Integrity</h3>
              <p className="text-gray-600">
                We believe in transparency and honesty in all our business dealings.
              </p>
            </div>
          </div>
        </div>

        {/* Our Team */}
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-6 text-center">Meet Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Team Member 1 */}
            <div className="text-center">
              <img
                src="https://via.placeholder.com/150"
                alt="Team Member"
                className="w-32 h-32 rounded-full mx-auto mb-4"
              />
              <h3 className="text-xl font-bold mb-2">John Doe</h3>
              <p className="text-gray-600">CEO & Founder</p>
            </div>
            {/* Team Member 2 */}
            <div className="text-center">
              <img
                src="https://via.placeholder.com/150"
                alt="Team Member"
                className="w-32 h-32 rounded-full mx-auto mb-4"
              />
              <h3 className="text-xl font-bold mb-2">Jane Smith</h3>
              <p className="text-gray-600">Chief Marketing Officer</p>
            </div>
            {/* Team Member 3 */}
            <div className="text-center">
              <img
                src="https://via.placeholder.com/150"
                alt="Team Member"
                className="w-32 h-32 rounded-full mx-auto mb-4"
              />
              <h3 className="text-xl font-bold mb-2">Mike Johnson</h3>
              <p className="text-gray-600">Chief Technology Officer</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default AboutPage;