type cardItem = {
    id: number,
    text: string,
    amount: string,
    image_src: string
}

const InfoCard = ({ item }: { item: cardItem }) => {
    return (
        <div className=" bg-white border-1 p-4 pt-6 pb-6 rounded-lg shadow-sm flex w-1/3">
            <div className="flex justify-center items-center w-20">
                {/* <img className="h-10 p-1 rounded-sm bg-blue-500" src={item?.image_src} alt="logo" /> */}
                <div className="h-12 w-12 bg-blue-500 rounded-full flex items-center justify-center shadow-md shadow-gray-400">
                    <img
                        src={item?.image_src}
                        alt="Wallet Icon"
                        className="h-6 w-6 object-contain"
                    />
                </div>
            </div>
            <div className="flex flex-col">
                <span className="text-sm text-gray-500">{item?.text}</span>
                <span className="text-lg font-semibold">₹ {item?.amount}</span>
            </div>
        </div>
    )
}

export default InfoCard
