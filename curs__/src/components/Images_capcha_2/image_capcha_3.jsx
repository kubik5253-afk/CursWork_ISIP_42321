import { useState, useEffect } from "react";
import Image from "next/image";

export default function Imege_capcha_3() {
  const [tiles, setTiles] = useState([]);
  const [emptyIndex, setEmptyIndex] = useState(15); // Index of the empty tile

  // Example: Add 15 images + 1 empty tile (null)
  const images_1 = [
    "/Svet_3/Svetofor_1.jpg",
    "/Svet_3/Svetofor_2.jpg",
    "/Svet_3/Svetofor_3.jpg",
    "/Svet_3/Svetofor_4.jpg",
    "/Svet_3/Svetofor_5.jpg",
    "/Svet_3/Svetofor_6.jpg",
    "/Svet_3/Svetofor_7.jpg",
    "/Svet_3/Svetofor_8.jpg",
    "/Svet_3/Svetofor_9.jpg",
    "/Svet_3/Svetofor_10.jpg",
    "/Svet_3/Svetofor_11.jpg",
    "/Svet_3/Svetofor_12.jpg",
    "/Svet_3/Svetofor_13.jpg",
    "/Svet_3/Svetofor_14.jpg",
    "/Svet_3/Svetofor_15.jpg",
    null, // Empty tile
  ];

  // Shuffle the tiles on initialization
  useEffect(() => {
    const shuffled = [...images_1].sort(() => Math.random() - 0.5);
    setTiles(shuffled);
    const emptyIndex = shuffled.indexOf(null);
    setEmptyIndex(emptyIndex);
  }, []);

  // Check if the puzzle is solved
  const isSolved = () => {
    const correctOrder = [...images_1];
    return JSON.stringify(tiles) === JSON.stringify(correctOrder);
  };

  // Handle tile click
  const handleClick = (index) => {
    const row = Math.floor(index / 4);
    const col = index % 4;
    const emptyRow = Math.floor(emptyIndex / 4);
    const emptyCol = emptyIndex % 4;

    // Check if adjacent
    if (
      (Math.abs(row - emptyRow) === 1 && col === emptyCol) ||
      (Math.abs(col - emptyCol) === 1 && row === emptyRow)
    ) {
      const newTiles = [...tiles];
      [newTiles[index], newTiles[emptyIndex]] = [newTiles[emptyIndex], newTiles[index]];
      setTiles(newTiles);
      setEmptyIndex(index);

      if (isSolved()) {
        console.log("Puzzle solved!");
        localStorage.setItem("veri", true);
      }
    }
  };

  return (
    <div className="grid grid-cols-4 gap-1 p-1 h-full bg-gray-100">
      {tiles.map((src, index) => (
        <div
          key={index}
          className={`cursor-pointer border-2 border-gray-300 ${
            index === emptyIndex ? "hidden" : ""
          }`}
          onClick={() => handleClick(index)}
        >
          {src && (
            <Image
              src={src}
              alt={`Tile ${index + 1}`}
              width={111}
              height={111}
              className="object-contain"
            />
          )}
        </div>
      ))}
    </div>
  );
}