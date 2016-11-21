import React from 'react';

import '../css/base.css';

import Person from './Person.js'

module.exports = React.createClass({
  render: function() {
    var personNodes = this.props.data.map(function(person) {
      return (
        <Person firstname={person.firstname} lastname={person.lastname} key={person.id}>
          {person.startdate}
        </Person>
      );
    });
    return (
      <div className="personList">
        {personNodes}
      </div>
    );
  }
});
