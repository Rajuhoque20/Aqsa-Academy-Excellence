
"use client";
import { Title } from "../Title"
import { FaPhone, FaEnvelope, } from "react-icons/fa";
export const Contact=()=>{
    return(
        <div className="flex flex-col gap-10 px-30 mb-30 mt-5 h-max" id="contact">
            <Title>CONTACT</Title>
            <div className="flex gap-20">
                <div className="relative w-2/3 transition hover:scale-105 "> 
                <div className="absolute left-5 top-[15rem] bg-green-400 rounded-md p-5 flex flex-col gap-2 bg-radial-[at_50%_75%] from-sky-600 shadow via-blue-800 to-indigo-900 to-90%">
                    <h2 className="font-semibold">Contact:</h2>
                    <div className="flex items-center gap-3">
                        <FaPhone size={20}/>
                         <p>7047082113</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <FaEnvelope size={20}/>
                        <p>aqsa.academy@gmail.com</p>
                    </div>
                    
                   
                   
                    
                </div>                   
                   <iframe
                    width="100%"
                    height="500"                  
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3687.217004795011!2d89.4379527!3d26.3269125!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39e2fe81a1713553%3A0xd3a627f117420578!2sCooch%20Bihar%20Rajbari%20Campus%2C%20Cooch%20Behar%2C%20West%20Bengal%20736101%2C%20India!5e0!3m2!1sen!2sin!4v1695555555555!5m2!1sen!2sin"
                     ></iframe>               
                </div>
                <div className="w-1/3 flex flex-col gap-3">
                <h2 className="text-gray-600">Write us a message directly</h2>
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
                </div>
            </div>
        </div>
    )
}