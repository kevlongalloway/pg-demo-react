import React, { useState, useEffect } from 'react';
import BackButton from '../components/BackButton';
import SpeechComponent from '../components/SpeechComponent';
import LoadingOverlay from '../components/LoadingOverlay';

export default function BreathingExercise() {
  const [assistantReply, setAssistantReply] = useState('');
  const [loading, setLoading] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [speechRetrieved, setSpeechRetrieved] = useState(false); // New state hook

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
        setSpeechRetrieved(true); // Set speechRetrieved to true when speech is retrieved
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

  useEffect(() => {
    setSpeechRetrieved(assistantReply !== ''); // Check if assistantReply is not empty on initial render
  }, [assistantReply]);

  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center mb-4">
        <BackButton to="/dashboard" />
        <h1 className="text-2xl font-bold ml-2">Breathing Exercise</h1>
      </div>
      <div className="bg-white rounded-lg shadow-lg p-4">
        <p className="text-lg font-bold mb-2" id="assistant-reply">
          {assistantReply}
        </p>
        {speechRetrieved ? (
          <SpeechComponent
            text={assistantReply}
            onSpeakingChange={(speaking) => setSpeaking(speaking)}
          />
        ) : (
          <button
            className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
              loading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            onClick={startBreathingExercise}
            disabled={loading}
            id="start-breathing-exercise-button"
          >
            {loading ? 'Loading...' : 'Start Breathing Exercise'}
          </button>
        )}
      </div>
      {loading && <LoadingOverlay />}
    </div>
  );
}
