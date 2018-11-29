import React  from 'react';
import '../App.css';
import Routes from '../routes/routes'


const App = ()=>{
  return (
    <div className="App">
    <div className="AppContainer">
        <div className="header-container">
          <h1 className="appHeader">Ice Cream Meter</h1>
        </div>
        <main >
          <Routes />
        </main>
      </div>
    </div>
  )
}


export default App;

