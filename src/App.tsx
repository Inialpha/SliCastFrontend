//import { useState } from 'react';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login  from './pages/Login';
//import Dashboard from './pages/Dashboard';
//import SlidablePage from './pages/podcast';
import Feed from './pages/Feed';
//import Dashboard from './components/dashboard';
import Dashboard from './pages/tem.tsx';

const routes = createBrowserRouter(
    createRoutesFromElements(
        <Route>
            <Route path='/' element={<Home />} />
            <Route path='signup'  element={<Signup />} />
            <Route path='login'  element={<Login />} />
            <Route path='dashboard'  element={<Dashboard />} />
            <Route path='feeds' element={<Feed />} />
        </Route>
    )
)
function App() {
  return (
    <RouterProvider router={routes} />
  );
}
export default App
