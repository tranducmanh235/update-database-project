import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Home from './components/views/Home'
import Signin from './components/views/Signin'
import Signup from './components/views/Signup'
import Cart from './components/views/Cart'
import Order from './components/views/Order'
import UserContextProvider from './components/contexts/UserContext'
import FoodContextProvider from './components/contexts/FoodContext'
import OrderContextProvider from './components/contexts/OrderContext';

function App() {
  return (
    <UserContextProvider>
      <FoodContextProvider>
        <OrderContextProvider>
            <Router>
              <Switch>
                <Route exact path='/' component={Home} />
                <Route exact path='/signin' component={Signin} />
                <Route exact path='/signup' component={Signup} />
                <Route exact path='/cart' component={Cart} />
                <Route exact path='/order' component={Order} />
              </Switch>
            </Router>
          </OrderContextProvider>
      </FoodContextProvider>
    </UserContextProvider>
    
  );
}

export default App;
