//import { useState } from 'react';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login  from './pages/Login';
//import SlidablePage from './pages/podcast';
import Feed from './pages/Feed';
import Dashboard from './pages/Dashboard.tsx';
import Settings from './components/dashboard/setting/settings';
const routes = createBrowserRouter(
    createRoutesFromElements(
        <Route>
            <Route index element={<Home />} />
            <Route path='signup'  element={<Signup />} />
            <Route path='login'  element={<Login />} />
            <Route path='dashboard'  element={<Dashboard />} />
            <Route path='feeds' element={<Settings />} />
        </Route>
    )
)
function App() {
  return (
    <RouterProvider router={routes} />
  );
}
export default App
