import React from 'react';
import {useState} from 'react';
import axios from 'axios';
import QrReader from 'react-qr-reader';
import './App.css';

function App() {
  let [state, setState] = useState({
    logs: []
  });
  let [checkin, setChecin] = useState({user: {}});
  const checkHistory = () => {
    axios.get(`https://express-api-demo.herokuapp.com/api/checkinHistory`)
      .then(res => {
        setState({ logs: res.data });
      })
      .catch(error => console.log(error));
  };
  const postQRcode = (id) => {
    axios.post('https://express-api-demo.herokuapp.com/api/qrcode/', 
    {
      id: id
    })
    .then( res => {
      setChecin({user: res.data});
    })
    .catch(function (error) {
      console.log(error);
    });
  };
  const handleScan = data => {
    postQRcode(data);
  };
  const handleError = err => {
    console.error(err);
  };
  let {logs} = state;
  let {user} = checkin;
  return (
    <div className="App">
      <div className = "App-header">
        <p>React API QRcode Scanner</p>
      </div>

      <div className = "container">
        <div className = "leftSide">
          <div className="historyCheckin">
            {/* <button onClick = {postQRcode}>Post QRcode</button> */}
            <p>Danh sách lịch sử checkin</p>
            <div className = "listHistory">            
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
            </div>
            <button onClick = {checkHistory}>Click here</button>
          </div>  
        </div>
        <div className = "rightSide">
            <div className = "qrcode">
              <QrReader
                delay={300}
                onError={handleError}
                onScan={handleScan}
                style={{ width: '100%' }}
                />
            </div>
            <div className = "checkin">
              <p>Checkin</p>
              <ul>
                <li>ID: {user.id}</li>
                <li>Name: {user.name}</li>
                <li>Date: {user.checkin}</li>
              </ul>
            </div>
          </div>
      </div>

      <div className = "footer">
            FOOTER
      </div>
      
    </div>
  );
}

export default App;
