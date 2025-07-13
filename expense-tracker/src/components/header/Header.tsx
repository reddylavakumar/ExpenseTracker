import useExpenseStore from "@/store/useAppStore"
import { MoonIcon, SunIcon } from "lucide-react"
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

const Header = () => {
    const { themeToggler, isDarkMode } = useExpenseStore();

    return (
        <div>
            <div className='w-100vw bg-white-200 border-b-2 p-3 text-xl flex justify-between position-fixed'>
                <header className='font-semibold'>Expense Tracker</header>


                <Tooltip>
                    <TooltipTrigger asChild>
                        {isDarkMode ? <SunIcon onClick={() => themeToggler()} className="hover:cursor-pointer" /> :
                            <MoonIcon onClick={() => themeToggler()} className="hover:cursor-pointer" />}
                    </TooltipTrigger>
                    <TooltipContent>
                        {isDarkMode ? <p>Light Theme</p> : <p><p>Dark Theme</p></p>}
                    </TooltipContent>
                </Tooltip>
            </div>
        </div>
    )
}

export default Header
