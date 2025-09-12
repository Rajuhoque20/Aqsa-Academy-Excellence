import Image from "next/image"

export const Contact=()=>{
    return(
        <div className="flex flex-col gap-10 px-30 pb-30 h-max" id="contact">
            <h1 className="text-5xl text-black">Contact</h1>
            <div className="flex gap-20">
                <div className="relative w-3/5 shadow-md transition hover:scale-105">
                    <Image
                    className="rounded-md"
                    src={'/contact.jpg'} 
                    alt="contact"
                    fill
                    />
                    asdfg
                </div>
                <div className="w-2/5 flex flex-col gap-3">
                <h2 className="text-gray-600">Write us a message directly</h2>
                    <form className="w-full flex flex-col gap-8">
                        <div className="flex flex-col gap-2">
                            <label htmlFor="name" className="text-gray-600 text-xl">Name</label>
                            <input required type="text" name="name" placeholder="Enter the Name" className="px-5 py-3 border-2 border-gray-300 w-full text-gray-500 rounded-md "/>
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="name" className="text-gray-600 text-xl">Email</label>
                            <input required type="text" name="email" placeholder="Enter the Email" className="px-5 py-3 border-2 border-gray-300 w-full text-gray-500 rounded-md"/>
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="name" className="text-gray-600 text-xl">Message</label>
                            <textarea required name="message" placeholder="Enter the Message" className="px-5 py-3 border-2 border-gray-300 w-full text-gray-500 rounded-md"/>
                        </div>

                        <button type="submit" className="bg-blue-700 py-3 px-15 shadow-xl transition hover:scale-105 cursor-pointer rounded-sm text-white w-max self-center">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    )
}