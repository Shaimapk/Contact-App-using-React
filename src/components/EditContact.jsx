import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function EditContact({updateContactHandler,contacts}) {

    const navigate=useNavigate();
    const location=useLocation();

    const contact = location.state;

    const [state,setState]=useState({
        name:contact?.name || '',
        email:contact?.email || ''
    });
    const [errors,setErrors]=useState('');
    
    if(!contact){
        return <p className="mt-24 mx-auto">No contacts found</p>
    }

    const update =(e)=>{
        e.preventDefault();

        if(state.name.trim() === "" || state.email.trim() === ""){
            setErrors('All fields required!');
            return;
        }else if(!/\S+@\S+\.\S+/.test(state.email)){
            setErrors('Invalid email id');
            return;
        }
                //check duplicate email
        const isDuplicate=contacts.some((c)=> 
            c.email.toLowerCase()===state.email.trim().toLowerCase() && c.id !== contact.id)
        if(isDuplicate){
            setErrors('Email already exists!');
            return;
        }

        updateContactHandler({...state,id:contact.id});
        
        setErrors('');

        navigate('/');
        
    }

    return (
        <div className="mt-24 mx-auto">
            <h2 className="text-xl font-semibold mb-6 text-center">Update Contact</h2>
            <form onSubmit={update} className="space-y-4">
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
                    Update
                </button>
            </form>
        </div>
    );
}
