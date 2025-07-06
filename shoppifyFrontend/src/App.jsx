import React, { useState } from 'react'
import Header from './Components/Header'
import Productslist from './Components/Productslist'
import { Provider } from 'react-redux'
import { datastore } from './Components/Reduxstore'
import Cart from './Components/Cart'

function App() {
  const [categorydisplay,setCategorydisplay] = useState('none');
  const [branddisplay, setBranddisplay] = useState('none');
  const [menulinemenudisplay, setMenulinemenudisplay] = useState('none');
  

  return (
    <div id="wholecontainer">
    

      <Header categorydisplay={categorydisplay} setCategorydisplay={setCategorydisplay} brandsdisplay={branddisplay} setBrandsdisplay={setBranddisplay} menulinemenudisplay={menulinemenudisplay } setMenulinemenudisplay={setMenulinemenudisplay} />
      <Productslist categorydisplay={categorydisplay} setCategorydisplay={setCategorydisplay} brandsdisplay={branddisplay} setBrandsdisplay={setBranddisplay} menulinemenudisplay={menulinemenudisplay } setMenulinemenudisplay={setMenulinemenudisplay} />
        
    
    </div>
  )
}

export default App