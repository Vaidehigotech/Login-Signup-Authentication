import Navbar from "./Navbar"

const Contact = () => {
    return (
        <div className="flex py-4 px-6 gap-14">
            <div className="w-1/4">
                <Navbar />
            </div>
            <div className="w-3/4 py-8">
            <div className=" text-myColor text-4xl">Contact</div>
             </div>
        </div>
    )
}

export default Contact