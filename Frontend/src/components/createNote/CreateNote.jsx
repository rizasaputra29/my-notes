import React, { useContext, useState } from "react";
import DragDrop from "../dragDrop/DragDrop";
import toast from "react-hot-toast";
import { AppContext } from "../../context/AppContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateNote = () => {
  const navigate = useNavigate();
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const { token } = useContext(AppContext);

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);

  const handleChange = (file) => {
    setFile(file);
  };

  async function createNoteHandler(note) {
    if (!token) {
      toast.error("Token is missing");
      return;
    }
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      };
      const res = await axios.post(`${backendUrl}/createNote`, note, config);

      navigate("/notes");
    } catch (error) {
      toast.error(error.response.data.message);
      if (error.response.data.error.message) {
        toast.error(error.response.data.error.message);
      }
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!title || !desc) {
      toast.error("Title or description is empty");
      return;
    }
    const note = {
      title: title,
      desc: desc,
      imageFile: file,
    };

    toast.promise(createNoteHandler(note), {
      loading: "Creating...",
      success: <b>Note created</b>,
      error: <b>Could not save.</b>,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white flex items-center justify-center">
      <div className="w-full max-w-2xl p-8 bg-gray-800 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center text-gray-100 mb-6">
          Create a New Note
        </h2>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-6 items-center"
        >
          {/* Title Input */}
          <div className="w-full">
            <label
              htmlFor="title"
              className="block text-lg font-semibold text-gray-100 mb-2"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              placeholder="Enter your note title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-3 bg-gray-700 text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
            />
          </div>

          {/* Description Input */}
          <div className="w-full">
            <label
              htmlFor="desc"
              className="block text-lg font-semibold text-gray-100 mb-2"
            >
              Description
            </label>
            <textarea
              id="desc"
              name="desc"
              placeholder="Write your note description"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              className="w-full h-32 px-4 py-3 bg-gray-700 text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
            />
          </div>

          {/* File Upload */}
          <div className="w-full">
            <label
              htmlFor="file"
              className="block text-lg font-semibold text-gray-100 mb-2"
            >
              Upload Image (Optional)
            </label>
            <DragDrop handleChange={handleChange} />
            {file && (
              <p className="mt-2 text-sm text-gray-400">{file.name}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition duration-300"
          >
            Create Note
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateNote;