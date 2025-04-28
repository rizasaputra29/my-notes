import React, { useContext, useState } from "react";
import DragDrop from "../components/dragDrop/DragDrop";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { AppContext } from "../context/AppContext";

const UpdateNotePage = () => {
  const { id } = useParams();
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const { token } = useContext(AppContext);
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);

  const [oldfile, setOldfile] = useState(null);

  async function getNoteDetails(id) {
    try {
      const data = {
        id: id,
      };
      console.log("data==>", data, id);
      const res = await axios(`${backendUrl}/oneNote`, {
        params: {
          id: id,
        },
      });

      console.log(res);

      // set title and desc value
      setTitle(res?.data?.note?.title);
      setDesc(res?.data?.note?.desc);
      setOldfile(res?.data?.note?.img);
    } catch (error) {
      console.log("error =>", error);
    }
  }

  useState(() => {
    getNoteDetails(id);
  }, [id]);

  const handleChange = (file) => {
    setFile(file);
  };

  async function updateNoteHandler(note) {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      };
      const res = await axios.post(`${backendUrl}/updateNote`, note, config);

      console.log(res);

      navigate(`/note/${id}`);
    } catch (error) {
      toast.error(error.response.data.message);
      if (error.response.data.error.message) {
        toast.error(error.response.data.error.message);
      }
      console.log("errror =>", error, error.response.data.message);
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    console.log("update submit called");

    if (!title || !desc) {
      toast.error("title or desc empty");
      return;
    }

    const note = {
      title: title,
      desc: desc,
      imageFile: file,
      id: id,
    };

    toast.promise(updateNoteHandler(note), {
      loading: "Updating...",
      success: <b>Note updated</b>,
      error: <b>Could not save.</b>,
    });
  }

  console.log("file ==>", file);
  console.log("title and desc", title, desc);
  return (
    <div className="min-h-[calc(100vh-64px)] mt-16 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
      <div className="container max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <h1 className="text-3xl font-bold text-white mb-6">Update Note</h1>

        {title ? (
          <div className="bg-gray-800/50 backdrop-blur-md rounded-xl p-6 shadow-lg">
            <form className="space-y-6">
              {/* Title Input */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-300">
                  Title
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-white"
                />
              </div>

              {/* Description Input */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-300">
                  Description
                </label>
                <textarea
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                  rows="6"
                  className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-white"
                />
              </div>

              {/* Image Upload */}
              <div className="space-y-4">
                <label className="block text-sm font-medium text-gray-300">
                  Image
                </label>
                <DragDrop handleChange={handleChange} />
                {!file?.name && oldfile && (
                  <div className="mt-4 relative group">
                    <img
                      src={oldfile}
                      alt="Current"
                      className="w-full h-48 object-cover rounded-lg"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                      <p className="text-white text-sm">Current image</p>
                    </div>
                  </div>
                )}
                {file?.name && (
                  <p className="text-sm text-gray-400">{file.name}</p>
                )}
              </div>

              {/* Submit Button */}
              <button
                onClick={handleSubmit}
                className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-medium transition-colors duration-300"
              >
                Update Note
              </button>
            </form>
          </div>
        ) : (
          <div className="bg-gray-800/50 backdrop-blur-md rounded-xl p-8 text-center">
            <p className="text-gray-400">Note not available</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UpdateNotePage;
