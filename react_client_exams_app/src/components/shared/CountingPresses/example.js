import React, { useState, useEffect } from 'react';

export default function Example() {
  // Declare a new state variable, which we'll call "count"
    const [count, setCount] = useState(0);

    useEffect(() => {
        document.title = `You clicked ${count} times`;  
    })

  return (
    <div>
      <h2>You clicked {count} times!</h2>

      <button onClick={() => setCount(count > 0 ? count - 1 : count)}> Decrement </button>
      <button onClick={() => setCount(count + 1)}> Increment </button>
    </div>
  );
}