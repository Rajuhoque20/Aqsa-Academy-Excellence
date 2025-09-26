

export default function ContactForm(){
    return(
         <form className="w-full flex flex-col gap-8">
            <div className="flex flex-col gap-2">
                <label htmlFor="name" className="text-gray-600 text-xl">Name</label>
                <input required type="text" name="name" placeholder="Enter the Name" className="px-5 py-3 border-1 border-gray-300 w-full text-gray-500 rounded-md "/>
            </div>
            <div className="flex flex-col gap-2">
                <label htmlFor="name" className="text-gray-600 text-xl">Email</label>
                <input required type="text" name="email" placeholder="Enter the Email" className="px-5 py-3 border-1 border-gray-300 w-full text-gray-500 rounded-md"/>
            </div>
            <div className="flex flex-col gap-2">
                <label htmlFor="name" className="text-gray-600 text-xl">Message</label>
                <textarea required name="message" placeholder="Enter the Message" className="px-5 py-3 border-1 border-gray-300 w-full text-gray-500 rounded-md"/>
            </div>

            <button type="submit" className="bg-blue-700 py-3 px-15 shadow-xl transition hover:scale-105 cursor-pointer rounded-sm text-white w-max self-center">Submit</button>
        </form>
    )
}