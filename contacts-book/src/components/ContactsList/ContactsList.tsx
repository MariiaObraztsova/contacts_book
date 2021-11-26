import React from 'react';
import { Contact } from '../../types';
import './ContactsList.css';

type Props = {
  contacts: Contact[],
  deleteContact: (contactId: number) => void,
}

export class ContactsList extends React.Component<Props> {
  state = {
    isDeletingContact: false,
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

  render() {
    const { contacts } = this.props;
    const { isDeletingContact } = this.state;

    return (
      <ul className="ContactsList">
        {contacts.map(contact => (
          <li key={contact.id} className="ContactsList__item">
            <strong>
              {contact.name}
            </strong>

            {contact.phone}

            <button
              type="button"
              onClick={this.handleDeleteButton}>
              Delete
            </button>

            <button type="button">
              View contact details
            </button>

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
    );
  }
}