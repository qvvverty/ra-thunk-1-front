import React from 'react';

export default function Error(props) {
  return (
    <div className="error-container">
      {props.errorMessage}
      <div className="reload-btn-container">
        <button onClick={props.reload}>Try again</button>
      </div>
    </div>
  )
}
