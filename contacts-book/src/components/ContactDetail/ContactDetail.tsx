import React from 'react';
import { Contact } from '../../types';
// import './ContactDetail.css';

type Props = {
  contact: Contact
}

export class ContactDetail extends React.Component<Props> {
  state = {
    name: this.props.contact.name,
    username: this.props.contact.username || '',
    email: this.props.contact.email || '',
    phone: this.props.contact.phone,
    website: this.props.contact.website || '',
    company: this.props.contact.company || '',
    isAddingField: false,
  }

  // handeling click on "Add field" button to show the form
  handleAddFieldButton = () => {
    this.setState({ isAddingField: true });
  }

  // handeling click on "Cancel" button to hide the form
  handleCancelButton = () => {
    this.setState({ isAddingField: false});
  }

  render() {
    const { isAddingField } = this.state;
    return (
      <div>
        <h1>
          Contact details
        </h1>

        {isAddingField ? (
            <button
              type="button"
              className="App__button"
              onClick={this.handleCancelButton}
            >
              Cancel
            </button>
          ) : (
            <button
              type="button"
              className="App__button"
              onClick={this.handleAddFieldButton}
            >
              Add new field
            </button>
          )
        }
      </div>
    )
  }

}
