// import { getOptionsForVote } from '@/utils/getRandomPokemon';
import { getOptionsForVote } from '@/utils/getRandomPokemon';
import { useEffect, useState } from 'react';
import { trpc } from '../utils/trpc';

const btn =
  'inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm font-medium rounded-full text-gray-700 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500';

export default function Home() {
  const [ids, updateIds] = useState(() => getOptionsForVote());
  const [first, second] = ids;

  const firstPokemon = trpc.getPokemonById.useQuery({ id: first });
  const secondPokemon = trpc.getPokemonById.useQuery({ id: second });

  if (firstPokemon.isLoading || secondPokemon.isLoading) {
    return <div>Loading...</div>;
  }

  const voteForRoundest = (selected: number) => {
    // fire mutation to persitchanges
    updateIds(getOptionsForVote());
  };

  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center">
      <div className="text-2xl text-center">Which Pokemon is Rounder?</div>
      <div className="p-2" />
      <div className="text-2xl text-center border rounded p-8 flex justify-between max-w-2xl items-center">
        <div className=" flex flex-col items-center">
          <img className="w-64 h-64" src={firstPokemon.data?.sprite!} />
          <div className="text-xl text-center capitalize mt-[-2rem]">
            {firstPokemon.data?.name}
          </div>
          <button className={btn} onClick={() => voteForRoundest(first)}>
            Rounder
          </button>
        </div>

        <div className=" flex flex-col items-center">
          <img className="w-64 h-64" src={secondPokemon.data?.sprite!} />
          <div className="text-xl text-center capitalize mt-[-2rem]">
            {secondPokemon.data?.name}
          </div>
          <button className={btn} onClick={() => voteForRoundest(first)}>
            Rounder
          </button>
        </div>
      </div>
    </div>
  );
}
