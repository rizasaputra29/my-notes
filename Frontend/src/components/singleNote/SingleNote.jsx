import React from "react";
import { useNavigate } from "react-router-dom";
import { FiEdit2 } from "react-icons/fi";

const SingleNote = ({ note, id }) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen pt-20 px-4 md:px-6 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Title */}
        <div className="bg-gray-800/80 backdrop-blur-md rounded-xl p-6 shadow-lg">
          <h1 className="text-2xl md:text-3xl font-bold text-white">
            {note?.title}
          </h1>
        </div>

        {/* Description */}
        <div className="bg-gray-800/60 backdrop-blur-md rounded-xl p-6 shadow-lg">
          <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">
            {note?.desc}
          </p>
        </div>

        {/* Image */}
        {note?.img && (
          <div className="bg-gray-800/40 backdrop-blur-md rounded-xl p-4 shadow-lg overflow-hidden">
            <img
              src={note?.img}
              className="w-full h-auto rounded-lg object-cover transform hover:scale-[1.02] transition-transform duration-300"
              alt={note?.title}
            />
          </div>
        )}

        {/* Update Button */}
        <div className="flex justify-end pt-4">
          <button
            onClick={() => navigate(`/updatenote/${id}`)}
            className="group flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-full text-white font-medium transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20"
          >
            <FiEdit2 className="group-hover:rotate-12 transition-transform duration-300" />
            Update Note
          </button>
        </div>
      </div>
    </div>
  );
};

export default SingleNote;