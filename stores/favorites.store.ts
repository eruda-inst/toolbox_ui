import { create } from "zustand";
import { persist } from "zustand/middleware";

export type FavoriteToolsState = {
  favoriteTools: number[];
};

export type FavoriteToolsActions = {
  toggleFavoriteTool: (toolID: number) => void;
};

export const useFavoriteToolsStore = create<
  FavoriteToolsState & FavoriteToolsActions
>()(
  persist(
    (set) => ({
      favoriteTools: [],
      toggleFavoriteTool: (toolID: number) =>
        set((state) => {
          if (state.favoriteTools.includes(toolID)) {
            return {
              favoriteTools: state.favoriteTools.filter((id) => id !== toolID),
            };
          }

          return { favoriteTools: [...state.favoriteTools, toolID] };
        }),
    }),
    {
      name: "favorite-tools",
      partialize: (state) => ({ favoriteTools: state.favoriteTools }),
      version: 1,
    },
  ),
);
