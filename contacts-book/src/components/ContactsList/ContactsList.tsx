import React from 'react';
import { Contact } from '../../types';
import { ContactDetail } from '../ContactDetail/ContactDetail';
import './ContactsList.css';

type Props = {
  contacts: Contact[],
  deleteContact: (contactId: number) => void,
  handleAddingNewFieldToContact: (contactId: number,
  fieldName: string,
  fieldValue: string | number) => void,
  handleDeletingFieldFromContact: (contactId: number,
    fieldName: string) => void,
}

export class ContactsList extends React.Component<Props> {
  state = {
    isDeletingContact: false,
    contactToView: null,
  }

  handleDeleteButton = () => {
    this.setState({ isDeletingContact: true });
  };

  handleCancelButton = () => {
    this.setState({ isDeletingContact: false });
  };

  handleSureButton = (contactId: number) => {
    this.props.deleteContact(contactId);
    this.setState({ isDeletingContact: false });
  }

  handleViewDetailsButton = (contactId: number) => {
    if (this.state.contactToView === null) {
      this.setState({
        contactToView: this.props.contacts.find(item => item.id === contactId)
      })
    } else {
      this.setState({
        contactToView: null,
      })
    }
  }

  render() {
    const { contacts } = this.props;
    const { isDeletingContact } = this.state;

    return (
      <div className="container">
        <ul className="ContactsList">
          {contacts.map(contact => (
            <li key={contact.id} className="ContactsList__item">
              <div className="ContactsList__contactInfo">
                <strong>
                  {contact.name}
                </strong>

                {contact.phone}
              </div>

              <div className="ContactsList__buttonsContainer">
                <button
                  type="button"
                  className="ContactsList__button"
                  onClick={this.handleDeleteButton}>
                  Delete
                </button>

                <button
                  type="button"
                  className="ContactsList__button"
                  onClick={() => this.handleViewDetailsButton(contact.id)}
                >
                  {this.state.contactToView
                    ? ('Cancel')
                    : ('View details')
                  }
                </button>
              </div>

              {isDeletingContact && (
                  <div>
                    <button
                      type="button"
                      onClick={() => this.handleSureButton(contact.id)}
                    >
                      Sure
                    </button>

                    <button
                      type="button"
                      onClick={this.handleCancelButton}
                    >
                      Cancel
                    </button>
                  </div>
                )}
            </li>
          ))}
        </ul>
        {this.state.contactToView && (
          <ContactDetail
            contact={this.state.contactToView}
            handleAddingNewFieldToContact={this.props.handleAddingNewFieldToContact}
            handleDeletingFieldFromContact={this.props.handleDeletingFieldFromContact}
          />
        )}
      </div>
    );
  }
}