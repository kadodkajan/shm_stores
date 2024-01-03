// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';

//Stores

import Store from './components/Stores';
import CreateOrder from './components/Stores/createOrder';
import UpdateOrder from './components/Stores/updateorder';
import CreateStoreGuide from './components/Stores/createStoreGuide';
import ViewAllStoreGuide from './components/Stores/ViewAllStoreGuide';
import ViewOneGuide from './components/Stores/viewOneGuide';
import ViewOneOrder from './components/Stores/viewOneOrder';
import ViewOrders from './components/Stores/viewOrders';
//Commisary
import Commisary from './components/Commisary';
import ComTeam from './components/Commisary/comteam';
import ProductCategory from './components/Commisary/productcategory';
import Products from './components/Commisary/products';
function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/commisary" element={<Commisary />} />
          <Route path="/commisary/comteam" element={<ComTeam />} />
          <Route path="/commisary/procategory" element={<ProductCategory />} />
          <Route path="/commisary/products" element={<Products />} />

          //Stores
          <Route path="/stores" element={<Store />} />
          <Route path="/stores/createorder" element={<CreateOrder />} />
          <Route path="/stores/vieworders" element={<ViewOrders />} />
          <Route path="/stores/updateorder" element={<UpdateOrder />} />
          <Route path="/stores/viewoneorder" element={<ViewOneOrder />} />
          <Route path="/stores/viewoneguide" element={<ViewOneGuide />} />
          
          <Route path="/stores/createstoreguide" element={<CreateStoreGuide />} />
          <Route path="/stores/viewallstoreguide" element={<ViewAllStoreGuide />} />





          <Route path="/" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
