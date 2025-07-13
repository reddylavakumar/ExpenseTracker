import Expense from '@/components/expense/Expense'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/expense')({
    component: RouteComponent,
})

function RouteComponent() {
    return <div>
        <Expense />
    </div>
}
