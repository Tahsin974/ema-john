
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './Components/Header/Header';
import Shop from './Components/Shop/Shop';
import OrderReview from './Components/OrderReview/OrderReview';
import Inventory from './Components/Inventory/Inventory';
import NotFound from './Components/NotFound/NotFound';
import PlaceOrder from './Components/PlaceOrder/PlaceOrder';
import Login from './Components/Login/Login/Login';
import PrivateRoute from './privateRoute/PrivateRoute';
import Shipping from './Components/Shipping/Shipping';





function App() {
  return (
    <div >
      
      <BrowserRouter>
          <Header></Header>
          <Routes>
              <Route path='/' element ={<Shop></Shop>}/>
              <Route path='/shop' element ={<Shop></Shop>}/>
              <Route path='/review' element ={<PrivateRoute>
                <OrderReview></OrderReview>
              </PrivateRoute>}/>
              <Route path='/inventory' element ={<Inventory></Inventory>}/>
              <Route path='/placeOrder' element ={<PlaceOrder></PlaceOrder>}/>
              <Route path='/login' element ={<Login></Login>}/>
              <Route path='/shipping' element ={<Shipping></Shipping>}/>
              <Route path='*' element ={<NotFound></NotFound>}/>
          </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
