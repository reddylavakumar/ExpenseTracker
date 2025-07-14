// import { getExpenses } from "@/services/api/expenseApi";
// import { create } from "zustand";
// import { persist } from "zustand/middleware";

// interface ExpenseStore {
//   expenseList: any[];
//   fetchExpenses: () => Promise<void>;
//   isDarkMode: boolean;
//   themeToggler: () => void;
// }

// const useExpenseStore = create<ExpenseStore>()(
//   persist(
//     (set) => ({
//       expenseList: [],
//       isDarkMode: false,
//       fetchExpenses: async () => {
//         const data = await getExpenses();
//         set({ expenseList: data });
//       },
//       themeToggler: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
//     }),
//     {
//       name: "expense-storage",
//       partialize: (state) => ({
//         expenseList: state.expenseList,
//         isDarkMode: state.isDarkMode,
//       }),
//     }
//   )
// );

// export default useExpenseStore;

// File: store/useExpenseStore.ts

import { getExpenses } from "@/services/api/expenseApi";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface SettingsData {
  currency: string;
  budgetLimit?: string;
}

interface ExpenseStore {
  expenseList: any[];
  fetchExpenses: () => Promise<void>;
  isDarkMode: boolean;
  themeToggler: () => void;

  settings: SettingsData;
  updateSettings: (newSettings: SettingsData) => void;
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

      settings: { currency: "INR", budgetLimit: "" },
      updateSettings: (newSettings) => set({ settings: newSettings }),
    }),
    {
      name: "expense-storage",
      partialize: (state) => ({
        expenseList: state.expenseList,
        isDarkMode: state.isDarkMode,
        settings: state.settings,
      }),
    }
  )
);

export default useExpenseStore;
