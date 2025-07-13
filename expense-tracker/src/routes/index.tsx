import Dashboard from '@/components/dashboard/Dashboard'
import useExpenseStore from '@/store/useAppStore';
import { createFileRoute } from '@tanstack/react-router'
import { useEffect } from 'react';

export const Route = createFileRoute('/')({
  component: RouteComponent,
})

function RouteComponent() {

  const { fetchExpenses } = useExpenseStore();
  useEffect(() => {
    fetchExpenses();
  }, []);

  return <div>
    <Dashboard />
  </div>
}
