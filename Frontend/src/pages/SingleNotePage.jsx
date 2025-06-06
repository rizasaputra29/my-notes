import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SingleNote from "../components/singleNote/SingleNote";

const SingleNotePage = () => {
  const { id } = useParams();

  const backendUrl = "https://my-notes-wine.vercel.app/";

  const [note, setNote] = useState(null);

  async function getOnePostDetails(id) {
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
      setNote(res?.data?.note);
    } catch (error) {
      console.log("error =>", error);
    }
  }

  useEffect(() => {
    getOnePostDetails(id);
  }, [id]);

  console.log("id SingleNotePage ==>", id);
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 pt-24">
      <div className="container max-w-4xl mx-auto px-4 pb-16">
        <div className="bg-gray-800/50 backdrop-blur-md rounded-xl p-6 mb-6">
          <h1 className="text-2xl font-bold text-white">View Note</h1>
        </div>

        {note ? (
          <SingleNote note={note} id={id} />
        ) : (
          <div className="bg-gray-800/50 backdrop-blur-md rounded-xl p-8 text-center shadow-lg">
            <div className="animate-pulse">
              <div className="h-6 w-3/4 bg-gray-700 rounded mb-4 mx-auto"></div>
              <div className="h-4 w-1/2 bg-gray-700 rounded mx-auto"></div>
            </div>
            <p className="text-gray-400 mt-4">Loading note...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SingleNotePage;