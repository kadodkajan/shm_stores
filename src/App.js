// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Commisary from './components/Commisary';

//Stores

import Store from './components/Stores';
import CreateOrder from './components/Stores/createOrder';
import UpdateOrder from './components/Stores/updateorder';
import CreateStoreGuide from './components/Stores/createStoreGuide';
import ViewAllGuide from './components/Stores/viewAllGuide';
import ViewAllStoreGuide from './components/Stores/ViewAllStoreGuide';
import ViewOneGuide from './components/Stores/viewOneGuide';
import ViewOneOrder from './components/Stores/viewOneOrder';
import ViewOrders from './components/Stores/viewOrders';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/commisary" element={<Commisary />} />
          <Route path="/stores" element={<Store />} />
          <Route path="/stores/createorder" element={<CreateOrder />} />
          <Route path="/stores/vieworders" element={<ViewOrders />} />
          <Route path="/stores/updateorder" element={<UpdateOrder />} />
          <Route path="/stores/viewoneorder" element={<ViewOneOrder />} />
          <Route path="/stores/viewallguide" element={<ViewAllGuide />} />
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
