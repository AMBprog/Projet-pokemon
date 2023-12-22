// components/PokemonCard.js
import React, { useState, useEffect } from "react";

const PokemonCard = ({ pokemon }) => {
  const [pokemonDetails, setPokemonDetails] = useState(null);

  useEffect(() => {
    fetch(pokemon.url)
      .then(response => response.json())
      .then(data => setPokemonDetails(data))
      .catch(error => console.error("Erreur lors de la récupération des détails du Pokémon:", error));
  }, [pokemon]);

  if (!pokemonDetails) {
    return <div>Chargement...</div>;
  }

  return (
    <div className="PokemonCard button">
      <img src={pokemonDetails.sprites.front_default} alt={pokemonDetails.name} />
      <h3>{pokemonDetails.name}</h3>
      <p>PV: {pokemonDetails.stats.find(stat => stat.stat.name === 'hp').base_stat}</p>
      <p>Attaque: {pokemonDetails.stats.find(stat => stat.stat.name === 'attack').base_stat}</p>
      {/* Autres détails ici */}
    </div>
  );
};

export default PokemonCard;
