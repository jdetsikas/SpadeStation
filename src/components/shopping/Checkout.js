import {React, useState, useeffect } from react 


const addingItems = () => {
    const [count, setCount] = useState(4)
    
    function decrement(){
      setCount(count - 1)
    }
    function increment () {
      setCount(count + 1)
    }
      return(
        
      <>
      
       <h2>hello </h2>
       <button onClick= { decrement }> - </button>
       <span> {count} </span>
       <button onClick={ increment }>+</button>
    
    
     </>
      )}

      export default addingItems