import React, { useState, useEffect } from "react";
// B E F O R E : import Pokemon from "../interfaces/Pokemon.interface";
import axios from "axios";

/** HINT from stereobooster (https://dev.to/stereobooster):
 * 
 * Also I would not use separate file for interface, just place it in the top of 
 * the component (it will make your life a bit easier) */
interface Pokemon {
  name: string;
  base_experience: number;
  numberOfAbilities: number;
  imageURL: string;
}

/** HINTS from stereobooster (https://dev.to/stereobooster),
 *             ecyrbe (https://dev.to/ecyrbe)
 * 
 * "... You don't need to provide types everywhere ..."
 * "... You should not add typings to things you get back from a function, (like useState)..."
 */

const PokemonSearch: React.FC = () => {
  // B E F O R E : 
  //const [pokemon, setPokemon]: [Pokemon, (pokemon: Pokemon) => void] = useState<
  //   Pokemon | null>(null);

  // A F T E R :
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);

  // B E F O R E :
  // const [loading, setLoading]: [boolean, (loading: boolean) => void] = useState<
  //  boolean>(false);

  // A F T E R :
  const [loading, setLoading] = useState<boolean>(false);

  // B E F O R E :
  // const [error, setError]: [string, (error: string) => void] = useState("");

  // A F T E R :
  const [error, setError] = useState("");

  // B E F O R E :
  // const [inputName, setInputName]: [string, (inputName: string) => void] = React
  //   .useState("bulbasaur");

  // A F T E R :
  const [inputName, setInputName] = React.useState("bulbasaur");

  const pokemonRef: React.RefObject<HTMLInputElement> = React.createRef();

  const onSearchHandler = (): void => {
    setInputName(pokemonRef.current.value.toLowerCase());
  };

  useEffect(() => {
    setLoading(true);
    setError("");
    axios.get(`https://pokeapi.co/api/v2/pokemon/${inputName}`, {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        setLoading(false);

        setPokemon(
          {
            name: response.data.name,
            base_experience: response.data.base_experience,
            imageURL: response.data.sprites.front_default,
            numberOfAbilities: response.data.abilities.length,
          },
        );
      })
      .catch((error) => {
        setLoading(false);
        setError(error.message);
      });
  }, [inputName]);

  return (
    <div>
      {loading && <div>Loading ...</div>}
      {error && <div>{error}</div>}
      {pokemon &&
        <div>
          <img src={pokemon.imageURL} alt="pokemon-pic" />
          <h3>{pokemon.name}</h3>
          <p>Base EXP: {pokemon.base_experience}</p>
          <p>Abilities: {pokemon.numberOfAbilities}</p>
        </div>}

      <div>Please, type the pokemon name below</div>
      <input type="text" ref={pokemonRef} />

      <button
        className="btn btn-primary"
        onClick={() => onSearchHandler()}
      >
        Search
      </button>
    </div>
  );
};

export default PokemonSearch;
