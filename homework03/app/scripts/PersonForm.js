import React from 'react';

import '../css/base.css';

//Get information to create a new Person.
module.exports = React.createClass({
  getInitialState: function() {
    return {firstname: '', lastname: '', id: '', startdate: ''};
  },
  handleFirstNameChange: function(e) {
    this.setState({firstname: e.target.value});
  },
  handleLastNameChange: function(e) {
    this.setState({lastname: e.target.value});
  },
  handleIdChange: function(e) {
    this.setState({id: e.target.value});
  },
  handleStartDateChange: function(e) {
    this.setState({startdate: e.target.value});
  },
  handleSubmit: function(e) {
    e.preventDefault();

    var firstName = this.state.firstname;
    var lastName = this.state.lastname;
    var Id = this.state.id;
    var startDate = this.state.startdate;

    if(!firstName || !lastName || !Id|| !startDate) {
      return;
    }
    this.props.onPersonSubmit({firstname: firstName, lastname: lastName, id: Id, startdate: startDate});
    this.setState({firstname: '', lastname: '', id: '', startdate: ''});
  },
  render: function() {
    return (
      <form className="personForm" onSubmit={this.handleSubmit}>

          <input
            type="text"
            placeholder="First name..."
            value={this.state.firstname}
            onChange={this.handleFirstNameChange}
          />
          <input
            type="text"
            placeholder="Last name..."
            value={this.state.lastname}
            onChange={this.handleLastNameChange}
          />
          <input
            type="number"
            placeholder="login ID..."
            value={this.state.id}
            onChange={this.handleLoginIdChange}
          />
          <input
            type="text"
            placeholder="Start date (yyyy-mm-dd)..."
            value={this.state.startdate}
            onChange={this.handleStartDateChange}
          />
          <input type="submit" value="Post"/>
      </form>
    );
  }
});
