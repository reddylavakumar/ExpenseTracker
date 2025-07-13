
import DonutChart from '../donutchart/DonutChart';
const Financialoverview = () => {

    return (
        <div className=" bg-white border-1 p-4 rounded-lg shadow-sm h-full">
            <div className="text-xl font-bold">Financial Overview</div>
            <div className='flex justify-center items-center h-full'>
                <DonutChart />
            </div>
        </div >
    )
}


export default Financialoverview
