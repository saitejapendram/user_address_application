import { useState } from "react"
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { userIdAtom } from "../store/atom";
import { useRecoilState } from "recoil";
import axios from "axios";

export const Register = () => {

    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const navigate = useNavigate();
    const [userId, setUserId] = useRecoilState(userIdAtom);


    const handleSubmit = async () => {
        const res:any = await axios.post("http://localhost:3005/register", 
                                    {
                                       email,
                                       firstName,
                                       lastName 
                                    }) 
        if (res.data.message === "success") {
            setUserId(res.data.userId);
            setEmail(""),
            setFirstName(""),
            setLastName("")
            navigate('/address')


        }                            

    }

    return (
        <div className="border-2 h-screen">
            <div className="flex justify-center items-center h-full">
                <div className=" w-80 border-2 rounded mx-2 flex flex-col justify-center items-center gap-y-4 py-4 border-black shadow-xl">
                    <div className="font-bold text-3xl mb-4">Register</div>
                    <div className="">
                        <input type="text" onChange={(e) => setEmail(e.target.value)} value={email} className="border-2 border-black rounded pl-2 py-1 w-64" placeholder="Enter your email"/>
                    </div>
                    <div className="">
                        <input type="text" onChange={(e) => setFirstName(e.target.value)} value={firstName} className="border-2 border-black rounded py-1 pl-2 w-64" placeholder="Enter your email"/>
                    </div>
                    <div className="">
                        <input type="text" onChange={(e) => setLastName(e.target.value)} value={lastName} className="border-2 border-black rounded py-1 pl-2 w-64" placeholder="Enter your email"/>
                    </div>
                    <button onClick={handleSubmit} className="border-2 border-black rounded-full w-64 text-center py-1 text-white font-semibold text-lg bg-[#0e1752]">Submit</button>
                    <div className="">Already registered ? <Link to="/login">Login</Link></div>

                </div>

            </div>
             
      </div>
    )
}