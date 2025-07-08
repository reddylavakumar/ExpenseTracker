import { Button } from '../ui/button'

const Header = () => {
    return (
        <div>
            <div className=' w-100vw bg-gray-300 p-3 text-xl flex justify-between position-fixed'>
                <header>Expense Tracker</header>
                <Button className='hover:cursor-pointer' variant="default">Add Expense</Button>
            </div>
        </div>
    )
}

export default Header
