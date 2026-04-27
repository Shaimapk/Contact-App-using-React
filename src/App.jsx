import React, { useEffect, useState } from 'react'
import Header from './components/Header'
import AddContact from './components/AddContact'
import ContactList from './components/ContactList'

function App() {
  const LOCAL_STORAGE_KEY='contactApp-contacts';
  const [contacts,setContacts]=useState(()=>{
    return JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))||[];
  });

  useEffect(()=>{
    localStorage.setItem(LOCAL_STORAGE_KEY,JSON.stringify(contacts))
  },[contacts]);

  const addContactHandler =(contact)=>{
    console.log("reached apps, contact"+contact);
    setContacts([...contacts,{id:crypto.randomUUID(),...contact}])
  }

  const removeContactHandler=(id)=>{
    const newContactList=contacts.filter((contact)=>(contact.id !== id));
    setContacts(newContactList);
  }

  return (
    <div className='mx-4 space-y-4'>
      <Header />
      <AddContact addContactHandler={addContactHandler} />
      <ContactList contacts={contacts} getContactId={removeContactHandler} />
    </div>
  )
}

export default App