import React from 'react'
import { useParams } from 'react-router-dom';

function ItemPage() {

    const { id } = useParams();
    {console.log(id)}
  return (
    <div>ItemPage</div>
  )
}

export default ItemPage