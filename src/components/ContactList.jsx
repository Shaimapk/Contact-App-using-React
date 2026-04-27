import React from 'react'
import ContactCard from './ContactCard'

export default function ContactList({contacts,getContactId}) {

    const deleteContactHandler=(id)=>{
        getContactId(id);
    }

    const renderContactList=contacts.map((contact)=>{
        return(
           <ContactCard key={contact.id} contact={contact} clickHandler={deleteContactHandler} />
        )
    });

  return (

    <div>
        {renderContactList}
    </div>
  )
}
