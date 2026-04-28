import { useEffect, useState } from 'react'
import Header from './components/Header'
import AddContact from './components/AddContact'
import ContactList from './components/ContactList'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ContactDetails from './components/contactDetails';

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
      <BrowserRouter>
      <Header />

      <Routes>
        <Route path='/add' element={ <AddContact addContactHandler={addContactHandler} />} />
        <Route path='/' element={<ContactList contacts={contacts} getContactId={removeContactHandler} />} />
        <Route path='/contact/:id' element={<ContactDetails contacts={contacts} />} />
      </Routes>

    </BrowserRouter>
    </div>
  )
}

export default App