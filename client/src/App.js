import './App.css';
import React, { useEffect, useState } from "react";
import Chat from '../src/components/Chat'
import 'materialize-css/dist/css/materialize.min.css'
import M from "materialize-css/dist/js/materialize.min.js";
import Login from '../src/components/Login'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import List from './components/List';
import Pusher from 'pusher-js'


function App() {

  const [pusher, setPusher] = useState()

  useEffect(() => {
    M.AutoInit();
  }, []);

  useEffect(() => {
    setPusher(new Pusher('b48cb6e685ac70d70a56', {
      cluster: 'ap2'
    }))
    console.log(1)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Router>
      {pusher && <div className="App">
        <Route exact path='/' component={Login} />
        <Route exact path='/chat' component={() => <Chat pusher={pusher} />} />
        <Route exact path='/list' component={List} />
      </div>}
    </Router>
  );
}

export default App;
