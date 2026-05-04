import { useEffect, useState } from "react";
import Header from "./components/Header";
import AddContact from "./components/AddContact";
import ContactList from "./components/ContactList";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ContactDetails from "./components/contactDetails";
import api from "./api/contacts";
import EditContact from "./components/EditContact";

function App() {
    const [contacts, setContacts] = useState([]);

    //retrieve contacts
    const retrieveContacts = async () => {
        const response = await api.get("/contacts");
        return response.data;
    };

    useEffect(() => {
        const getAllContacts = async () => {
            const allContacts = await retrieveContacts();
            if (allContacts) setContacts(allContacts);
        };
        getAllContacts();
    }, []);

    const addContactHandler = async (contact) => {
        const request = {
            id: crypto.randomUUID(),
            ...contact,
        };
        const response = await api.post("/contacts", request);
        setContacts([...contacts, response.data]);
    };

    const updateContactHandler = async (contact) => {
        const response = await api.put(`/contacts/${contact.id}`, contact);
        const { id } = response.data;
        setContacts((prevContacts) => {
            return prevContacts.map((c) => {
                return c.id === id ? { ...response.data } : c;
            });
        });
    };

    const removeContactHandler = async (id) => {
        await api.delete(`/contacts/${id}`);
        const newContactList = contacts.filter((contact) => contact.id !== id);
        setContacts(newContactList);
    };

    return (
        <div className="mx-4 space-y-4">
            <BrowserRouter>
                <Header />

                <Routes>
                    <Route path="/add" element={<AddContact addContactHandler={addContactHandler} contacts={contacts} />} />
                    <Route path="/" element={<ContactList contacts={contacts} getContactId={removeContactHandler} />} />
                    <Route path="/contact/:id" element={<ContactDetails contacts={contacts} />} />
                    <Route path="/edit/:id" element={<EditContact updateContactHandler={updateContactHandler} contacts={contacts}/> } />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
