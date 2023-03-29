import { useState } from "react";
import { nanoid } from 'nanoid';
import { Layout } from './App.styled'
import { GlobalStyle } from './GlobalStyle';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter'
import useLocalStorage from '../hooks/useLocalStorage'

const CONTACTS_KEY = 'contacts';
export const App = () => {
  const [contacts, setContacts] = useLocalStorage(CONTACTS_KEY, [{ id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },]
  );
  const [filter, setFilter] = useState('');

  const addContact = ({ name, number }) => {
      const ifExist = contacts.find(
      contact => contact.name === name);
    
    if (ifExist) { 
      alert(`${name}: is already in contacts`);
      return
    }

    const newContact = {
      id: nanoid(),
      name,
      number,
    };
   setContacts(contacts => [newContact, ...contacts]);
    };

   const filterContacts = evt => {
    setFilter(evt.currentTarget.value);
  };

  const onFilterContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

const deleteContact = contactId => {
  setContacts(contacts => contacts.filter(({ id }) => id !== contactId));
    };
     
    return (
      <Layout>
        <h1>Phonebook</h1>
        <ContactForm onAddContact={addContact} />
        <h2>Contacts</h2>
        <Filter value={filter} onChange={filterContacts}/>
        <ContactList contacts={onFilterContacts() } onDelete={deleteContact}/>
        <GlobalStyle />
      </Layout>
    );
  }
;
