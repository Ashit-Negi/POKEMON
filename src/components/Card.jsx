import React from "react";

function Card({ pokemon, isFav, toggleFav, openDetail }) {
  return (
    <div
      className="bg-white p-4 rounded shadow cursor-pointer relative"
      onClick={openDetail}
    >
      <button
        className="absolute top-2 right-2"
        onClick={(e) => {
          e.stopPropagation();
          toggleFav(pokemon.name);
        }}
      >
        {isFav ? "❤️" : "🤍"}
      </button>

      {/* image safe */}
      <img
        src={pokemon.sprites?.front_default}
        alt={pokemon.name}
        className="w-24 h-24 mx-auto"
      />

      <h3 className="text-center capitalize mt-2">{pokemon.name}</h3>

      {/* types safe */}
      <div className="flex justify-center gap-2 mt-2 flex-wrap">
        {pokemon.types?.map((t) => (
          <span key={t.type.name} className="text-xs bg-gray-200 px-2 rounded">
            {t.type.name}
          </span>
        ))}
      </div>
    </div>
  );
}

export default Card;
