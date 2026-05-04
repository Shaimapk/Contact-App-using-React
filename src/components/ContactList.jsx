import { useState } from 'react';
import ContactCard from './ContactCard'
import { Link } from 'react-router-dom';
import DeleteConfirmModel from './DeleteConfirmModel';

export default function ContactList({contacts,getContactId}) {

    const [seletedId,setSelectedId]=useState(null);
    const [showConfirmModel,setShowConfirmModel]=useState(false);

    const deleteContactHandler=(id)=>{
        setSelectedId(id);
        setShowConfirmModel(true);
    }
    const confirmDeleteHandler =()=>{
        getContactId(seletedId);
        setSelectedId(null);
        setShowConfirmModel(false);

    }
    const cancelDeleteHandler =()=>{
        setShowConfirmModel(false);
        setSelectedId(null);
    }

    const renderContactList=contacts.map((contact)=>{
        return(
           <ContactCard key={contact.id} contact={contact} clickHandler={deleteContactHandler} />
        )
    });

  return (

    <div className="mt-24 mx-auto">
        <div className='flex justify-between p-4'>
            <h2 className='text-xl font-semibold mb-6 text-center'>Contact List</h2>
            <Link to="/add">
                <button className='p-4 bg-blue-500 text-white py-2 rounded-md hover:bg-blue-700 transition'>Add Contact</button>
            </Link>
        </div>
        {renderContactList}
        {showConfirmModel && 
            <DeleteConfirmModel onConfirm={confirmDeleteHandler} onCancel={cancelDeleteHandler} />
        }
    </div>
  )
}
