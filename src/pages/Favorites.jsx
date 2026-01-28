import React, { useEffect, useState } from "react";
import PokemonCard from "../components/Card";

function Favorites() {
  const [pokemon, setPokemon] = useState([]);
  const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

  useEffect(() => {
    async function fetchFavorites() {
      const data = await Promise.all(
        favorites.map((name) =>
          fetch(`https://pokeapi.co/api/v2/pokemon/${name}`).then((res) =>
            res.json(),
          ),
        ),
      );
      setPokemon(data);
    }

    if (favorites.length > 0) {
      fetchFavorites();
    }
  }, []);

  if (favorites.length === 0) {
    return <p className="p-4">No favorite Pokémon yet.</p>;
  }

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Favorite Pokémon</h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {pokemon.map((p) => (
          <PokemonCard
            key={p.name}
            pokemon={p}
            isFav={true}
            toggleFav={() => {}}
            openDetail={() => {}}
          />
        ))}
      </div>
    </div>
  );
}

export default Favorites;
