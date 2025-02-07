"use client";
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const BoxesCore = () => {
  const numRows = 100; // Reduced to fit screen better
  const numCols = 100;

  const getColumnLabel = (index: number) => {
    let label = "";
    while (index >= 0) {
      label = String.fromCharCode((index % 26) + 65) + label;
      index = Math.floor(index / 26) - 1;
    }
    return label;
  };

  return (
    <div
      className=
        " absolute left-1/2 top-1/2 pt-[0rem] -translate-x-1/2 -translate-y-1/2 overflow-auto border  border-black bg-white shadow-lg max-h-full max-w-full"
   
    >
      <div className="grid h-50" style={{ gridTemplateColumns: `50px repeat(${numCols}, 100px)` }}>
        {/* Column Headers */}
        <div className="w-[50px] h-[40px] border border-gray-300 flex items-center justify-center bg-gray-200"></div>
        {Array.from({ length: numCols }).map((_, colIndex) => (
          <div key={`col-${colIndex}`} className="w-[100px] h-[40px] border border-gray-300 flex items-center justify-center bg-gray-200 font-bold">
           {getColumnLabel(colIndex)}
          </div>
        ))}
        
        {/* Rows with Numbers */}
        {Array.from({ length: numRows }).map((_, rowIndex) => (
          <React.Fragment key={`row-${rowIndex}`}>
            <div className="w-[50px] h-[40px] border border-gray-300 flex items-center justify-center bg-gray-200 font-bold">
              {rowIndex + 1}
            </div>
            {Array.from({ length: numCols }).map((_, colIndex) => (
              <motion.div
                key={`cell-${rowIndex}-${colIndex}`}
                className="w-[100px] h-[40px] border border-gray-300 flex items-center justify-center text-sm text-gray-700 bg-white hover:bg-gray-100 focus:outline-none"
                whileHover={{ scale: 1.02 }}
              >
                <input
                  type="text"
                  className="w-full h-full text-center outline-none bg-transparent"
                />
              </motion.div>
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

const Grid = React.memo(BoxesCore);
export default Grid;