import { useState } from 'react';
import ContactCard from './ContactCard'
import { Link } from 'react-router-dom';
import DeleteConfirmModel from './DeleteConfirmModel';
import { MagnifyingGlassIcon } from '@heroicons/react/16/solid'

export default function ContactList({contacts,getContactId}) {

    const [seletedId,setSelectedId]=useState(null);
    const [showConfirmModel,setShowConfirmModel]=useState(false);
    const [search,setSearch]=useState('');

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

    const filteredContacts=contacts.filter((contact)=>{
        return(
            contact.name.toLowerCase().includes(search.toLowerCase()) ||
            contact.email.toLowerCase().includes(search.toLowerCase())
        )
    })

    const renderContactList=filteredContacts.map((contact)=>{
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
        <div className='border border-gray-300 w-full focus-within:border-blue-500 flex justify-between px-3 py-1'>
            <input type="text" placeholder='Search Contacts' value={search} onChange={(e)=>setSearch(e.target.value)} className= 'w-full outline-none' />
            <MagnifyingGlassIcon className='w-5' />
        </div>

        {filteredContacts.length >0 ? (renderContactList):
            (<p className='my-5 text-center'>No contacts found</p>)
        }
        {showConfirmModel && 
            <DeleteConfirmModel onConfirm={confirmDeleteHandler} onCancel={cancelDeleteHandler} />
        }
       
    </div>
  )
}
