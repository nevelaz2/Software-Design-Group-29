import React from 'react';
import './App.css';
import './FuelQuoteForm.css';

const FuelQuoteForm = () => {
  return (
    <div className='quote-form'>
      <div id="container">
        <h1 id="title"> Quote Details </h1>

        <div id="gallons-container">
          <p id="gallons-text"> Gallons Requested </p>
          <input id="gallons-input" type="input"></input>
        </div>

        <div id="location-container">
          <p id="location-text"> Location </p>
          <select id="location-select">
            <option value="" disabled selected> State </option>
          </select>
        </div>

        <div id="profit-container">
          <p id="profit-text"> Profit Margin </p>
          <input id="profit-input" type="input"></input>
        </div>

        <div id="existing-customer-container">
          <p id="existing-customer-text"> Existing Customer? </p>
          <div id="yes-container">
            <input id="yes-input" type="checkbox" value="yes"></input> Yes
          </div>

          <div id="no-container">
            <input id="no-input" type="checkbox" value="no"></input> No
          </div>
        </div>

        <div id="city-container">
          <p id="city-text"> City </p>
          <select id="city-select">
            <option value="" disabled selected> City </option>
          </select>
        </div>

        <button id="submit"> Submit </button>
      </div>
    </div>
  );
};

export default FuelQuoteForm;
