import React from 'react';
import { useSelector } from 'react-redux';

function Catalog() {
    const catalog = useSelector(state => state);
  
    console.log(catalog);
    return (
    <h1>Olá</h1>
  );
}

export default Catalog;
