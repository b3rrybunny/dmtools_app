import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const JsonDisplay = ({ jsonData = null, editable = false, onChange = null }) => {
  const [jsonText, setJsonText] = useState('');
  const [isValid, setIsValid] = useState(true);

  // Initial formatting only on mount
  useEffect(() => {
    if (jsonData !== null && jsonData !== undefined) {
      setJsonText(JSON.stringify(jsonData, null, 2));
    } else if (jsonData === null) {
      setJsonText('');
    }
    // Only run once on initial mount
  }, []);

  const handleTextChange = (e) => {
    const newValue = e.target.value;
    setJsonText(newValue);

    if (editable && onChange) {
      try {
        const parsed = JSON.parse(newValue);
        setIsValid(true);
        onChange(parsed);
      } catch (error) {
        setIsValid(false);
      }
    }
  };

  const formatJson = () => {
    try {
      const parsed = JSON.parse(jsonText);
      const formatted = JSON.stringify(parsed, null, 2);
      setJsonText(formatted);
      setIsValid(true);
    } catch (error) {
      setIsValid(false);
    }
  };

  return (
    <div className="container-fluid p-4 bg-light rounded">
      <div className="mb-3 d-flex justify-content-between align-items-center">
        <h2 className="h4 text-dark">JSON Display</h2>
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
          height: '350px',
          lineHeight: '1.5',
          tabSize: 2,
          minWidth: '500px',
          backgroundColor: editable ? 'white' : 'gray',
          color: editable ? 'black' : 'white'
        }}
        spellCheck={false}
      />

      <div className="mt-2 text-muted small">
        {editable ? (
          <p>Edit the JSON above. It will be validated as you type, but only formatted when you click the button.</p>
        ) : (
          <p>JSON is displayed in read-only mode with proper formatting.</p>
        )}
      </div>
    </div>
  );
};

export default JsonDisplay;
