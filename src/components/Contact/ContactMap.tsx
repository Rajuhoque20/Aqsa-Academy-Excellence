
import { FaPhone, FaEnvelope, } from "react-icons/fa";
import { instituteInfo } from "src/constant";
 export default function ContactMap(){
    return(
         <div className="relative md:w-2/3 w-full transition hover:scale-105 "> 
                <div className="absolute left-5 top-[15rem] bg-green-400 rounded-md p-5 flex flex-col gap-2 bg-radial-[at_50%_75%] from-sky-600 shadow via-blue-800 to-indigo-900 to-90%">
                    <h2 className="font-semibold">Contact:</h2>
                    <div className="flex items-center gap-3">
                        <FaPhone size={20}/>
                         <p>{instituteInfo.phone}</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <FaEnvelope size={20}/>
                        <p>{instituteInfo.email}</p>
                    </div>                                                                      
                </div>                   
                <iframe
                width="100%"
                height="500"                  
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3687.217004795011!2d89.4379527!3d26.3269125!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39e2fe81a1713553%3A0xd3a627f117420578!2sCooch%20Bihar%20Rajbari%20Campus%2C%20Cooch%20Behar%2C%20West%20Bengal%20736101%2C%20India!5e0!3m2!1sen!2sin!4v1695555555555!5m2!1sen!2sin"
                    ></iframe>               
        </div>
    )
}