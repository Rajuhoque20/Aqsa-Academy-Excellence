 const NewStudentRegistration=()=>{
    return(
        <div className="flex flex-col gap-10 py-30 px-50">
            <h1 className="text-black text-5xl ">Registration</h1>
            <form className="flex flex-col gap-8 bg-green-100 p-20 shadow-xl rounded-md">
                <div className="flex flex-col gap-3">
                    <label className="text-gray-700" htmlFor="name">Name</label>
                    <input required name="name" type="text" placeholder="Enter your name" className="text-gray-700 border-2 border-gray-300 px-5 py-4"/>
                </div>
                <div className="flex flex-col gap-3">
                    <label className="text-gray-700" htmlFor="name">Email</label>
                    <input required name="name" type="text" placeholder="Enter your email" className="text-gray-700 border-2 border-gray-300 px-5 py-4"/>
                </div>
                <div className="flex flex-col gap-3">
                    <label className="text-gray-700" htmlFor="name">Phone</label>
                    <input required name="name" type="text" placeholder="Enter your phone number" className="text-gray-700 border-2 border-gray-300 px-5 py-4"/>
                </div>
                <div className="flex flex-col gap-3">
                    <label className="text-gray-700" htmlFor="name">Father's Name</label>
                    <input required name="name" type="text" placeholder="Enter your father's name" className="text-gray-700 border-2 border-gray-300 px-5 py-4"/>
                </div>
                <div className="flex flex-col gap-3">
                    <label className="text-gray-700" htmlFor="name">Mother's Name</label>
                    <input required name="name" type="text" placeholder="Enter your mother's name" className="text-gray-700 border-2 border-gray-300 px-5 py-4"/>
                </div>
                <div className="flex flex-col gap-3">
                    <label className="text-gray-700" htmlFor="name">Address</label>
                    <input required name="name" type="text" placeholder="Enter your address" className="text-gray-700 border-2 border-gray-300 px-5 py-4"/>
                </div>
                <div className="flex flex-col gap-3">
                    <label className="text-gray-700" htmlFor="name">Marks (percentage or CGPA)</label>
                    <input required name="name" type="text" placeholder="Enter your marks" className="text-gray-700 border-2 border-gray-300 px-5 py-4"/>
                </div>
                <div className="flex flex-col gap-3">
                    <label className="text-gray-700" htmlFor="name">School</label>
                    <input required name="name" type="text" placeholder="Enter your previous school" className="text-gray-700 border-2 border-gray-300 px-5 py-4"/>
                </div>
                <div className="flex flex-col gap-3">
                    <label className="text-gray-700" htmlFor="name">Class (Current)</label>
                    <input required name="name" type="text" placeholder="Enter V,VII, XI etc" className="text-gray-700 border-2 border-gray-300 px-5 py-4"/>
                </div>
                <div className="flex flex-col gap-3">
                    <label className="text-gray-700" htmlFor="name">Uplaod Marksheet</label>
                    <input required name="marksheet" type="file" placeholder="Enter your name" className="text-gray-700 border-2 border-gray-300 px-5 py-4"/>
                </div>

                <button>Siub</button>

            </form>
           

        </div>
    )
}
export default NewStudentRegistration