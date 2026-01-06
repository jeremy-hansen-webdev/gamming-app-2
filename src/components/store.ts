import { create } from 'zustand';

interface GameQuery {
  genreId?: number;
}

interface GameQueryStore {
  gameQuery: GameQuery;
  genreId: (id: number) => void;
}

export const useGameQuery = create<GameQueryStore>((set) => ({
  gameQuery: {},
  genreId: (id: number) =>
    set((store) => ({
      gameQuery: { ...store.gameQuery, genreId: id },
    })),
}));
