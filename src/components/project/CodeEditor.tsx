
"use client";

import { useState } from "react";

export default function CodeEditor() {
  const [code, setCode] = useState(`// Example code
import React from 'react';

function App() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Hello, LazyDev AI!</h1>
      <p>Edit this code to build your application.</p>
    </div>
  );
}

export default App;
`);

  return (
    <div className="h-full p-4 font-mono text-sm">
      <textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        className="w-full h-full p-4 bg-muted/30 rounded-md resize-none focus:outline-none focus:ring-1 focus:ring-neon-green"
        spellCheck={false}
      />
    </div>
  );
}
