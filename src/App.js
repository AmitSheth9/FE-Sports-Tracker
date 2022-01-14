
import './App.css';
import BetInputForm from './Views/BetForm/BetInputForm';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './Views/Auth/Login';
import Signup from './Views/Auth/Signup';
import { UserProvider } from './context/AuthContext'
import BetData from './Views/BetAnalysis/BetData';

function App() {
  return (

<UserProvider>
    <Router>
      <Switch>
        <Route exact path = '/'>
          <BetInputForm/>
        </Route>
        <Route path='/betdata' >
          <BetData />
        </Route>
        <Route path = '/login'>
          <Login />
        </Route>
        <Route path='/signup'>
          <Signup />
        </Route>
      </Switch>
    </Router>
</UserProvider>
      
    
  );
}

export default App;
