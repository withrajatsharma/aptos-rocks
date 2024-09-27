import { match } from "ts-pattern";
import { ScoreBoard } from "./components/scoreboard";
import { useGameStart, useGameStepStore } from "./store";
import { Step1 } from "./components/steps/step1";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./components/ui/button";
import { NavBar } from "./components/navbar";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { Step2 } from "./components/steps/step2";
import { useStartGame } from "./hooks";
import React from "react";

const App = () => {
  const [step] = useGameStepStore((state) => [state.step]);
  const { connected, account, isLoading } = useWallet();
  const [game, setGame] = useGameStart((state) => [
    state.count,
    state.incrementCount,
  ]);

  const start = useStartGame();
  React.useEffect(() => {
    if (account?.address && game < 1) {
      start.mutate();
      setGame();
    }
  }, [account?.address, game, start, setGame]);

  return (
    <main className="flex flex-col font-semibold bg-gradient-to-r from-from-bg to-to-bg w-screen min-h-screen text-white">
      <NavBar />
      <div>{account?.address && <ScoreBoard />}</div>
      {!connected || !account?.address ? (
        <div className="flex justify-center items-center h-full flex-1 flex-grow">
          {!isLoading ? "Please connect wallet to play game" : "Loading..."}
        </div>
      ) : (
        <div className="flex justify-center items-center h-full flex-1 flex-grow">
          {match(step)
            .with(1, () => <Step1 />)
            .with(2, () => <Step2 />)
            .otherwise(() => null)}
        </div>
      )}
      <footer className="p-3 justify-end flex">
        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant={"outline"}
              className="bg-inherit font-semibold text-white text-2xl p-2 tracking-widest"
            >
              Rules
            </Button>
          </DialogTrigger>
          <DialogContent className="flex flex-col justify-center items-center gap-5">
            <DialogHeader>
              <DialogTitle className="font-semibold text-black text-2xl p-2 tracking-widest">
                RULES
              </DialogTitle>
            </DialogHeader>
            <img src="/image-rules.svg" alt="rules" width={400} height={400} />
          </DialogContent>
        </Dialog>
      </footer>
    </main>
  );
};

export default App;
