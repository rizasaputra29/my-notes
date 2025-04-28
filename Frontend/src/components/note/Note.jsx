import React from "react";
import { useNavigate } from "react-router-dom";
import DeleteBtn from "../delete/DeleteBtn";

const Note = ({ item, index, id }) => {
  const navigate = useNavigate();
  let desc = item?.desc;
  item?.img ? (desc = desc.slice(0, 50) + " ...") : (desc = desc.slice(0, 200) + " ...");

  return (
    <div
      id={id}
      className="group relative bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden transition-all duration-300 hover:bg-gray-800 hover:shadow-xl hover:shadow-blue-900/20 hover:-translate-y-1"
    >
      {/* Content Container */}
      <div 
        onClick={() => navigate(`/note/${id}`)}
        className="p-4 flex flex-col gap-4 h-[300px]"
      >
        {/* Title */}
        <h3 className="text-lg font-semibold text-white truncate bg-gray-900/50 p-3 rounded-lg group-hover:bg-gray-900/70 transition-colors">
          {item?.title}
        </h3>

        {/* Description */}
        <p className="text-gray-300 text-sm line-clamp-2 px-1">
          {desc}
        </p>

        {/* Image Container */}
        <div className="flex-1 flex items-center justify-center overflow-hidden rounded-lg bg-gray-900/30">
          {item?.img && (
            <img
              src={item.img}
              alt={item.title}
              className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
            />
          )}
        </div>
      </div>

      {/* Delete Button - Positioned absolutely */}
      <div className="absolute bottom-3 right-3 opacity-0 transform translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
        <DeleteBtn id={id} />
      </div>
    </div>
  );
};

export default Note;