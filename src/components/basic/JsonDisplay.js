import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import SideBySide from './SideBySide';

const JsonDisplay = ({ jsonData = null, editable = false, onChange = null, onValidChange }) => {
  const [ jsonText, setJsonText ] = useState('');
  const [ isValid, setIsValid ] = useState(true);
  const [ isUserEditing, setIsUserEditing ] = useState(false);

  // Update display when jsonData changes, but only if user isn't actively editing
  useEffect(() => {
    if (!isUserEditing) {
      if (jsonData !== null && jsonData !== undefined) {
        setJsonText(JSON.stringify(jsonData, null, 2));
      } else if (jsonData === null) {
        setJsonText('');
      }
    }
  }, [ jsonData, isUserEditing ]);

  // Triggers when text changes
  const handleTextChange = (e) => {
    const newValue = e.target.value;
    setJsonText(newValue);
    setIsUserEditing(true); // Mark that user is actively editing

    if (editable && onChange) {
      try {
        const parsed = JSON.parse(newValue);
        setIsValid(true);
        onValidChange(true);
        onChange(parsed);
      } catch (error) {
        onValidChange(false);
        setIsValid(false);
      }
    }
  };

  // Formats JSON text
  const formatJson = () => {
    try {
      const parsed = JSON.parse(jsonText);
      const formatted = JSON.stringify(parsed, null, 2);
      setJsonText(formatted);
      setIsValid(true);
      setIsUserEditing(false); // Reset editing state after formatting
    } catch (error) {
      setIsValid(false);
    }
  };

  // Copies JSON text
  const [isCopied, setIsCopied] = useState(false);
  const copyJson = () => {
    const string = jsonText;
    const copyToClipboard = () => {
      navigator.clipboard.writeText(string)
        .then(() => {
          setIsCopied(true);
          setTimeout(() => setIsCopied(false), 5000); // Reset after 5 seconds
        })
        .catch(err => {
          console.error('Failed to copy text: ', err);
        });
    };
    copyToClipboard();
  }

  return (
    <div className="container-fluid p-4 bg-light rounded">
      <div className="mb-3 d-flex justify-content-between align-items-center">
        <SideBySide content={
          <>
            <h2 className="h4 text-dark">JSON Display</h2>
            <button
              className='btn btn-primary'
              onClick={copyJson}
            >
              {isCopied ? 'Copied!' : 'Copy to clipboard'}
            </button>
          </>
        } />
        <div className="d-flex gap-2">
          {editable && (
            <button
              onClick={formatJson}
              className="btn btn-primary btn-sm"
            >
              Format JSON
            </button>
          )}
          <span className={`badge ${isValid ? 'bg-success' : 'bg-danger'}`}>
            {isValid ? 'Valid JSON' : 'Invalid JSON'}
          </span>
        </div>
      </div>

      <textarea
        value={jsonText}
        onChange={handleTextChange}
        readOnly={!editable}
        className={`form-control font-monospace ${isValid ? '' : 'is-invalid'}`}
        style={{
          maxHeight: '350px',
          minHeight: '200px',
          lineHeight: '1.5',
          tabSize: 2,
          minWidth: '450px',
          backgroundColor: editable ? 'white' : 'gray',
          color: editable ? 'black' : 'white'
        }}
        spellCheck={false}
      />

      <div className="mt-2 text-muted small">
        {editable ? (
          <p style={{margin: '0px'}}>Edit the JSON above. It will be validated as you type, but only formatted when you click the button. Only valid JSONs will be saveable.</p>
        ) : (
          <p style={{margin: '0px'}}>JSON currently displayed in read-only mode. Click the "Start editing" button to edit.</p>
        )}
      </div>
    </div>
  );
};

export default JsonDisplay;