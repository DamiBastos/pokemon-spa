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
import Style from "../styles/Home.css"
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Accordion from 'react-bootstrap/Accordion';
import CardGroup from 'react-bootstrap/CardGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';
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


    return(
        <Container className="container-home" fluid>
        <Row>
        <Col md="auto" className="menu">
                <Navbar className="navbar">
                    <Accordion  defaultActiveKey={['0']} alwaysOpen> 
                        <Accordion.Item><Accordion.Button className="accordion-btn" >
                        </Accordion.Button>
                        <Accordion.Body className="accordion-body">
                            <Container className="container-menu">
                                <Nav className="flex-column">
                                    <Button className="dropdownToggle"  variant="secondary" onClick={e => {handleClick(e)}}>
                                        Reloaded pokemons
                                    </Button>
                                    <Dropdown>
                                    <Dropdown.Toggle className="dropdownToggle"  variant="secondary" id="dropdown-variants-Secondary">
                                        Sort pokemons by name
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu defaultValue="Sort pokemons by name"onChange={e => handleSortByName(e)}>
                                        <Dropdown.Item value= "all">Default</Dropdown.Item>
                                        <Dropdown.Item value= "asc">Ascendente</Dropdown.Item>
                                        <Dropdown.Item value= "desc">Descendente</Dropdown.Item>
                                    </Dropdown.Menu>
                                    </Dropdown>
                                    <Dropdown >
                                    <Dropdown.Toggle className="dropdownToggle" variant="secondary" id="dropdown-variants-Secondary">
                                        Filter by types
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu  onChange={e => handleFilterTypes(e)} >
                                        <Dropdown.Item key={0} value='all'>All types</Dropdown.Item>
                                            {allTypesFilt.map(el => {
                                                return (
                                        <Dropdown.Item key={el.id} value={el.name}>{el.name}</Dropdown.Item>
                                                            )
                                                    }) 
                                            }    
                                    </Dropdown.Menu>
                                    </Dropdown>
                                    <Dropdown >
                                    <Dropdown.Toggle className="dropdownToggle" variant="secondary" id="dropdown-variants-Secondary">
                                        Filter by created
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu >
                                        <Dropdown.Item value= "all">Todos</Dropdown.Item>
                                        <Dropdown.Item value= "api">Existentes</Dropdown.Item>
                                        <Dropdown.Item value= "created">Creados</Dropdown.Item>
                                    </Dropdown.Menu>
                                    </Dropdown>
                                    <Link to='/pokemons'>new</Link>
                                </Nav>
                            </Container>
                        </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                </Navbar> 
        </Col>
        <Col>
            <h1 className="title">Pokémon APP</h1>
        </Col>
        <Row>
            <Col className="paginado">
        <Paginado 
        pokePerPage={pokePerPage} allPokemons={allPokemons.length} paginado={paginado} 
        />
        </Col>
        </Row>
        <Container>

        <Row >
            
            <Col  className="cards" > 
                {
                // eslint-disable-next-line array-callback-return
                currentPoke?.map((poke) =>{
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
                    })
                }
                
                </Col>
                
                </Row>
                
        </Container>
        </Row>

        </Container>
    )
}