import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Donation = () => {
  const [formData, setFormData] = useState({
    foodItem: '',
    description: '',
    pickupDate: '',
    pickupAddress: '',
    chooseState: '',
    chooseCity: '',
    contactPerson: '',
    contactPersonNumber: ''
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/donorlist', formData);
      setSuccess('Donation submitted successfully!');

      const donorId = response.data._id;

      await axios.post('http://localhost:3000/api/notifications/create', {
        donorId: donorId,
        contactName: formData.contactPerson,
        contactNumber: formData.contactPersonNumber,
        message: 'New donation available for pickup'
      });
  
      setError('');
      setFormData({
        foodItem: '',
        description: '',
        pickupDate: '',
        pickupAddress: '',
        chooseState: '',
        chooseCity: '',
        contactPerson: '',
        contactPersonNumber: ''
      });
    } catch (err) {
      console.error('Error while submitting donation or creating notification:', err);
      setError('An error occurred while submitting the form. Please try again.');
      setSuccess('');
    }
  };

  useEffect(() => {
    if (success || error) {
      const timer = setTimeout(() => {
        setSuccess('');
        setError('');
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [success, error]);

  return (
    <div className="flex">
      <aside className="w-72 h-screen bg-teal-800 text-white pt-28 rounded-r-lg shadow-lg fixed top-0 left-0">
        <h2 className="text-3xl font-bold mb-6 text-center">Donor Section</h2>
        <ul className="flex flex-col items-center space-y-4">
          <li>
            <Link to="/requests" className="text-lg text-teal-50 hover:text-black transition-colors duration-300">
              Requests
            </Link>
          </li>
        </ul>
      </aside>
      <main className="ml-72 w-full p-6">
        <h1 className="text-2xl font-bold mb-4">Donor Information</h1>
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6 space-y-6">
          {success && <div className="text-green-600 bg-green-200 p-2 rounded-lg text-center">{success}</div>}
          {error && <div className="text-red-800 bg-red-200 p-2 rounded-lg text-center">{error}</div>}
          
          {Object.entries({
            foodItem: 'Food Item',
            description: 'Description',
            pickupDate: 'Pickup Date',
            pickupAddress: 'Pickup Address',
            chooseState: 'State',
            chooseCity: 'City',
            contactPerson: 'Contact Person',
            contactPersonNumber: 'Contact Person Number'
          }).map(([key, label]) => (
            <div key={key} className="relative z-0 w-full mb-5 group">
              <input
                type={key === 'pickupDate' ? 'date' : 'text'}
                name={key}
                id={key}
                value={formData[key]}
                onChange={handleChange}
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-teal-600 peer"
                placeholder=" "
                required
              />
              <label
                htmlFor={key}
                className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-teal-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                {label}
              </label>
            </div>
          ))}

          <button
            type="submit"
            className="text-white bg-teal-700 hover:bg-teal-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-1/6 px-5 py-2.5 text-center"
          >
            Submit
          </button>
        </form>
      </main>
    </div>
  );
};

export default Donation;