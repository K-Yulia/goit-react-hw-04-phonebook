import { Component } from "react";
import { nanoid } from 'nanoid';
import { Layout } from './App.styled'
import { GlobalStyle } from './GlobalStyle';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter'
export class App extends Component {
state = {
  contacts: [{ id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },],
  filter: '',
  }

  addContact = ({ name, number }) => {
    const { contacts } = this.state;

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
    this.setState(({ contacts }) => ({ contacts: [newContact, ...contacts] }));
    };

   filterContacts = evt => {
    this.setState({ filter: evt.currentTarget.value });
  };

  onFilterContacts = () => {
    const { contacts, filter } = this.state;
    const normalizedFilter = filter.toLowerCase();
    
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

deleteContact = contactId => {
    this.setState(prevState => {
      return {
        contacts: prevState.contacts.filter(contact => contact.id !== contactId),
      };
    });
  };


  render() {
    return (
      <Layout>
        <h1>Phonebook</h1>
        <ContactForm onAddContact={this.addContact} />
        <h2>Contacts</h2>
        <Filter value={this.state.filter} onChange={this.filterContacts}/>
        <ContactList contacts={this.onFilterContacts() } onDelete={this.deleteContact}/>
        <GlobalStyle />
      </Layout>
    );
  }
};
