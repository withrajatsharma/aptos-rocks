import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { persist } from "zustand/middleware";

type GameStep = {
  step: 1 | 2 | 3 | 4;
  incrementStep: () => void;
  decrementStep: () => void;
  resetStep: () => void;
};

type StartGame = {
  count: number;
  incrementCount: () => void;
};

type Move = {
  move: Array<number | undefined>;
  setPlayerMove: (move: number) => void;
  setComputerMove: (move: number) => void;
  resetMove: () => void;
};

type Scores = {
  player: number;
  computer: number;
  incPlayerScore: () => void;
  incComputerScore: () => void;
  resetScore: () => void;
};

export const useGameStart = create<StartGame>()(
  persist(
    immer((set) => ({
      count: 0,
      incrementCount: () =>
        set((state) => {
          state.count++;
        }),
    })),
    { name: "count" },
  ),
);

export const useGameStepStore = create<GameStep>()(
  persist(
    immer((set) => ({
      step: 1,
      incrementStep: () =>
        set((state) => {
          state.step++;
        }),
      decrementStep: () =>
        set((state) => {
          state.step--;
        }),
      resetStep: () =>
        set((state) => {
          state.step = 1;
        }),
    })),
    { name: "steps" },
  ),
);

export const useMoveStore = create<Move>()(
  immer((set) => ({
    move: [],
    setPlayerMove: (move: number) =>
      set((state) => {
        state.move[0] = move;
      }),
    setComputerMove: (move: number) =>
      set((state) => {
        state.move[1] = move;
      }),
    resetMove: () =>
      set((state) => {
        state.move = [];
      }),
  })),
);

export const useGameScore = create<Scores>()(
  persist(
    immer((set) => ({
      computer: 0,
      player: 0,

      incComputerScore: () =>
        set((state) => {
          state.computer++;
        }),
      incPlayerScore: () =>
        set((state) => {
          state.player++;
        }),
      resetScore: () =>
        set((state) => {
          state.computer = 0;
          state.player = 0;
        }),
    })),
    { name: "scores" },
  ),
);
