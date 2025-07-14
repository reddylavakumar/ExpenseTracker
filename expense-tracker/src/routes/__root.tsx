import { createRootRoute, Outlet } from "@tanstack/react-router";
import Header from "@/components/header/Header";
import Sidebar from "@/components/sidebar/Sidebar";
import { Toaster } from "sonner";

export const Route = createRootRoute({
  component: RootComponent,
})
function RootComponent() {
  return (
    <div className="h-screen overflow-hidden
">
      <Header />
      <div className="flex flex-row mt-0 h-screen">
        <div className="bg-white-500 p-1 border-r-2 overflow-auto scrollbar-thin w-1/6 flex justify-center">
          <Sidebar />
        </div>
        <main className="flex-1 bg-gray-100 p-4 h-[94vh] overflow-x-scroll scrollbar-thin">
          <Outlet />
        </main>
        <Toaster position="top-center" richColors />
      </div>
    </div>
  )
}
export default RootComponent
