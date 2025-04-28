"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const PartnerForm = ({ roles }) => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    role: '',
    address: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  const validate = () => {
    const temp = {};
    if (!formData.name.trim()) temp.name = 'Name is required.';
    if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) temp.email = 'Valid email required.';
    if (!formData.mobile || !/^\d{10}$/.test(formData.mobile)) temp.mobile = '10-digit mobile required.';
    if (!formData.role) temp.role = 'Please select your role.';
    if (!formData.address) temp.address = 'Address is required.';
    setErrors(temp);
    return Object.keys(temp).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("CHAL GYA ")
    if (validate()) {
      setLoading(true);
      try {
        
        const res = await fetch('/api/Regaster', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });

        const data = await res.json();

        if (res.ok) {
          localStorage.setItem("partners", JSON.stringify([
            ...(JSON.parse(localStorage.getItem("partners")) || []),
            formData
          ]));
          setSuccessMsg("Form submitted and email sent successfully.");
          setTimeout(() => router.push('/DashboardTabs'), 1500);
        } else {
          alert(data.message || 'Email failed to send');
        }
      } catch (error) {
        console.error(error);
        alert('Something went wrong.');
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-gray-200 shadow rounded-2xl mt-10 mb-5">
      <h2 className="text-2xl font-bold mb-4 text-center">Registration Form</h2>
      <div className="w-[200px] h-1 bg-pink-500 mx-auto mt-2 rounded-full mb-5"></div>

      {successMsg && <p className="text-green-600 text-center mb-4">{successMsg}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        {["name", "email", "mobile", "address"].map((field) => (
          <div key={field}>
            <label className="block font-medium capitalize mb-1">
              {field.replace(/([A-Z])/g, ' $1')}
            </label>
            <input
              type="text"
              name={field}
              value={formData[field]}
              onChange={handleChange}
              className="w-full border p-2 rounded-2xl"
              style={{ boxShadow: '0 0 0 transparent' }}
              onMouseEnter={(e) => (e.currentTarget.style.boxShadow = '0 4px 12px rgba(255, 0, 76, 0.46)')}
              onMouseLeave={(e) => (e.currentTarget.style.boxShadow = '0 0 0 transparent')}
            />
            {errors[field] && <small className="text-red-600">{errors[field]}</small>}
          </div>
        ))}

        <div>
          <label className="block font-medium mb-1">Role</label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full border p-2 rounded-2xl"
          >
            <option value="">Select Role</option>
            {roles.map((role) => (
              <option key={role} value={role}>{role}</option>
            ))}
          </select>
          {errors.role && <small className="text-red-600">{errors.role}</small>}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
          disabled={loading}
        >
          {loading ? 'Submitting...' : 'Submit'}
        </button>
      </form>
    </div>
  );
};

export default PartnerForm;
