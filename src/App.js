import React, { useState, useEffect } from 'react';
import orm from './utils/orm.js';
import Brandbanner from './components/Brandbanner';
import Searchbar from './components/Searchbar';
import Card from './components/Card';

function App() {
  // for storing keywords
  const [search, setSearch] = useState('');
  // for sending data to Card
  const [result, setResult] = useState([]);
  // for storing the response from useEffect
  const [list, setList] = useState([]);

  // send an API call when the page is first loaded
  useEffect(function(){
    generateEmployee();
  },[]);

  // for sending an API call to get random generated profiles
  async function generateEmployee(){
    console.log(`[generateEmployee] called.`);
    const response = await orm.userGenerator();
    console.log(response);
    setList(response);
    setResult(response);
  }

  function handleInputChange(event){
    console.log('[handleInputChange] called.');
    const value = event.target.value;
    console.log(`[handleInputChange] value: ${value}`);
    console.log(value);
    setSearch(value);
    if(value === '') setResult(list); //trigger a re-render when there is no keywords in the search bar
  }
  
  function handleFormSubmit(event){
    event.preventDefault();
    console.log(`[handleFormSubmit] called.`);
    const keyword = search.toLowerCase()
    if(search) {
      const response = list.filter(item => {
        if(item.name.first.toLowerCase().includes(keyword) || item.name.last.toLowerCase().includes(keyword)) return true;
        else return false;
      });
      setSearch('');
      setResult(response);
    }
    else setResult(list);
  }

  function handleBtnClicked(event){ 
    const value = event.target.value;
    var response = null;
    console.log(`[handleButtonClicked] called. value=${value}`);
    if(value === 'first'){
      response = list.sort(function(item1, item2){
        const name1 = item2.name.first.toLowerCase();
        const name2 = item1.name.first.toLowerCase();
        if(name1 < name2) return 1;
        else if (name1 > name2) return -1;
        else return 0;
      });
    } else {
      response = list.sort(function(item1, item2){
        const name1 = item2.name.last.toLowerCase();
        const name2 = item1.name.last.toLowerCase();
        if(name1 < name2) return 1;
        else if (name1 > name2) return -1;
        else return 0;
      });
    }
    setResult([...response]); // [...variable] for creating a new array with de-constructor to trigger a re-render
  }

  return (
    <div>
      <Brandbanner />
      <br/>
      <Searchbar value={search} handleInputChange={handleInputChange} handleFormSubmit={handleFormSubmit} />
      <h5>Sort by: 
        <button className="btn btn-primary" type="button" onClick={handleBtnClicked} value="first">First Name</button>
        <button className="btn btn-primary" type="button" onClick={handleBtnClicked} value="last">Last Name</button>
      </h5>
      <br />
      <div className="container">
        <div className="row">
          <Card data={result}/>
        </div>
      </div>
    </div>
  )
}

export default App;
