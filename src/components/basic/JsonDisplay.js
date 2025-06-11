import React, { useState, useEffect } from 'react';

const JsonDisplay = ({ jsonData = null, editable = false, onChange = null }) => {
  // Sample JSON data if none provided
  const defaultJson = {
    name: "John Doe",
    age: 30,
    email: "john.doe@example.com",
    address: {
      street: "123 Main St",
      city: "New York",
      zipCode: "10001"
    },
    hobbies: ["reading", "swimming", "coding"],
    isActive: true,
    profile: null
  };

  const [jsonText, setJsonText] = useState(() => {
    return JSON.stringify(jsonData || defaultJson, null, 2);
  });

  const [isValid, setIsValid] = useState(true);

  // Update jsonText when jsonData prop changes
  useEffect(() => {
    if (jsonData !== null && jsonData !== undefined) {
      setJsonText(JSON.stringify(jsonData, null, 2));
    } else if (jsonData === null) {
      // Clear the textarea when jsonData is explicitly set to null
      setJsonText('');
    }
  }, [jsonData]);

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
    <div className="w-full max-w-4xl mx-auto p-6 bg-gray-50 rounded-lg">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-800">JSON Display</h2>
        <div className="flex gap-2">
          {editable && (
            <button
              onClick={formatJson}
              className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors text-sm"
            >
              Format JSON
            </button>
          )}
          <div className={`px-2 py-1 rounded text-xs font-medium ${
            isValid 
              ? 'bg-green-100 text-green-800' 
              : 'bg-red-100 text-red-800'
          }`}>
            {isValid ? 'Valid JSON' : 'Invalid JSON'}
          </div>
        </div>
      </div>
      
      <textarea
        value={jsonText}
        onChange={handleTextChange}
        readOnly={!editable}
        className={`w-full h-96 p-4 border rounded-lg font-mono text-sm resize-vertical ${
          isValid 
            ? 'border-gray-300 focus:border-blue-500' 
            : 'border-red-300 focus:border-red-500'
        } ${
          editable 
            ? 'bg-white focus:outline-none focus:ring-2 focus:ring-blue-200' 
            : 'bg-gray-100 cursor-default'
        }`}
        style={{
          lineHeight: '1.5',
          tabSize: 2,
          minWidth: '500px',
          minHeight: '350px'
        }}
        spellCheck={false}
      />
      
      <div className="mt-2 text-sm text-gray-600">
        {editable ? (
          <p>Edit the JSON above. It will be automatically validated as you type.</p>
        ) : (
          <p>JSON is displayed in read-only mode with proper formatting.</p>
        )}
      </div>
    </div>
  );
};

export default JsonDisplay;