import React from 'react';
import './App.css';
import { ContactsList } from './components/ContactsList/ContactsList';
import { Contact } from './types';

import users from './users';

type State = {
  contacts: Contact[],
  isAddingContact: boolean,
  newContactName: string,
  newContactPhone: string,
}

class App extends React.Component<{}, State> {
  state = {
    contacts: users,
    isAddingContact: false,
    newContactName: '',
    newContactPhone: '',
  }

  // clear "add contact" form
  clearForm = () => {
    this.setState({
      newContactName: '',
      newContactPhone: '',
    })
  }

  // handeling click on "Add contact" button to show the form
  handleAddContactButton = () => {
    this.setState({ isAddingContact: true });
  }

  // handeling click on "Cancel" button to hide the form
  handleCancelButton = () => {
    this.setState({ isAddingContact: false});
    this.clearForm();
  }

  // handeling adding new contact name
  handleNewContactNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      newContactName: event.target.value,
    });
  };

  // handeling adding new contact phone
  handleNewContactPhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      newContactPhone: event.target.value,
    });
  };

  // handeling adding new contact to contacts list
  handleSubmittingNewContact = (event: React.FormEvent) => {
    event.preventDefault();

    const newContact = {
      id: this.state.contacts.length + 1,
      name: this.state.newContactName,
      phone: this.state.newContactPhone,
    };

    this.setState(prevState => ({
      contacts: [...prevState.contacts, newContact],
      isAddingContact: false,
    }))

    this.clearForm();
  }

  handleDeletingContact = (contactId: number) => {
    this.setState(prevState => ({
      contacts: [...prevState.contacts].filter(contact => contact.id !== contactId),
    }));
  };

  render() {
    const {
      contacts,
      isAddingContact,
      newContactName,
      newContactPhone
    } = this.state;

    return (
      <div className="App">
        <h1>
          Contacts List
        </h1>

        {isAddingContact ? (
            <button
              type="button"
              onClick={this.handleCancelButton}
            >
              Cancel
            </button>
          ) : (
            <button
              type="button"
              onClick={this.handleAddContactButton}
            >
              Add new contact
            </button>
          )
        }

        {isAddingContact && (
          <form onSubmit={this.handleSubmittingNewContact}>
            <label htmlFor="contactName">
              Name:
              <input
                type="text"
                id="contactName"
                name="newContactName"
                value={newContactName}
                onChange={this.handleNewContactNameChange}
              />
            </label>

            <label htmlFor="contactPhone">
              Phone:
              <input
                type="tel"
                id="contactPhone"
                name="newContactPhone"
                value={newContactPhone}
                onChange={this.handleNewContactPhoneChange}
              />
            </label>

            <button type="submit">
              Add
            </button>
          </form>
        )}

        {contacts.length
          ? <ContactsList
            contacts={contacts}
            deleteContact={this.handleDeletingContact}
          />
          : (<h2> No contacts yet </h2>)
        }
      </div>
    );
  }
}

export default App;
