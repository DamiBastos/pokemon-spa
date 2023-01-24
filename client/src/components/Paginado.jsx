import React from 'react';
import Style from '../styles/Pagination.css'
import Pagination from 'react-bootstrap/Pagination';


export default function Paginado ({pokePerPage, allPokemons, paginado}) {
  const pageNumbers = []

  for ( let i=1; i<=Math.ceil(allPokemons/pokePerPage); i++){
    pageNumbers.push(i)
  }
  
  return (
<Pagination>        

{ pageNumbers && 
        pageNumbers.map(number =>(
          <Pagination.Item className='button-pag' key={number}>
          <a onClick={() => paginado(number)}>{number}</a>
          </Pagination.Item>
        ))}
    </Pagination>
  )
}
