import { useGameStepStore, useMoveStore } from "@/store";
import { Paper, Rock, Scissors, Triangle } from "../icons";
import { useSetPlayerMove } from "@/hooks";
import { match } from "ts-pattern";
import toast from "react-hot-toast";
import { useShallow } from "zustand/react/shallow";

export const Step1 = () => {
  const [increment] = useGameStepStore((state) => [state.incrementStep]);
  const [move, setMove] = useMoveStore(
    useShallow((state) => [state.move, state.setPlayerMove]),
  );
  const handleMove = useSetPlayerMove();
  const handleInc = () => {
    if (move[0]) {
      match(move[0])
        .with(1, () => {
          toast.success("You picked Rock");
        })
        .with(2, () => {
          toast.success("You picked Paper");
        })
        .with(3, () => {
          toast.success("You picked Scissors");
        })
        .otherwise(() => null);
      handleMove.mutate(move[0], {
        onSuccess: () => {
          increment();
        },
      });
    }
  };
  return (
    <div key={crypto.randomUUID()}>
      <div className="relative">
        <div
          title="paper"
          className="cursor-pointer absolute -top-10 -left-10 rounded-full bg-gradient-to-b from-from-paper to-to-paper w-[7rem] h-[7rem] flex items-center justify-center drop-shadow-md"
        >
          <div
            className="bg-white rounded-full p-4"
            onClick={() => {
              setMove(2);
              if (move[0] === 2) {
                handleInc();
              }
            }}
          >
            <Paper />
          </div>
        </div>
        <div
          title="scissors"
          className="cursor-pointer absolute -right-10 -top-10 rounded-full bg-gradient-to-b from-from-scissors to-to-scissors w-[7rem] h-[7rem] flex items-center justify-center drop-shadow-md"
        >
          <div
            className="bg-white rounded-full p-4"
            onClick={() => {
              setMove(3);
              if (move[0] === 3) {
                handleInc();
              }
            }}
          >
            <Scissors />
          </div>
        </div>
        <div
          title="rock"
          className="cursor-pointer absolute -bottom-10 right-[34%] rounded-full bg-gradient-to-b from-from-rock to-to-rock w-[7rem] h-[7rem] flex items-center justify-center drop-shadow-md"
        >
          <div
            key={crypto.randomUUID()}
            className="bg-white rounded-full p-4"
            onClick={() => {
              setMove(1);
              if (move[0] === 1) {
                handleInc();
              }
            }}
          >
            <Rock />
          </div>
        </div>
        <Triangle />
      </div>
    </div>
  );
};
