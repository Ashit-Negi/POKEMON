import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="bg-gray-600  text-white">
      <div className=" mx-auto px-2 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">POKEMON</h1>

        <nav className="mr-20 space-x-6">
          <Link to="/" className="hover:underline">
            Home
          </Link>
          <Link to="/favorites" className="hover:underline">
            Favorites
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;
