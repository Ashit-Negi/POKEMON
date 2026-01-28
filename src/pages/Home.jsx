import React, { useState, useEffect } from "react";
import PokemonCard from "../components/Card";
import Pagination from "../components/Pagination";
import SearchBar from "../components/SearchBar";
import PokemonDetail from "../components/Details";
import useFavorites from "../hooks/Favorites";

const PAGE_SIZE = 20;

function Home() {
  // 🔹 All Pokémon list (name + url only)
  const [allPokemon, setAllPokemon] = useState([]);

  // 🔹 Current page Pokémon full data
  const [pokemon, setPokemon] = useState([]);

  const [page, setPage] = useState(0);
  const [search, setSearch] = useState("");
  const [type, setType] = useState("");
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(false);

  const { favorites, toggleFavorite } = useFavorites();

  // ✅ STEP 1: Fetch ALL Pokémon names once (GLOBAL SEARCH)
  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon?limit=1000")
      .then((res) => res.json())
      .then((data) => setAllPokemon(data.results))
      .catch(() => setAllPokemon([]));
  }, []);

  // ✅ STEP 2: Fetch DETAILS for current page only
  useEffect(() => {
    if (allPokemon.length === 0) return;

    const filteredList = allPokemon.filter((p) =>
      p.name.includes(search.toLowerCase()),
    );

    const paginatedList = filteredList.slice(
      page * PAGE_SIZE,
      (page + 1) * PAGE_SIZE,
    );

    if (paginatedList.length === 0) {
      setPokemon([]);
      return;
    }

    setLoading(true);

    Promise.all(
      paginatedList.map((p) => fetch(p.url).then((res) => res.json())),
    )
      .then((data) => {
        // page-level type filter
        const typeFiltered =
          type === ""
            ? data
            : data.filter((poke) =>
                poke.types.some((t) => t.type.name === type),
              );

        setPokemon(typeFiltered);
      })
      .catch(() => setPokemon([]))
      .finally(() => setLoading(false));
  }, [allPokemon, search, page, type]);

  // 🔢 Total pages for pagination
  const totalFiltered = allPokemon.filter((p) =>
    p.name.includes(search.toLowerCase()),
  ).length;

  return (
    <div className="p-4">
      {/* 🔍 Search + Filter */}
      <SearchBar
        search={search}
        setSearch={(val) => {
          setSearch(val);
          setPage(0);
        }}
        type={type}
        setType={(val) => {
          setType(val);
          setPage(0);
        }}
      />

      {/* 🔄 Loading */}
      {loading && (
        <p className="text-center text-gray-500 mt-6">Loading Pokémon...</p>
      )}

      {/* ❌ Empty state */}
      {!loading && pokemon.length === 0 && (
        <p className="text-center text-gray-500 mt-6">No Pokémon found</p>
      )}

      {/* 🧩 Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {pokemon.map((p) => (
          <PokemonCard
            key={p.name}
            pokemon={p}
            isFav={favorites.includes(p.name)}
            toggleFav={toggleFavorite}
            openDetail={() => setSelected(p)}
          />
        ))}
      </div>

      {/* 📄 Pagination */}
      {totalFiltered > PAGE_SIZE && (
        <Pagination page={page} setPage={setPage} />
      )}

      {/* 🔍 Detail Modal */}
      <PokemonDetail pokemon={selected} close={() => setSelected(null)} />
    </div>
  );
}

export default Home;
