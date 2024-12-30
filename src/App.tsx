//import { useState } from 'react';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login  from './pages/Login';
//import SlidablePage from './pages/podcast';
import Feed from './pages/Feed';
import Dashboard from './pages/Dashboard.tsx';
import PodcastCreator from './pages/PodcastCreator2';
import EnhancedStorySlideCreator from './pages/PodcastCreator';
import Profile from './components/dashboard/Profile';
import PodcastViewPage from './pages/PodcastViewPage';
import PodcastEditPage from './pages/PodcastUpdatePage';
import PodcastDisplay from '@/pages/PodcastDisplay'
const routes = createBrowserRouter(
    createRoutesFromElements(
        <Route>
            <Route index element={<Home />} />
            <Route path='signup'  element={<Signup />} />
            <Route path='login'  element={<Login />} />
            <Route path='dashboard'  element={<Dashboard />} />
            <Route path='feeds' element={<Feed />} />
            <Route path='new' element={<PodcastCreator />} />
            <Route path='profile' element={<Profile />} />
            <Route path='podcast' element={<PodcastDisplay />} />
            <Route path='edit' element={<PodcastEditPage />} />
        </Route>
    )
)
function App() {
  return (
    <RouterProvider router={routes} />
  );
}
export default App
