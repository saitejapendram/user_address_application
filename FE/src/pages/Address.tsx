import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { userIdAtom } from "../store/atom";
import { useRecoilState, useSetRecoilState } from "recoil";
import axios from "axios";

export const Address = () => {


    const [houseNumber, setHouseNumber] = useState("");
    const [pincode, setPincode] = useState("");
    const [colony, setColony] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [country, setCountry] = useState("");
    const [userId, setUserId] = useRecoilState(userIdAtom);


    const navigate = useNavigate();

    const handleSubmit = async () => {
        const res:any = await axios.post("http://localhost:3005/address", 
                                    {
                                        userId,
                                        houseNumber,
                                        pincode,
                                        colony,
                                        city,
                                        state,
                                        country,


                                        
                                    }) 
        if (res.data.message === "success") {
            setUserId(res.data.userId),
            setHouseNumber(""),
            setPincode(""),
            setColony(""),
            setCity(""),
            setState(""),
            setCountry("")
            setUserId("")

            navigate('/login')


        }                            

    }

    return (
       <div className="border-2 h-screen">
            <div className="flex justify-center items-center h-full">
                <div className=" w-80 border-2 rounded mx-2 flex flex-col justify-center items-center gap-y-4 py-4 border-black shadow-xl">
                    <div className="font-bold text-3xl mb-4">Add Address</div>
                    <div className="">
                        <input type="text" onChange={(e) => setHouseNumber(e.target.value)} value={houseNumber} className="border-2 border-black rounded py-1 pl-2 w-64" placeholder="Enter your HouseNumber"/>
                    </div>
                    <div className="">
                        <input type="text" onChange={(e) => setColony(e.target.value)} value={colony} className="border-2 border-black rounded py-1 pl-2 w-64" placeholder="Enter your Colony"/>
                    </div>
                    <div className="">
                        <input type="text" onChange={(e) => setPincode(e.target.value)} value={pincode} className="border-2 border-black rounded py-1 pl-2 w-64" placeholder="Enter your Pincode"/>
                    </div>
                    <div className="">
                        <input type="text" onChange={(e) => setCity(e.target.value)} value={city} className="border-2 border-black rounded py-1 pl-2 w-64" placeholder="Enter your City"/>
                    </div>
                    <div className="">
                        <input type="text" onChange={(e) => setState(e.target.value)} value={state} className="border-2 border-black rounded py-1 pl-2 w-64" placeholder="Enter your State"/>
                    </div>
                    <div className="">
                        <input type="text" onChange={(e) => setCountry(e.target.value)} value={country} className="border-2 border-black rounded pl-2 py-1 w-64" placeholder="Enter your Country"/>
                    </div>
                    <button onClick={handleSubmit} className="border-2 border-black rounded-full w-64 text-center py-1 text-white font-semibold text-lg bg-[#0e1752]">Submit</button>
                    

                </div>

            </div>
             
      </div>
    )
}