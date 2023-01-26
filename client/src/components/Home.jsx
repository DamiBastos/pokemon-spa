import React from "react";
import { useEffect, useState } from "react";
import {useDispatch, useSelector} from "react-redux"
import { 
    getPokemons, 
    getPokemonName,
    getDetail,
    getTypes,
    sortByName,
    filterTypes
    } from "../actions/index";
import { Link } from "react-router-dom";
import CardComponent from "./CardComponent"
import Paginado from "./Paginado"
import SearchBar from "./SearchBar";
import "../styles/Home.css"
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'
import Accordion from 'react-bootstrap/Accordion';
import { useAccordionButton } from 'react-bootstrap/AccordionButton';
import Card from 'react-bootstrap/Card';







export default function Home() {

    const dispatch = useDispatch()
    const allPokemons = useSelector ((state) => state.pokemons)
    const allTypes = useSelector((state) => state.types);
    const allTypesFilt = allTypes.filter(poke => poke.name !== "unknown")


    const [currentPage, setCurrentPage] = useState(1); // En una constante me guardo el estado local actual y la otra me setea el estado actual. El state inicial es 1 porque empiezo en la primer página.
    const [pokePerPage, /*_setPokesPerPage*/] = useState(12); // Me guardo cuantos perros quiero por página.
    const indexOfLastPoke = currentPage * pokePerPage; // El índice del último perro de cada página va a ser el numero de la página multiplicado por la cantidad de perros por página.
    const indexOfFirstPoke = indexOfLastPoke - pokePerPage; // El índice del primer perro de cada página va a ser el índice del último de esa página menos la cantidad de perros por página.
    const currentPoke = allPokemons.slice(indexOfFirstPoke, indexOfLastPoke);

    const [/*_orden*/, setOrden] = useState(''); // Estado local que me sirve para modificar el estado cuando ordeno y renderizar los perros ordenados como quiero.

    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber);
    }

    useEffect(() => {
        dispatch(getPokemons())
    }, [dispatch])

    useEffect(() => {
        dispatch(getTypes())
    }, [dispatch])


    function handleClick(e) {
        e.preventDefault();
        setCurrentPage(1);
        dispatch(getPokemons())
    }

    function handleFilterTypes(e) {
        e.preventDefault();
        setCurrentPage(1);
        dispatch(filterTypes(e.target.value))
    }

    function handleSortByName(e) {
        e.preventDefault();
        dispatch(sortByName(e.target.value));
        setCurrentPage(1);
        setOrden(`Ordered ${e.target.value}`);
    }

    //----prueba dropdown
    function CustomToggle({ children, eventKey }) {
        const decoratedOnClick = useAccordionButton(eventKey, () =>
          console.log('totally custom!'),
        );
      
        return (
            <div className="container-button">
          <button
            className="menu-icon"
            type="button"
            onClick={decoratedOnClick}
          >
            {children}
          </button>
          </div>
        );
      }

    //-----


    return(
        <Container className="container-home" fluid>
        <Row>
        <Col md="auto">
        {/* <div className="prueba-menu">
        <div className="oculto">
        <div className="side-menu">
                                    <button className="all-button"  onClick={e => {handleClick(e)}}>
                                        Reloaded pokemons
                                    </button>
                                    <select className="select-button" defaultValue="button" onChange={e => handleSortByName(e)}>
                                        <option className="select-option" value= "button" disabled>Order</option>
                                        <option className="select-option" value= "all">Default</option>
                                        <option className="select-option" value= "asc">Ascendente</option>
                                        <option className="select-option" value= "desc">Descendente</option>
                                    </select>
                                    <select className="select-button" defaultValue="filter" onChange={e => handleFilterTypes(e)} >
                                    <option className="select-option" value= "filter" disabled>Filter type:</option>

                                        <option className="select-option" key={0} value='all'>All types</option>
                                            {allTypesFilt.map(el => {
                                                return (
                                        <option className="select-option" key={el.id} value={el.name}>{el.name}</option>
                                                            )
                                                    }) 
                                            }    
                                    </select>
                                    
                                    </div>
        </div>
        <div className="ocultar">
        <div className="menu-icon"></div>
         </div>
        </div> */}
        {/* prueba dropdown */}
        <Accordion defaultActiveKey="0">
          <CustomToggle eventKey="0"></CustomToggle>
        <Accordion.Collapse eventKey="0">
          <div className="side-menu" >
          <button className="all-button"  onClick={e => {handleClick(e)}}>
                                        Reloaded pokemons
                                    </button>
                                    <select className="select-button" defaultValue="button" onChange={e => handleSortByName(e)}>
                                        <option className="select-option" value= "button" disabled>Order</option>
                                        <option className="select-option" value= "all">Default</option>
                                        <option className="select-option" value= "asc">Ascendente</option>
                                        <option className="select-option" value= "desc">Descendente</option>
                                    </select>
                                    <select className="select-button" defaultValue="filter" onChange={e => handleFilterTypes(e)} >
                                    <option className="select-option" value= "filter" disabled>Filter type:</option>

                                        <option className="select-option" key={0} value='all'>All types</option>
                                            {allTypesFilt.map(el => {
                                                return (
                                        <option className="select-option" key={el.id} value={el.name}>{el.name}</option>
                                                            )
                                                    }) 
                                            }    
                                    </select>
                                    </div>
                                    
        </Accordion.Collapse>
 
    </Accordion>



        </Col>
        <Col className="col-right">
        <div className="nav-bar-title">
            <h1 className="title">Pokémon APP</h1>
            <div className="search"><SearchBar /></div>
            </div>
        <Row>
            <Col className="paginado">
        <Paginado 
        pokePerPage={pokePerPage} allPokemons={allPokemons.length} paginado={paginado} 
        />
        </Col>
        </Row>

        <Row >
            
            <div className="cards" > 
                {
                // eslint-disable-next-line array-callback-return
                currentPoke.length > 0 ? currentPoke.map((poke) =>{
                    return(
                        <div  key={poke.id}>
                        
                        <Link  to={'/home/' + poke.id} style={{ textDecoration: 'none' }} >
                        <CardComponent
                            id={poke.id}
                            name={poke.name} 
                            img={poke.img}
                            
                            types={poke.types ? poke.types : "not type"}
                        />
                        
                        </Link>
                        
                        </div>
                        )
                    }) : 
                    <div className="container-waiting"><div className="container-spinner-home">
                <div className="container-icon-home"></div>

                </div>
                </div>
                }
                
                
                </div>
                
                </Row>
                
        </Col>
        </Row>
        </Container>
    )
}