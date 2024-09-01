import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Requests = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/notifications');
        setNotifications(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching notifications:', err); // Detailed logging
        setError('An error occurred while fetching the notifications. Please try again later.');
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  return (
    <div className="w-full p-6">
      <h1 className="text-2xl font-bold mb-4">Requests</h1>
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <p>Loading...</p>
        </div>
      ) : error ? (
        <div className="text-red-600">{error}</div>
      ) : (
        <div className="flex flex-wrap">
          {notifications.map((notification) => (
            <div key={notification._id} className="w-full md:w-1/2 lg:w-1/3 p-4">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-lg font-bold mb-2">Contact Name: {notification.contactName}</h2>
                <p>Contact Number: {notification.contactNumber}</p>
                <p>Message: {notification.message}</p>
                {notification.status !== 'success' && (
                  <button
                    onClick={() => handleMarkAsSuccess(notification._id)}
                    className="mt-4 bg-teal-700 text-white px-4 py-2 rounded"
                  >
                    Mark as Success
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Requests;