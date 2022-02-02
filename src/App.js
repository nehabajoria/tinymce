import { useEffect, useState } from 'react';
import Tinymce from './Tinymce';
//import NewComponent from './Template';
import logo from "./logo.svg";
import "./App.css";

function App() {
  const [data, setData] = useState(null);

useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => {
        setData(data.message)
      });


  }, []);

  const save = (content) =>{
    console.log(content + "----");

    fetch("/edu",
    {
        method: "POST",
        body: { content: content }
    })
    .then(function(res){ return res.json(); })
    .then(function(data){ alert( JSON.stringify( data ) ) })

    // const requestOptions = {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ content: content })
    // };
    // fetch('/content', requestOptions)
    //   .then(response => response.json())
    //   .then(data => console.log);
  }

  return (
    <div className="App">
        <Tinymce save={(content) => save(content)}></Tinymce>
    </div>
  );
}

export default App;
