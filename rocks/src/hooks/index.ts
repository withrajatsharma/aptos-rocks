import { AptosSetup, functionName, getBalance, sender } from "@/service";
import { AccountInfo, useWallet } from "@aptos-labs/wallet-adapter-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useGetBalance = (account: AccountInfo) => {
  return useQuery({
    queryKey: ["balance"],
    queryFn: () => getBalance(account),
    enabled: !!account?.address,
  });
};

export const useStartGame = () => {
  const { signAndSubmitTransaction } = useWallet();
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["start_game"],
    mutationFn: async () => {
      const startGame = await signAndSubmitTransaction({
        sender: sender,
        data: {
          function: functionName("start_game"),
          functionArguments: [],
        },
      });
      return startGame;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["balance"],
      });
    },
  });
};

export const useSetPlayerMove = () => {
  const { signAndSubmitTransaction } = useWallet();
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["set_player_move"],
    mutationFn: async (move: number) => {
      const playerMove = await signAndSubmitTransaction({
        sender: sender,
        data: {
          function: functionName("set_player_move"),
          functionArguments: [move],
        },
      });
      return playerMove;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["balance"],
      });
    },
  });
};

export const useRandomlySetComputerMove = () => {
  const { signAndSubmitTransaction } = useWallet();
  const queryClient = useQueryClient();
  const final = useFinalizeGameResults();

  return useMutation({
    mutationKey: ["randomly_set_computer_move"],
    mutationFn: async () => {
      const computerMove = await signAndSubmitTransaction({
        sender: sender,
        data: {
          function: functionName("randomly_set_computer_move"),
          functionArguments: [],
        },
      });
      return computerMove;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["balance"],
      });
      setTimeout(() => {
        final.mutate();
      }, 3000);
    },
  });
};

export const useFinalizeGameResults = () => {
  const { signAndSubmitTransaction } = useWallet();
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["finalize_game_results"],
    mutationFn: async () => {
      const finalizeGame = await signAndSubmitTransaction({
        sender: sender,
        data: {
          function: functionName("finalize_game_results"),
          functionArguments: [],
        },
      });
      return finalizeGame;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["balance"],
      });
      // queryClient.invalidateQueries({
      //   queryKey: ["get_game_results"],
      // });
      queryClient.invalidateQueries({
        queryKey: ["get_computer_move"],
      });
    },
  });
};

export const useGetComputerMove = ({
  deps1,
  deps2,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  deps1: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  deps2: any;
}) => {
  const { account } = useWallet();
  return useQuery({
    queryKey: ["get_computer_move"],
    queryFn: async () => {
      const aptos = AptosSetup();
      const computerMove = await aptos.view({
        payload: {
          function: functionName("get_computer_move"),
          functionArguments: [account!.address],
        },
      });
      return computerMove[0];
    },
    enabled: !!deps1 && !!deps2,
  });
};

export const useGetGameResult = ({
  deps1,
  deps2,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  deps1: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  deps2: any;
}) => {
  const { account } = useWallet();
  return useQuery({
    queryKey: ["get_game_results"],
    queryFn: async () => {
      const aptos = AptosSetup();
      const result = await aptos.view({
        payload: {
          function: functionName("get_game_results"),
          functionArguments: [account!.address],
        },
      });
      return result[0];
    },
    enabled: !!deps1 && !!deps2,
  });
};
