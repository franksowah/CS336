import React from 'react';
import ReactDOM from 'react-dom';
import Remarkable from 'remarkable';
import $ from 'jquery';

import '../css/base.css';

import PersonBox from './PersonBox.js'

ReactDOM.render(
  <PersonBox url='/people' pollInterval={2000} />,
  document.getElementById('content')
);
