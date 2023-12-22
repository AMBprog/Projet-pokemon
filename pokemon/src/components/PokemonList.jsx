// components/PokemonList.js
import React, { useState, useEffect } from "react";
import PokemonCard from "./PokemonCard";

const PokemonList = () => {
  const [pokemons, setPokemons] = useState([]);
  const [currentPageUrl, setCurrentPageUrl] = useState("https://pokeapi.co/api/v2/pokemon?limit=4");
  const [nextPageUrl, setNextPageUrl] = useState(null);
  const [prevPageUrl, setPrevPageUrl] = useState(null);

  useEffect(() => {
    fetch(currentPageUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Erreur HTTP ! statut : ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        setPokemons(data.results);
        setNextPageUrl(data.next);
        setPrevPageUrl(data.previous);
      })
      .catch(error => {
        console.error("Erreur lors de la récupération des données:", error);
      });
  }, [currentPageUrl]);

  function goToNextPage() {
    setCurrentPageUrl(nextPageUrl);
  }

  function goToPrevPage() {
    setCurrentPageUrl(prevPageUrl);
  }

  return (
    <div>
      <div className="grid">
        {pokemons.map(pokemon => (
          <PokemonCard key={pokemon.name} pokemon={pokemon} />
        ))}
      </div>
      {prevPageUrl && <button className="btn" onClick={goToPrevPage}>Précédent</button>}
      {nextPageUrl && <button className="btn" onClick={goToNextPage}>Suivant</button>}
    </div>
  );
};

export default PokemonList;

