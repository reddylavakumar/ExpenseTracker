import Income from '@/components/income/Income'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/income')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>
    <Income />
  </div>
}
