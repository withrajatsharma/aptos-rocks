import { useGameScore, useGameStepStore, useMoveStore } from "@/store";
import { match } from "ts-pattern";
import { Paper, Rock, Scissors } from "../icons";
import { useGetComputerMove, useRandomlySetComputerMove } from "@/hooks";
import React from "react";
import { Button } from "../ui/button";
import clsx from "clsx";
import { Loader } from "../loader";
import { useMutationState } from "@tanstack/react-query";

export const Step2 = () => {
  const [move, resetMove, setComputerMove] = useMoveStore((state) => [
    state.move,
    state.resetMove,
    state.setComputerMove,
  ]);
  const [incPlayer, incComputer] = useGameScore((state) => [
    state.incPlayerScore,
    state.incComputerScore,
  ]);
  const [resetStep] = useGameStepStore((state) => [state.resetStep]);

  const computer = useRandomlySetComputerMove();
  const final_data = useMutationState({
    filters: {
      mutationKey: ["finalize_game_results"],
    },
    select: (mutation) => mutation.state.data,
  });
  const final = final_data[final_data.length - 1];
  const computerMove = useGetComputerMove({
    deps1: computer?.data?.hash,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    deps2: (final as any)?.hash,
  });

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      computer.mutate();
    }, 3000);
    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  React.useEffect(() => {
    if (computerMove.data && final !== undefined) {
      setComputerMove(computerMove.data as number);
    }
  }, [computerMove.data, setComputerMove, final]);
  React.useEffect(() => {
    match(move)
      .with([1, 1], () => {
        incPlayer();
        incComputer();
      })
      .with([2, 2], () => {
        incPlayer();
        incComputer();
      })
      .with([3, 3], () => {
        incPlayer();
        incComputer();
      })
      .with([1, 2], () => {
        incComputer();
      })
      .with([1, 3], () => {
        incPlayer();
      })
      .with([2, 1], () => {
        incPlayer();
      })
      .with([2, 3], () => {
        incComputer();
      })
      .with([3, 1], () => {
        incComputer();
      })
      .with([3, 2], () => {
        incPlayer();
      })
      .otherwise(() => {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [computerMove.data, computerMove.isSuccess, move]);
  return (
    <div key={crypto.randomUUID()}>
      <div
        key={crypto.randomUUID()}
        className="flex items-center gap-5 flex-col md:flex-row"
      >
        <div className="w-[15rem] h-[15rem] flex items-center justify-center flex-col gap-2">
          <p className="text-xl uppercase tracking-wide">You picked</p>
          {match(move[0])
            .with(1, () => {
              return (
                <div className="cursor-pointer rounded-full bg-gradient-to-b from-from-rock to-to-rock w-[10rem] h-[10rem] flex items-center justify-center drop-shadow-md">
                  <div className="bg-white rounded-full p-9">
                    <Rock />
                  </div>
                </div>
              );
            })
            .with(2, () => {
              return (
                <div className="cursor-pointer rounded-full bg-gradient-to-b from-from-paper to-to-paper w-[10rem] h-[10rem] flex items-center justify-center drop-shadow-md">
                  <div className="bg-white rounded-full p-9">
                    <Paper />
                  </div>
                </div>
              );
            })
            .with(3, () => {
              return (
                <div className="cursor-pointer rounded-full bg-gradient-to-b from-from-scissors to-to-scissors w-[10rem] h-[10rem] flex items-center justify-center drop-shadow-md">
                  <div className="bg-white rounded-full p-9">
                    <Scissors />
                  </div>
                </div>
              );
            })
            .otherwise(() => null)}
        </div>
        <div
          key={crypto.randomUUID()}
          className="w-[15rem] h-[15rem]  flex items-center justify-center"
        >
          <div className="flex flex-col gap-4 justify-center items-center">
            {match(move)
              .with([1, 1], () => (
                <p className="text-xl uppercase">It's A Tie</p>
              ))
              .with([2, 2], () => (
                <p className="text-xl uppercase">It's A Tie</p>
              ))
              .with([3, 3], () => (
                <p className="text-xl uppercase">It's A Tie</p>
              ))
              .with([1, 2], () => (
                <p className="text-xl uppercase">Computer Win 😢</p>
              ))
              .with([1, 3], () => (
                <p className="text-xl uppercase">You Win 🥳</p>
              ))
              .with([2, 1], () => (
                <p className="text-xl uppercase">You Win 🥳</p>
              ))
              .with([2, 3], () => (
                <p className="text-xl uppercase">Computer Win 😢</p>
              ))
              .with([3, 1], () => (
                <p className="text-xl uppercase">Computer Win 😢</p>
              ))
              .with([3, 2], () => (
                <p className="text-xl uppercase">You Win 🥳</p>
              ))
              .otherwise(() => null)}
            <Button
              onClick={() => {
                resetStep();
                resetMove();
              }}
              className={clsx(
                "text-black font-bold h-10 w-40 bg-white text-xl hover:text-white",
              )}
            >
              Play Again
            </Button>
          </div>
        </div>
        <div
          key={crypto.randomUUID()}
          className="w-[15rem] h-[15rem]  flex items-center justify-center flex-col gap-2"
        >
          <p className="text-xl uppercase tracking-wide text-center">
            Computer picked
          </p>
          {computer.isPending ||
          computerMove.isLoading ||
          final === undefined ? (
            <Loader />
          ) : (
            <>
              {match(computerMove.data)
                .with(1, () => {
                  return (
                    <div className="cursor-pointer rounded-full bg-gradient-to-b from-from-rock to-to-rock w-[10rem] h-[10rem] flex items-center justify-center drop-shadow-md">
                      <div className="bg-white rounded-full p-9">
                        <Rock />
                      </div>
                    </div>
                  );
                })
                .with(2, () => {
                  return (
                    <div className="cursor-pointer rounded-full bg-gradient-to-b from-from-paper to-to-paper w-[10rem] h-[10rem] flex items-center justify-center drop-shadow-md">
                      <div className="bg-white rounded-full p-9">
                        <Paper />
                      </div>
                    </div>
                  );
                })
                .with(3, () => {
                  return (
                    <div className="cursor-pointer rounded-full bg-gradient-to-b from-from-scissors to-to-scissors w-[10rem] h-[10rem] flex items-center justify-center drop-shadow-md">
                      <div className="bg-white rounded-full p-9">
                        <Scissors />
                      </div>
                    </div>
                  );
                })
                .otherwise(() => null)}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
