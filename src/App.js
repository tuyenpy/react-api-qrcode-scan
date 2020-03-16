import React from 'react';
import {useState} from 'react';
import axios from 'axios';
import './App.css';

function App() {
  let [state, setState] = useState({
    logs: []
  });
  const checkHistory = () => {
    axios.get(`https://express-api-demo.herokuapp.com/api/checkinHistory`)
      .then(res => {
        setState({ logs: res.data });
      })
      .catch(error => console.log(error));
  };
  const postQRcode = () => {
    axios.post('https://express-api-demo.herokuapp.com/api/qrcode/', 
    {
      id: 3
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  };
  let {logs} = state;
  console.log(state);
  return (
    <div className="App">
        <button onClick = {checkHistory}>Click here</button>
        <>
          {
            logs&&logs.map((item,index) => {
              return (
              <tr key = {index}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.date}</td>
              </tr>)
            })
          }
        </>
        <button onClick = {postQRcode}>Post QRcode</button>
    </div>
  );
}

export default App;
