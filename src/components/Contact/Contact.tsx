

import { Title } from "../Title"
import ContactForm from "./ContactForm";
import ContactMap from "./ContactMap";
export const Contact=()=>{
    return(
        <div className="flex flex-col gap-10 px-30 mb-30 mt-5 h-max" id="contact">
            <Title>CONTACT</Title>
            <div className="flex gap-20">
            <ContactMap/>
                <div className="w-1/3 flex flex-col gap-3">
                <h2 className="text-gray-600">Write us a message directly</h2>
                <ContactForm/>
                </div>
            </div>
        </div>
    )
}