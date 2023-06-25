import React, { useState, useEffect } from 'react';
import BackButton from '../components/BackButton';
import SpeechComponent from '../components/SpeechComponent';
import LoadingOverlay from '../components/LoadingOverlay';

export default function GuidedMeditation() {
  const [assistantReply, setAssistantReply] = useState('');
  const [loading, setLoading] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [speechRetrieved, setSpeechRetrieved] = useState(false); // New state hook

  const accessToken = localStorage.getItem('access_token');

  const requestMeditation = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://kevlongalloway.shop/api/guided-meditation', {
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
        setAssistantReply('An error occurred while requesting the meditation.');
      }
    } catch (error) {
      console.error('Error:', error);
      setAssistantReply('An error occurred while requesting the meditation.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setSpeechRetrieved(assistantReply !== ''); // Check if assistantReply is not empty on initial render
  }, [assistantReply]);

  return (
    <div className="container mx-auto py-8">
      <div className="flex flex-initial">
        <BackButton to="/dashboard" />
      </div>
      <h1 className="text-2xl font-bold mb-4">Guided Meditation</h1>
      <div className="bg-white rounded-lg shadow-lg p-4" id="meditation-container">
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
            onClick={requestMeditation}
            disabled={loading}
            id="request-meditation-button"
          >
            {loading ? 'Loading...' : 'Request Meditation'}
          </button>
        )}
      </div>
      {loading && <LoadingOverlay />}
    </div>
  );
}
