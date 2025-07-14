import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import * as api from "../api/expenseApi";

export const useExpenses = () => {
  return useQuery({
    queryKey: ["expenses"],
    queryFn: api.getExpenses,
  });
};

export const useAddExpense = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: api.addExpense,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["expenses"] });
    },
  });
};

export const useUpdateExpense = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) =>
      api.updateExpense(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["expenses"] });
    },
  });
};

export const useDeleteExpense = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: api.deleteExpense,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["expenses"] });
    },
  });
};
