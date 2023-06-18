import React, { useState, useEffect } from 'react';
import BackButton from '../components/BackButton';

export default function BreathingExercise() {
  const [assistantReply, setAssistantReply] = useState('');
  const [loading, setLoading] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [speech, setSpeech] = useState(null);
  const [audioUrl, setAudioUrl] = useState(null);

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
        await synthesizeAudio(data.response); // Synthesize and play audio
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

  const synthesizeAudio = async (text) => {
    try {
      const audioResponse = await fetch('https://texttospeech.googleapis.com/v1beta1/{parent=projects/*/locations/*}:synthesizeLongAudio', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          // Provide the necessary request parameters for synthesizing audio
          // For example, you can specify the text, voice, and other options
          text: text,
          voice: { /* Specify the voice options */ },
        }),
      });

      if (audioResponse.ok) {
        const audioData = await audioResponse.json();
        const audioUrl = audioData.audioUrl;
        setAudioUrl(audioUrl);
        playAudio();
      } else {
        console.error('Error synthesizing audio');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const playAudio = () => {
    const audioElement = new Audio(audioUrl);
    audioElement.onplay = () => setSpeaking(true);
    audioElement.onended = () => setSpeaking(false);
    audioElement.play();
  };

  const pauseSpeech = () => {
    if (speech && speaking) {
      window.speechSynthesis.pause();
      setSpeaking(false);
    }
  };

  const resumeSpeech = () => {
    if (speech && !speaking) {
      window.speechSynthesis.resume();
      setSpeaking(true);
    }
  };

  useEffect(() => {
    return () => {
      // Cleanup: Cancel speech synthesis and clear the speech utterance
      window.speechSynthesis.cancel();
      setSpeech(null);
    };
  }, []);

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
        {speaking && (
          <>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={pauseSpeech}
            >
              Pause
            </button>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={resumeSpeech}
            >
              Resume
            </button>
          </>
        )}
      </div>
    </div>
  );
}
