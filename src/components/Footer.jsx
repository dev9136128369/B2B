import React from 'react';
import Link from 'next/link';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Us */}
          <div>
            <h3 className=" font-bold mb-4 text-custom-orange text-2xl">About Us</h3>
            <p className="text-white">
              We are a leading e-commerce platform offering the best products at affordable prices.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className=" font-bold mb-4 text-custom-orange text-2xl">Quick Links</h3>
            <ul className="text-white ">
              <li className="mb-2 text-white hover:text-pink">
                <Link href="/" className="text-white-400 hover:text-custom-orange">Home</Link>
              </li>
              <li className="mb-2 ">
                <Link href="/store" className="text-white-400 hover:text-custom-orange">Store</Link>
              </li>
              <li className="mb-2">
                <Link href="/about" className="text-white-400 hover:text-custom-orange">About Us</Link>
              </li>
              <li className="mb-2">
                <Link href="/contact" className="text-white-400 hover:text-custom-orange">Contact Us</Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className=" font-bold mb-4 text-custom-orange text-2xl">Contact Info</h3>
            <ul className="text-gray-400">
              <li className="mb-2 text-1xl text-white">Email: support@ciphererp.com</li>
              <li className="mb-2 text-1xl text-white">Phone: +91 1204375355</li>
              <li className="mb-2 text-1xl text-white">Address: CipherShield Technology
              J.S. Arcade, Sec - 18, Noida</li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className=" font-bold mb-6 text-custom-orange text-2xl">Follow Us</h3>
            <div className="flex space-x-4 ">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white-400 hover:text-pink-600"
              >
                <FaFacebook size={24} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white-400 hover:text-pink-600"
              >
                <FaTwitter size={24} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white-400 hover:text-pink-600"
              >
                <FaInstagram size={24} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white-400 hover:text-pink-600"
              >
                <FaLinkedin size={24} />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-white">
          <p>&copy; {new Date().getFullYear()} E-Store. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;