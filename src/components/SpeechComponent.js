import React, { useState, useEffect } from 'react';

const SpeechComponent = ({ text, onSpeakingChange }) => {
  const [speaking, setSpeaking] = useState(false);
  const [speech, setSpeech] = useState(null);

  const speakText = (text) => {
    if (!speech) {
      const speechUtterance = new SpeechSynthesisUtterance(text);
      speechUtterance.lang = 'en-US';
      setSpeech(speechUtterance);
    } else {
      speech.text = text;
    }

    if (speech) {
      speech.onstart = () => setSpeaking(true);
      speech.onend = () => setSpeaking(false);
      window.speechSynthesis.speak(speech);
    }
  };

  const pauseSpeech = () => {
    if (speech && speaking) {
      window.speechSynthesis.pause();
      setSpeaking(false);
      onSpeakingChange(false);
    }
  };

  const resumeSpeech = () => {
    if (speech && !speaking) {
      window.speechSynthesis.resume();
      setSpeaking(true);
      onSpeakingChange(true);
    }
  };

  useEffect(() => {
    return () => {
      // Cleanup: Cancel speech synthesis and clear the speech utterance
      window.speechSynthesis.cancel();
      setSpeech(null);
    };
  }, []);

  useEffect(() => {
    if (text) {
      speakText(text);
      onSpeakingChange(true);
    }
  }, [text, onSpeakingChange]);

  return (
    <>
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
    </>
  );
};

export default SpeechComponent;
