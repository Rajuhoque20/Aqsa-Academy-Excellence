import Image from "next/image"
import { Overview } from "../Overview/Overview"

export const AboutUs=()=>{
    return(
        <div className="flex flex-col gap-5 px-30 mb-30">
            <h2 className="text-black text-5xl">About Us</h2>
            <h2 className="text-black text-3xl mt-5">Why Al-Aqsa?</h2>
            <span className="text-gray-700">Academic excellence with a religious atmosphere, this has been the mission of Al Aqsa Mission, the pioneer Muslim educational institution in West Bengal since 2008. Its main campus is situated in Cooch Behar. Al-Aqsa Mission has tried to achieve quality and excellence in the field of education following the principles of fairness, equity, equality and transparency with preferences to the poor and meritorious students. Al-Aqsa defines its objectives as promoting quality education among the poor and backward class minorities of the society and developing the socio-economic condition of the Muslims.
            Every parent wants to send their children to school to get quality education, thorough knowledge, develop honesty, confidence and life long effective learning, with a passion to excel at home, school and in the society, and for Muslims an Islamic environment. This has been the philosophy of Al Aqsa Mission.
            </span>
            <h2 className="text-black text-3xl mt-5">Mission & Vission</h2>
            <span className="text-gray-700">             
                Our mission is to empower poor and backward minority section and thereby develop the socio-economic condition of the society.
                Our Vission is to achieve quality and excellence in the field of education and to support meritorious students who are socio-economically disadvantaged, following the principles of Fairness, Equality, Equity and Transparency.
            </span>

            <h2 className="text-black text-3xl mt-5">General Secretary Desk</h2>
            <div className="flex gap-5">
                <div className="relative w-1/4 transform transition hover:scale-105">
                     <Image
                     src='/student1.jpg'
                     alt='/student1.jpg'
                     fill={true}
                     objectFit="fill"
                     />
                </div>
               
            <span className="text-gray-700 w-3/4">
                1947 was a watershed year for India. It achieved its independence but simultaneously the western as well as its eastern side was partitioned. The Muslims were badly hit, particularly for those who remained in West Bengal. For several decades, the community remained moribund. From the mid eighties of the last century, situation began to change when Al-Aqsa Mission came into existence.
                In the year 1986-87, Al-Aqsa Mission started its journey in a humble way with only seven students. The motto was to give modern education with moral values in a fully residential system where students from all strata of the society, irrespective of their financial condition would live, learn, and grow together.
                The students, coming from the poorest section of the society, were given education free of cost. Donations & Zakat were collected to meet up the expenses and gradually the name of the Mission spread far and wide and numerous people came along and a movement which has been aptly called 'the Mission Movement' started. Now, it has made its presence feel very strongly in the state of West Bengal.
                It is heartening to note that Muslims of Bengal are embracing education to break free from a certain way of life and age-old stereotyping. With all humbleness we want to say that the Mission has played a pivotal role here.
                We are presenting the activities of the Mission which will manifest its contribution in the building of our nation.
                We know our limitations. Still we believe that we will achieve our lofty goal, slowly but definitely, as the Almighty is with us.
                December 2018 Kolkata, India
            </span>
            </div>
            <Overview/>
        </div>
    )
}