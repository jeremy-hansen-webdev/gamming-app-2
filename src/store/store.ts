import { create } from 'zustand';

interface GameQuery {
  genreId: number;
  searchValue: string;
}

interface GameQueryStore {
  gameQuery: GameQuery;
  setGenreId: (id: number) => void;
  setSearch: (value: string) => void;
  reset: () => void;
}

const initialQuery: GameQuery = {
  genreId: 0,
  searchValue: '',
};

export const useGameQueryStore = create<GameQueryStore>((set) => ({
  gameQuery: initialQuery,

  setGenreId: (id) =>
    set((state) => ({
      gameQuery: { ...state.gameQuery, genreId: id },
    })),

  setSearch: (value) =>
    set((state) => ({
      gameQuery: { ...state.gameQuery, searchValue: value },
    })),

  reset: () => set({ gameQuery: initialQuery }),
}));
