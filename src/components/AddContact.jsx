import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddContact({addContactHandler}) {


    const [state,setState]=useState({
        name:'',
        email:''
    });
    const [errors,setErrors]=useState('');

    const navigate=useNavigate();
    
    const add =(e)=>{
        e.preventDefault();

        if(state.name.trim() === "" || state.email.trim() === ""){
            setErrors('All fields required!');
            return;
        }else if(!/\S+@\S+\.\S+/.test(state.email)){
            setErrors('Invalid email id');
            return;
        }
        addContactHandler(state);
        console.log("state: "+state);
        
        setState({name:'',email:''});
        setErrors('');

        navigate('/');
        
    }

    return (
        <div className="mt-24 mx-auto">
            <h2 className="text-xl font-semibold mb-6 text-center">Add Contact</h2>
            <form onSubmit={add} className="space-y-4">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-1">
                        Name
                    </label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        placeholder="Name"
                        value={state.name}
                        onChange={(e) => { setState({...state, name: e.target.value });
                                            setErrors('')}}
                        className="w-3/4 px-3 py-2 border border-gray-300 rounded-md"
                    />
                </div>
                <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-1">
                        Email
                    </label>
                    <input
                        type="text"
                        name="email"
                        id="email"
                        placeholder="Email"
                        value={state.email}
                        onChange={(e) => {setState({...state, email: e.target.value });
                                            setErrors('');}}
                        className="w-3/4 px-3 py-2 border border-gray-300 rounded-md"
                    />
                </div>
                {errors && <div className="text-red-500 text-sm">{errors}</div>}
                <button type="submit" className="p-4 bg-blue-500 text-white py-2 rounded-md hover:bg-blue-700 transition">
                    Add
                </button>
            </form>
        </div>
    );
}
