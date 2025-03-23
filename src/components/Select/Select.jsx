import React from 'react';
import './Select.css';

const Select = ({ label, name, value, onChange, options }) => {
  return (
    <div className="select-container">
      <label htmlFor={name}>{label}</label>
      <select id={name} name={name} value={value} onChange={onChange}>
        <option value="">Select {label.toLowerCase()}</option> {/* Add a default option */}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
