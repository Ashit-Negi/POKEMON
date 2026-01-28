import React, { useState } from "react";

function Favorites() {
  const [favorites, setFavorites] = useState(() => {
    return JSON.parse(localStorage.getItem("favorites")) || [];
  });

  const toggleFavorite = (name) => {
    setFavorites((prev) => {
      const updated = prev.includes(name)
        ? prev.filter((f) => f !== name)
        : [...prev, name];

      localStorage.setItem("favorites", JSON.stringify(updated));
      return updated;
    });
  };

  return { favorites, toggleFavorite };
}

export default Favorites;
