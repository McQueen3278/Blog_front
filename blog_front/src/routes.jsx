// routes.jsx
import { Route } from 'react-router-dom';
import CourseDetails from './components/CourseDetails'; 

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
