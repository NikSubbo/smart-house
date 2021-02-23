import React from 'react';
import Main from 'pages/Main/Main';
import { Route } from "react-router-dom";

function App() {
  return (
    <Route path="/" component={Main} />
  );
}

export default App;
