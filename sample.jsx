import React from 'react';
import { useContext } from 'react';
import { useParams } from 'react-router-dom';

const IdContext = React.createContext(); // This is a way to pass id around with just React and React Router

// eslint-disable-next-line no-unused-vars
function App() {
  const { id } = useParams();

  return (
    <IdContext.Provider value={id}> {/* Wrap the destination component in this */}
      <MyComponent />
    </IdContext.Provider>
  );
}

function MyComponent() {
  const id = useContext(IdContext);

  // use the id value here
  return <div>{id}</div>;
}
