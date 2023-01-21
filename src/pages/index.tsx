// import { getOptionsForVote } from '@/utils/getRandomPokemon';
import { getOptionsForVote } from '@/utils/getRandomPokemon';
import { useEffect, useState } from 'react';
import { trpc } from '../utils/trpc';

export default function Home() {
  const [ids, updateIds] = useState(() => getOptionsForVote());
  const [first, second] = ids;

  const firstPokemon = trpc.getPokemonById.useQuery({ id: first });
  const secondPokemon = trpc.getPokemonById.useQuery({ id: second });

  if (firstPokemon.isLoading || secondPokemon.isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center">
      <div className="text-2xl text-center">Which Pokemon is Rounder?</div>
      <div className="p-2" />
      <div className="text-2xl text-center border rounded p-8 flex justify-between max-w-2xl items-center">
        <div className="w-64 h-64 flex flex-col">
          <img className="w-full" src={firstPokemon.data?.sprite!} />
          <div className="text-xl text-center capitalize mt-[-2rem]">
            {firstPokemon.data?.name}
          </div>
        </div>
        <div className="p-8">Vs.</div>
        <div className="w-64 h-64 flex flex-col">
          <img className="w-full" src={secondPokemon.data?.sprite!} />
          <div className="text-xl text-center capitalize mt-[-2rem]">
            {secondPokemon.data?.name}
          </div>
        </div>
      </div>
    </div>
  );
}
