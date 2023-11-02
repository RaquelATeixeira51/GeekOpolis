/* eslint-disable react/prop-types */
import React from 'react';
import './index.css';

function QuantidadeSelector({ quantidade, onIncrement, onDecrement }) {

  return (
    <div className="quantidade-selector">
      <button onClick={onDecrement} type='button'>-</button>
      <span>{quantidade}</span>
      <button onClick={onIncrement} type='button'>+</button>
    </div>
  );
}

export default QuantidadeSelector;