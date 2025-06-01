import React from "react";
import { useNavigate } from "react-router-dom";
import { FiEdit2 } from "react-icons/fi";
import BackButton from "../BackButton";

const SingleNote = ({ note, id }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-gray-800/50 backdrop-blur-md rounded-xl p-6 shadow-lg">
      <div className="pb-5">
        <BackButton />
      </div>
      
      {/* Title */}
      <div className="space-y-6">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-300">
            Title
          </label>
          <div className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg text-white">
            {note?.title}
          </div>
        </div>

        {/* Description */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-300">
            Description
          </label>
          <div className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg text-white whitespace-pre-wrap min-h-[150px]">
            {note?.desc}
          </div>
        </div>

        {/* Image */}
        {note?.img && (
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-300">
              Image
            </label>
            <div className="mt-4 relative group">
              <img
                src={note?.img}
                className="w-full h-48 object-cover rounded-lg"
                alt={note?.title}
              />
            </div>
          </div>
        )}

        {/* Update Button */}
        <div className="pt-4">
          <button
            onClick={() => navigate(`/updatenote/${id}`)}
            className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-medium transition-colors duration-300"
          >
            <span className="flex items-center justify-center gap-2">
              <FiEdit2 className="group-hover:rotate-12 transition-transform duration-300" />
              Update Note
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SingleNote;