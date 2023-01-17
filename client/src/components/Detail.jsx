import React from "react";
import { useEffect } from "react";
import {useDispatch, useSelector} from "react-redux"
import { 
    getDetail,
    } from "../actions/index";
import { Link } from "react-router-dom"
import Style from "../styles/Detail.css"
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'





export default function Detail(props) {

    const dispatch = useDispatch()
    const id = props.match.params.id;    

    useEffect(() => {
        dispatch(getDetail(id));    
    }, [dispatch, id]);

    const myPokemon = useSelector((state) => state.detail);

    return(
        <Container className="container-detail" fluid>
        <Row>
        <Col>
            <Link to='/home'><button class="cardBoton" id='home' >Back home </button></Link>
        </Col>
        <Col>
        <div className="detail-card">
            { 
                myPokemon.length > 0 ?
                <Row>
                        <Card.Title className="card-detail-title">
                        <h1>
                            {myPokemon[0].name}
                        </h1>
                        </Card.Title>
                        <Card.Img className="card-detail-img"
                            variant="top"  
                            src={myPokemon[0].img}
                            alt={myPokemon[0].name}
                        />
                        <Card.Text className="card-detail-text">Type:
                            {myPokemon[0].types.map(type => type.name)}
                        </Card.Text>
                        <Row>
                        <Col>
                        <Card.Text className="card-detail-text">Altura:
                            {myPokemon[0].height}
                        </Card.Text>
                        <Card.Text className="card-detail-text">Peso:
                            {myPokemon[0].weight}
                        </Card.Text>
                        <Card.Text className="card-detail-text">Vida:
                            {myPokemon[0].hp}
                        </Card.Text>
                        </Col>
                        <Col>
                        <Card.Text className="card-detail-text">Ataque:
                            {myPokemon[0].attack}
                        </Card.Text>
                        <Card.Text className="card-detail-text">Defensa:
                            {myPokemon[0].defense}
                        </Card.Text>
                        <Card.Text className="card-detail-text">Velocidad:
                            {myPokemon[0].speed}
                        </Card.Text>
                        </Col>
                        </Row>
                        
                        

                </Row>
                :
                    <div class="spinner-grow" role="status">
                    <span class="visually-hidden">Loading...</span>                    </div>
             }
             </div>
             </Col>
            </Row>
        </Container>
    )
}