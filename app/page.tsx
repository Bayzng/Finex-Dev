// src/App.tsx or src/pages/_app.tsx (if using Next.js with react-router-dom)
"use client"
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Dashboards/Home';
// import Wallet from './Dashboards/wallet/Wallet';




const page: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
};

export default page;
