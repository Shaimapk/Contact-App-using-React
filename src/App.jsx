import { useEffect, useState } from 'react'
import Header from './components/Header'
import AddContact from './components/AddContact'
import ContactList from './components/ContactList'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ContactDetails from './components/contactDetails';
import api from './api/contacts'

function App() {
  const LOCAL_STORAGE_KEY='contactApp-contacts';
  // const [contacts,setContacts]=useState(()=>{
  //  return JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))||[];
  // });
  const [contacts,setContacts]=useState([]);

  //retrieve contacts
  const retrieveContacts=async ()=>{
    const response =await api.get("/contacts");
    return response.data;
  };

  useEffect(()=>{
    const getAllContacts=async ()=>{
      const allContacts =await retrieveContacts();
      if(allContacts) setContacts(allContacts);
    };
    getAllContacts();
  },[]);

  useEffect(()=>{
    localStorage.setItem(LOCAL_STORAGE_KEY,JSON.stringify(contacts))
  },[contacts]);

  const addContactHandler =(contact)=>{
    console.log(contact);
    
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