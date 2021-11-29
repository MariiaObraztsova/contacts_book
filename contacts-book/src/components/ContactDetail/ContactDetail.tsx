import React from 'react';
import { Contact } from '../../types';
import './ContactDetail.css';

type Props = {
  contact: Contact,
  handleAddingNewFieldToContact: (contactId: number,
    fieldName: string,
    fieldValue: string | number) => void,
    handleDeletingFieldFromContact: (contactId: number,
      fieldName: string) => void,
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
    fieldName: '',
    fieldValue: '',
  }

  // handeling click on "Add field" button to show the form
  handleAddFieldButton = () => {
    this.setState({ isAddingField: true });
  }

  // handeling click on "Cancel" button to hide the form
  handleCancelButton = () => {
    this.setState({ isAddingField: false});
  }

  handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    this.props.handleAddingNewFieldToContact(
      this.props.contact.id, this.state.fieldName,this.state.fieldValue
    );

    this.setState({
      fieldName: '',
      fieldValue: '',
    })
  }

  render() {
    const { isAddingField } = this.state;
    const keysOfContact = Object.keys(this.props.contact);
    const valuesOfContact = Object.values(this.props.contact);

    return (
      <div className="ContactDetail">
        <h1>
          Contact details
        </h1>

        {isAddingField ? (
            <div>
              <button
              type="button"
              className="App__button"
              onClick={this.handleCancelButton}
              >
                Cancel
              </button>

              <form onSubmit={this.handleSubmit}>
                <input
                  type="text"
                  name="fieldName"
                  value={this.state.fieldName}
                  placeholder="New field name"
                  onChange={(event) => this.handleInputChange(event)}
                />

                <input
                  type="text"
                  name="fieldValue"
                  value={this.state.fieldValue}
                  placeholder="New field value"
                  onChange={(event) => this.handleInputChange(event)}
                />

                <button type="submit">
                  Add field
                </button>
              </form>
            </div>
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
        <ul>
          {keysOfContact.map((key, index) => (
            <li
              key={key}
              className="ContactDetail__item"
            >
              {`${key}: ${valuesOfContact[index]}`}

              <button
                type="button"
                className="ContactDetail__deleteButton"
                onClick={() => this.props.handleDeletingFieldFromContact(
                  this.props.contact.id, key
                )}>
                X
              </button>
            </li>
          ))}
        </ul>
      </div>
    )
  }

}
