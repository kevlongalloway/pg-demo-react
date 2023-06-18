import React, { useState } from 'react';

export default function BreathingExercise() {
  const [assistantReply, setAssistantReply] = useState('');
  const [loading, setLoading] = useState(false);

  const accessToken = localStorage.getItem('access_token');

  const startBreathingExercise = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://kevlongalloway.shop/api/breathing-exercise', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({}),
      });
      if (response.ok) {
        const data = await response.json();
        setAssistantReply(data.response);
      } else {
        setAssistantReply('An error occurred while starting the breathing exercise.');
      }
    } catch (error) {
      console.error('Error:', error);
      setAssistantReply('An error occurred while starting the breathing exercise.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <div className="flex flex-initial">
        <BackButton to="/dashboard" />
      </div>
      <h1 className="text-2xl font-bold mb-4">Breathing Exercise</h1>
      <div className="bg-white rounded-lg shadow-lg p-4" id="breathing-exercise-container">
        <p className="text-lg font-bold mb-2" id="assistant-reply">
          {assistantReply}
        </p>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={startBreathingExercise}
          disabled={loading}
          id="start-breathing-exercise-button"
        >
          {loading ? 'Loading...' : 'Start Breathing Exercise'}
        </button>
      </div>
    </div>
  );
}
