import { useGameScore } from "@/store";
import { Logo } from "./icons";
import { Button } from "./ui/button";
export const Score = ({ score, text }: { score: number; text: string }) => {
  return (
    <div className="bg-white rounded-xl p-1 w-[5rem] h-[5rem]">
      <div className="flex flex-col text-center items-center">
        <p className="text-score-text">{text}</p>
        <p className="text-black font-extrabold text-4xl">{score}</p>
      </div>
    </div>
  );
};
export const ScoreBoard = () => {
  const [player, computer, reset] = useGameScore((state) => [
    state.player,
    state.computer,
    state.resetScore,
  ]);
  return (
    <div className="flex items-center justify-center mb-10 bg-black">
      <div className="flex justify-center items-center p-3 border-header-outline border-2 w-fit flex-col rounded-xl">
        <div className=" p-4  flex justify-between items-center gap-10">
          <Score text={"Player"} score={player} />
          <Logo />
          <Score text={"Computer"} score={computer} />
        </div>
        <Button
          onClick={reset}
          variant={"destructive"}
          className="w-[5rem] text-black font-semibold tracking-wider"
        >
          Reset
        </Button>
      </div>
    </div>
  );
};
