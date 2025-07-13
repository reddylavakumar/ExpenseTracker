import { getExpenses } from "@/services/api/expenseApi";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ExpenseStore {
  expenseList: any[];
  fetchExpenses: () => Promise<void>;
  isDarkMode: boolean;
  themeToggler: () => void;
}

const useExpenseStore = create<ExpenseStore>()(
  persist(
    (set) => ({
      expenseList: [],
      isDarkMode: false,
      fetchExpenses: async () => {
        const data = await getExpenses();
        set({ expenseList: data });
      },
      themeToggler: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
    }),
    {
      name: "expense-storage",
      partialize: (state) => ({
        expenseList: state.expenseList,
        isDarkMode: state.isDarkMode,
      }),
    }
  )
);

export default useExpenseStore;
