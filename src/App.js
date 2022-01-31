import { useEffect, useState } from 'react';
import Tinymce from './Tinymce';
import logo from "./logo.svg";
import "./App.css";

function App() {
  const [data, setData] = useState(null);

useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => {
        console.log(data.message + "--me")
        setData(data.message)
      });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>{!data ? "Loading..." : data}</p>
        <Tinymce initialValue=""/>
        <button className="my-custom-button">Button</button>

      </header>
    </div>
  );
}

export default App;
