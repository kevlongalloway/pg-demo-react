import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function GuidedMeditation() {
  const [assistantReply, setAssistantReply] = useState('');
  const [loading, setLoading] = useState(false);

  const accessToken = localStorage.getItem('access_token');

  const requestMeditation = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        'https://kevlongalloway.shop/api/guided-meditation',
        {},
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      const data = response.data;
      setAssistantReply(data.response);
    } catch (error) {
      console.error('Error:', error);
      setAssistantReply('An error occurred while requesting the meditation.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Guided Meditation</h1>
      <div className="bg-white rounded-lg shadow-lg p-4" id="meditation-container">
        <p className="text-lg font-bold mb-2" id="assistant-reply">
          {assistantReply}
        </p>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={requestMeditation}
          disabled={loading}
          id="request-meditation-button"
        >
          {loading ? 'Loading...' : 'Request Meditation'}
        </button>
      </div>
    </div>
  );
}
