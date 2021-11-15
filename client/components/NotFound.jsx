import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => (
  <>
    <h3>Page not found!</h3>
    <Link to="/">Return to Your Recipes</Link>
  </>
);

export default NotFound;
