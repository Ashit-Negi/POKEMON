import React from "react";

function Detail({ pokemon, close }) {
  if (!pokemon) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-4 rounded w-72">
        <h2 className="font-bold capitalize">{pokemon.name}</h2>

        <img src={pokemon.sprites?.front_default} className="mx-auto" />

        <ul className="mt-2">
          {pokemon.stats?.map((s) => (
            <li key={s.stat.name}>
              {s.stat.name}: {s.base_stat}
            </li>
          ))}
        </ul>

        <button
          className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
          onClick={close}
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default Detail;
