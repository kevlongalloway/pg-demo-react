import React, { useState } from 'react';

export default function PositiveAffirmation() {
  const [affirmation, setAffirmation] = useState('');
  const [loading, setLoading] = useState(false);

  const accessToken = localStorage.getItem('access_token');

  const fetchPositiveAffirmation = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://kevlongalloway.shop/api/positive-affirmation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setAffirmation(data.response);
      } else {
        setAffirmation('An error occurred while fetching the positive affirmation.');
      }
    } catch (error) {
      console.error('Error:', error);
      setAffirmation('An error occurred while fetching the positive affirmation.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <div className="flex flex-initial">
        <BackButton to="/dashboard" />
      </div>
      <h1 className="text-2xl font-bold mb-4">Positive Affirmation</h1>
      <div className="bg-white rounded-lg shadow-lg p-4" id="positive-affirmation-container">
        <p className="text-lg font-bold mb-2" id="affirmation">
          {affirmation}
        </p>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={fetchPositiveAffirmation}
          disabled={loading}
          id="fetch-affirmation-button"
        >
          {loading ? 'Loading...' : 'Fetch Positive Affirmation'}
        </button>
      </div>
    </div>
  );
}
