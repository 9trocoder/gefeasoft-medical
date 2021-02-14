import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/HomePage/App';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import reportWebVitals from './reportWebVitals';
import firebase from './firebase';

import { BrowserRouter as Router, Switch, Route, withRouter} from 'react-router-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redex-devtools-extensions';

const store = createStore(() => {}, composeWithDevTools());

class Root extends React.Component{
  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if(user) {
        this.props.history.push('/');
      } 
    });
  }


  render() {
    return (
        <Switch>
          <Route exact path="/" component={App} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
        </Switch>
    );
  }
}


const RootWithAuth = withRouter(Root);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <RootWithAuth />
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
