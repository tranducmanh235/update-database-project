import './App.css';
import {BrowserRouter as Router, Route, Switch,Link} from 'react-router-dom'
import Home from './components/views/Home'
import Signin from './components/views/Signin'
import ManagerContextProvider from './components/contexts/ManagerContext'
import FoodContextProvider from './components/contexts/FoodContext';

function App() {

  return (
    
    <Router>    
      <ManagerContextProvider>
        <FoodContextProvider>         
            
            <Switch>
              <Route exact path='/' component={Home} />
              <Route exact path='/signin' component={Signin} />

            </Switch>
          
        </FoodContextProvider>
      </ManagerContextProvider>
    </Router>
  );
}

export default App;
