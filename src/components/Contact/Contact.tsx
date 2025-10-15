

import { Title } from "../Title"
import ContactForm from "./ContactForm";
import ContactMap from "./ContactMap";
export const Contact=()=>{
    return(
        <div className="flex flex-col gap-10 px-5 md:px-30 mb-30 mt-5 h-max" id="contact">
            <Title>CONTACT</Title>
            <div className="flex md:gap-20 gap-10 flex-col md:flex-row">
            <ContactMap/>
                <div className="md:w-1/3 w-full flex flex-col gap-3">
                <h2 className="text-gray-600">Write us a message directly</h2>
                <ContactForm/>
                </div>
            </div>
        </div>
    )
}