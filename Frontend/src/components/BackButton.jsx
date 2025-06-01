// Frontend/src/components/BackButton.jsx
import React from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(-1)}
      className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
    >
      <FiArrowLeft size={20} />
      <span className="text-sm">Back</span>
    </button>
  );
};

export default BackButton;