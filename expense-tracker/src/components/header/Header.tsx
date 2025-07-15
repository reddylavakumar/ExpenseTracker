// import useExpenseStore from "@/store/useAppStore"
import { MoonIcon, Settings, SunIcon } from "lucide-react"
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { Button } from "../ui/button";
import { SettingsDialogBox } from "./settingsdialog/SettingsDialogBox";
import { useState } from "react";

const Header = () => {
    // const { themeToggler, isDarkMode } = useExpenseStore();
    const [open, setOpen] = useState(false)


    return (
        <div>
            <div className='w-100vw bg-white-200 border-b-2 p-3 text-xl flex justify-between position-fixed'>
                <header className='font-semibold'>Expense Tracker</header>
                <div className="flex gap-5" >
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button variant={"outline"} className="hover:cursor-pointer" onClick={() => setOpen(true)}>
                                <Settings />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Settings</p>
                        </TooltipContent>
                    </Tooltip>
                    {/* <Tooltip>
                        <TooltipTrigger asChild>
                            <Button variant={"outline"} className="hover:cursor-pointer" onClick={() => themeToggler()} >

                                {isDarkMode ? <SunIcon className="hover:cursor-pointer" /> :
                                    <MoonIcon className="hover:cursor-pointer" />}
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                            {isDarkMode ? <p>Light Theme</p> : <p><p>Dark Theme</p></p>}
                        </TooltipContent>
                    </Tooltip> */}
                </div>
            </div>
            <SettingsDialogBox open={open} onOpenChange={setOpen} />
        </div>
    )
}

export default Header
