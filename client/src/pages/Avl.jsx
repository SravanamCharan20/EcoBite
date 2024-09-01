import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ClipLoader } from 'react-spinners';

const Avl = () => {
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(null); 
  const [requestDetails, setRequestDetails] = useState({ contactName: '', contactNumber: '', message: '' });

  useEffect(() => {
    const fetchDonors = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/donorlist');
        setDonors(response.data);
        setLoading(false);
      } catch (err) {
        setError('An error occurred while fetching the donor list. Please try again later.');
        setLoading(false);
      }
    };
    fetchDonors();
  }, []);

  const handleRequestClick = (donorId) => {
    setShowForm(showForm === donorId ? null : donorId);
  };

  const handleInputChange = (e) => {
    setRequestDetails({ ...requestDetails, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (donorId) => {
    try {
      const response = await axios.post(`http://localhost:3000/api/request/${donorId}`, requestDetails);
      alert('Request submitted successfully.');
      setShowForm(null); 
    } catch (err) {
      alert('Failed to submit request. Please try again.');
    }
  };

  return (
    <div className="max-w-auto w-auto mx-auto p-6 shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-10 text-center">Available Food List</h1>
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <ClipLoader className="text-teal-600" size={50} />
        </div>
      ) : error ? (
        <p className="text-red-500 text-center">{error}</p>
      ) : (
        <div className="relative mb-4 shadow rounded-full">
          <table className="min-w-full table-fixed divide-y divide-gray-200 border-collapse">
            <thead className="bg-teal-700">
              <tr>
                <th className="w-1/5 px-4 py-2 text-left text-xs font-medium text-teal-100 uppercase">Food Item</th>
                <th className="w-1/4 px-4 py-2 text-left text-xs font-medium text-teal-100 uppercase">Description</th>
                <th className="w-1/5 px-4 py-2 text-left text-xs font-medium text-teal-100 uppercase">Pickup Date</th>
                <th className="w-1/4 px-4 py-2 text-left text-xs font-medium text-teal-100 uppercase">Address</th>
                <th className="w-1/6 px-4 py-2 text-left text-xs font-medium text-teal-100 uppercase">Contact</th>
                <th className="w-1/6 px-4 py-2 text-center text-xs font-medium text-teal-100 uppercase">Request</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-300">
              {donors.map((donor) => (
                <React.Fragment key={donor._id}>
                  <tr className="hover:bg-gray-100">
                    <td className="px-4 py-2 whitespace-normal text-sm">{donor.foodItem}</td>
                    <td className="px-4 py-2 whitespace-normal text-sm">{donor.description}</td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm">{new Date(donor.pickupDate).toLocaleDateString()}</td>
                    <td className="px-4 py-2 whitespace-normal text-sm">{donor.pickupAddress}</td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm">{donor.contactPerson} ({donor.contactPersonNumber})</td>
                    <td className="px-4 py-2 whitespace-nowrap text-center">
                      <button
                        onClick={() => handleRequestClick(donor._id)}
                        className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded text-white bg-teal-700 hover:bg-teal-500 focus:outline-none focus:ring-2 focus:ring-offset-2"
                      >
                        Request
                      </button>
                    </td>
                  </tr>
                  {showForm === donor._id && (
                    <tr>
                      <td colSpan="6" className="px-4 py-2">
                        <div className="bg-gray-100 p-4 rounded-md">
                          <h3 className="text-md font-semibold mb-2">Request Details</h3>
                          <input
                            type="text"
                            name="contactName"
                            value={requestDetails.contactName}
                            onChange={handleInputChange}
                            placeholder="Your Name"
                            className="w-full mb-2 p-2 border rounded"
                          />
                          <input
                            type="text"
                            name="contactNumber"
                            value={requestDetails.contactNumber}
                            onChange={handleInputChange}
                            placeholder="Your Contact Number"
                            className="w-full mb-2 p-2 border rounded"
                          />
                          <textarea
                            name="message"
                            value={requestDetails.message}
                            onChange={handleInputChange}
                            placeholder="Your Message"
                            className="w-full mb-2 p-2 border rounded"
                          />
                          <button
                            onClick={() => handleSubmit(donor._id)}
                            className="bg-teal-700 text-white px-4 py-2 rounded"
                          >
                            Submit
                          </button>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Avl;