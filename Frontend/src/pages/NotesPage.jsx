import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { FiPlus } from "react-icons/fi";
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
  const [loading, setLoading] = useState(false);

  function checkToken() {
    if (!token) {
      toast.error("Token is not available");
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
    const response = await getNotes();
  }

  useEffect(() => {
    getTokenFromCookie();
    checkToken();
    getNotesFunc();
  }, [token]);

  const total = allNotes ? allNotes.length : 0;

  return (
    <div className="min-h-screen pt-24">
      {/* Header Section with Title */}
      <div className="sticky top-16 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <h1 className="text-3xl font-bold text-gray-100">
            Your Notes ({total})
          </h1>
        </div>
      </div>

      {/* Notes Grid */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {allNotes && allNotes.length > 0 ? (
            allNotes.map((note, index) => (
              <div key={note._id}>
                <Note item={note} index={index} id={note?._id} />
              </div>
            ))
          ) : (
            <div className="col-span-full flex items-center justify-center h-48 text-gray-400">
              No notes available. Create your first note!
            </div>
          )}
        </div>
      </div>

      {/* Floating Action Button */}
      <button
        onClick={() => navigate("/createNote")}
        className="fixed bottom-8 right-8 w-14 h-14 bg-blue-600 hover:bg-blue-700 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 focus:outline-none z-20"
      >
        <FiPlus className="text-white text-2xl" />
      </button>
    </div>
  );
};

export default NotesPage;