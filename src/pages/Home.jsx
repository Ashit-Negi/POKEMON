import React, { useState, useEffect } from "react";
import PokemonCard from "../components/Card";
import Pagination from "../components/Pagination";
import SearchBar from "../components/SearchBar";
import PokemonDetail from "../components/Details";
import Favorites from "../hooks/Favorites";

function Home() {
  const [pokemon, setPokemon] = useState([]);
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState("");
  const [type, setType] = useState("");
  const [selected, setSelected] = useState(null);

  const { favorites, toggleFavorite } = Favorites();

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon?limit=20&offset=${page * 20}`)
      .then((res) => res.json())
      .then((data) =>
        Promise.all(
          data.results.map((p) => fetch(p.url).then((r) => r.json())),
        ),
      )
      .then((full) => setPokemon(full));
  }, [page]);

  const filtered = pokemon.filter(
    (p) =>
      p.name.includes(search.toLowerCase()) &&
      (type === "" || p.types.some((t) => t.type.name === type)),
  );

  return (
    <div className="p-4">
      <SearchBar
        search={search}
        setSearch={setSearch}
        type={type}
        setType={setType}
      />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {filtered.map((p) => (
          <PokemonCard
            key={p.name}
            pokemon={p}
            isFav={favorites.includes(p.name)}
            toggleFav={toggleFavorite}
            openDetail={() => setSelected(p)}
          />
        ))}
      </div>

      <Pagination page={page} setPage={setPage} />

      <PokemonDetail pokemon={selected} close={() => setSelected(null)} />
    </div>
  );
}

export default Home;
