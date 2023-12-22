// components/PokemonList.js
import React, { useState, useEffect } from "react";
import PokemonCard from "./PokemonCard";

const PokemonList = () => {
  const [pokemons, setPokemons] = useState([]);
  const [filteredPokemons, setFilteredPokemons] = useState([]);
  const [minHP, setMinHP] = useState(0);
  const [minAttack, setMinAttack] = useState(0);
  const [type, setType] = useState("");


  fetch("https://pokeapi.co/api/v2/pokemon?limit=5")
  .then(response => {
    if (!response.ok) {
      throw new Error(`Erreur HTTP ! statut : ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    setPokemons(data.results);
    setFilteredPokemons(data.results);
  })
  .catch(error => {
    console.error("Erreur lors de la récupération des données:", error);
  });


  useEffect(() => {
    const fetchPokemonDetails = async (pokemon) => {
      const response = await fetch(pokemon.url);
      return await response.json();
    };
  // TODO: marche pas le filtre
    const filterPokemons = async () => {
      const detailedPokemons = await Promise.all(pokemons.map(fetchPokemonDetails));
    
      const filtered = detailedPokemons.filter(pokemon => {
        const hp = pokemon.stats.find(stat => stat.stat.name === 'hp').base_stat;
        const attack = pokemon.stats.find(stat => stat.stat.name === 'attack').base_stat;
    
        const matchesHP = hp >= minHP;
        const matchesAttack = attack >= minAttack;
        const matchesType = type ? pokemon.types.some(t => t.type.name === type) : true;
    
        return matchesHP && matchesAttack && matchesType;
      });
    
      setFilteredPokemons(filtered);
    };
    filterPokemons();
  }, [minHP, minAttack, type]);
  

  return (
    <div>
      <input type="number" placeholder="Min HP" onChange={e => setMinHP(e.target.value)} />
      <input type="number" placeholder="Min Attack" onChange={e => setMinAttack(e.target.value)} />
      <select onChange={e => setType(e.target.value)}>
        <option value="">Tous les types</option>
        <option value="fire">Feu</option>
        <option value="water">Eau</option>
        {/* Autres options de types ici */}
      </select>


      {filteredPokemons.map(pokemon => (
        <PokemonCard key={pokemon.name} pokemon={pokemon} />
      ))}

    </div>
  );
};

export default PokemonList;
