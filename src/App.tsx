import { useState } from 'react';

function App() {
  const [input, setInput] = useState('');
  
  const xssExamples = [
    {
      name: 'Basic Script Alert',
      code: '<script>alert("XSS!")</script>'
    },
    {
      name: 'Image Onerror',
      code: '<img src="x" onerror="alert(\'XSS via image!\')" />'
    },
    {
      name: 'Onclick Event',
      code: '<div onclick="alert(\'clicked!\')">Click me</div>'
    },
    {
      name: 'Style Manipulation',
      code: '<style>body { background: red; }</style>'
    },
    {
      name: 'Link with JavaScript',
      code: '<a href="javascript:alert(\'XSS via link!\')">Click this link</a>'
    }
  ];

  const createMarkup = () => {
    return { __html: input };
  };

  const handleReset = () => {
    setInput('');
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>XSS Demo</h2>
      
      <div style={{ marginBottom: '20px' }}>
        <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Try entering some HTML/JavaScript"
            style={{ width: '300px', padding: '8px' }}
          />
          <button
            onClick={handleReset}
            style={{
              padding: '8px 16px',
              backgroundColor: '#ff4444',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Reset
          </button>
        </div>
        <div>
          {xssExamples.map((example, index) => (
            <button
              key={index}
              onClick={() => setInput(example.code)}
              style={{ 
                margin: '5px',
                padding: '5px 10px',
                backgroundColor: '#f0f0f0',
                border: '1px solid #ccc',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              {example.name}
            </button>
          ))}
        </div>
      </div>

      <div style={{ display: 'flex', gap: '20px' }}>
        <div style={{ flex: 1 }}>
          <h3>Unsafe Rendering (vulnerable to XSS):</h3>
          <div 
            style={{ padding: '10px', border: '1px solid red' }}
            dangerouslySetInnerHTML={createMarkup()} 
          />
        </div>

        <div style={{ flex: 1 }}>
          <h3>Safe Rendering:</h3>
          <div style={{ padding: '10px', border: '1px solid green' }}>
            {input}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
