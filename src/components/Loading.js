import React from 'react';

import loader from '../assets/loader.svg';
import '../App.css';

const Loading = () => (
  <div>
    <div className="container">
      <div className="card">
        <img src={loader} alt="" />
      </div>
    </div>
  </div>
);

export default Loading;
