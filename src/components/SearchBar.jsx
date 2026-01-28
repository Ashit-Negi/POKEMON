import React from "react";

function SearchBar({ search, setSearch, type, setType }) {
  return (
    <div className="flex gap-4 mb-4">
      <input
        className="border p-2"
        placeholder="Search Pokémon"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <select value={type} onChange={(e) => setType(e.target.value)}>
        <option value="">All Types</option>
        <option value="fire">Fire</option>
        <option value="water">Water</option>
        <option value="grass">Grass</option>
        <option value="electric">Electric</option>
      </select>
    </div>
  );
}

export default SearchBar;
