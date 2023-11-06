import './App.css';
import React, { useState } from 'react';
import { QueryClientProvider, QueryClient } from "@tanstack/react-query"
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './pages/Header/Header.tsx';
import HomePage from './pages/HomePage/HomePage.tsx';
import CountryDetail from './pages/CountryDetail/CountryDetail.tsx';
import { useMediaQuery } from "@mui/material";
import HomePageMobile from './pages/HomePage/HomePageMobile.tsx';
import CountryDetailMobile from './pages/CountryDetail/CountryDetailMobile.tsx';
import { LightModeProvider } from './context/LightModeContext';






const App = () => {

  const queryClient = new QueryClient();
  const [lightModeEnabled, setLightModeEnabled] = useState(false);
  const isDesktop = useMediaQuery('(min-width:700px)');


  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <LightModeProvider>
          <div className="App">
            <Header />
            <Routes>
              <Route exact path='/' element={isDesktop ? <HomePage /> : <HomePageMobile />} />
              <Route path='/:id' element={isDesktop ? <CountryDetail /> : <CountryDetailMobile />} />
            </Routes>
          </div>
        </LightModeProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;
