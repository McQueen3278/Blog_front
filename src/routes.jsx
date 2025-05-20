// routes.jsx
import { Route } from 'react-router-dom';
import CourseDetails from './components/CourseDetails'; 
import Home from './components/Home';

export const routes = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/courses/:id",
    element: <CourseDetails />,
  },
];
