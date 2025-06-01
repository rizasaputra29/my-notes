import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { FiPlus, FiAlertCircle } from "react-icons/fi";
import toast from "react-hot-toast";
import Note from "../components/note/Note";
import { useNavigate } from "react-router-dom";

const NotesPage = () => {
  const {
    token,
    setToken,
    user,
    setUser,
    getNotes,
    allNotes,
    setAllNotes,
    getTokenFromCookie,
  } = useContext(AppContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  function checkToken() {
    if (!token) {
      toast.error("Please login to access this page");
      setToken(null);
      setUser(null);
      setAllNotes(null);
      function removeCookie(name) {
        document.cookie = `${name}=; Max-Age=0; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
      }
      removeCookie("token");
      navigate("/page/login");
    }
  }

  async function getNotesFunc() {
    setLoading(true);
    try {
      await getNotes();
    } catch (error) {
      console.error("Error fetching notes:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getTokenFromCookie();
    checkToken();
    getNotesFunc();
  }, [token]);

  const total = allNotes ? allNotes.length : 0;

  return (
    <div className="min-h-screen bg-gray-900 pt-20">
      {/* Header with subtle gradient background */}
      <div className="sticky top-16 z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-5 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-light text-gray-100">Notes</h1>
            <p className="text-sm text-gray-400 mt-1">{total} {total === 1 ? 'note' : 'notes'} available</p>
          </div>
          <button
            onClick={() => navigate("/createNote")}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded-md transition-colors"
          >
            <FiPlus />
            <span className="hidden sm:inline">New Note</span>
          </button>
        </div>
      </div>

      {/* Notes Grid with improved spacing */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : allNotes && allNotes.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {allNotes.map((note, index) => (
                <div key={note._id} className="h-full">
                  <Note item={note} index={index} id={note?._id} />
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-64 text-center">
            <div className="bg-gray-800 rounded-full p-4 mb-4">
              <FiAlertCircle className="text-gray-400 text-3xl" />
            </div>
            <p className="text-gray-300 text-lg font-light">No notes available</p>
            <p className="text-gray-500 mt-2 max-w-md">
              Create your first note by clicking the + button
            </p>
          </div>
        )}
      </div>

      {/* Mobile Floating Action Button */}
      <button
        onClick={() => navigate("/createNote")}
        className="sm:hidden fixed bottom-6 right-6 w-12 h-12 bg-blue-600 hover:bg-blue-700 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 z-20"
        aria-label="Create new note"
      >
        <FiPlus className="text-white text-xl" />
      </button>
    </div>
  );
};

export default NotesPage;