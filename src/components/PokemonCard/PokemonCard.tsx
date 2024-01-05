import React, { useState } from 'react';
import { IPokemon } from '../../types/pockemon';

type Props = {
  pokemon: IPokemon;
  num: number;
};

export const PokemonCard: React.FC<Props> = ({ pokemon, num }) => {
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div className='w-full  bg-white rounded-md overflow-hidden shadow-lg m-4'>
      <div className='flex items-center  justify-between p-4 border-b'>
        <p className='text-lg font-semibold uppercase'>{num + 1}</p>

        <h3 className='text-lg uppercase font-semibold'>{pokemon.name}</h3>
        {!imageError ? (
          <img
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/${pokemon.id}.gif`}
            alt='pokemon'
            className='h-[64px]'
            onError={handleImageError}
          />
        ) : (
          <img
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`}
            alt='default'
            className='h-[64px]'
          />
        )}
      </div>
    </div>
  );
};
