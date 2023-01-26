import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDetail, cleanDetail } from "../actions/index";
import { Link } from "react-router-dom";
import "../styles/Detail.css";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function Detail(props) {
  const dispatch = useDispatch();
  const id = props.match.params.id;
  const next = parseInt(props.match.params.id) + parseInt(1);
  const back =
    parseInt(props.match.params.id) >= 1
      ? parseInt(props.match.params.id) - parseInt(1)
      : parseInt(props.match.params.id);

  useEffect(() => {
    dispatch(getDetail(id));
    dispatch(cleanDetail());
  }, [dispatch, id]);

  const myPokemon = useSelector((state) => state.detail);

  return (
    <Container className="container-detail" fluid>
      <Row>
        <Col>
          <div className="button-sector">
            <Link to="/home">
              <button class="cardBoton" id="home">
                Back home{" "}
              </button>
            </Link>
            <Link to={"/home/" + next} style={{ textDecoration: "none" }}>
              <button class="cardBoton" id="next">
                Next{" "}
              </button>
            </Link>
            <Link to={"/home/" + back} style={{ textDecoration: "none" }}>
              <button class="cardBoton" id="next">
                Back{" "}
              </button>
            </Link>
          </div>
        </Col>
        <Col>
          <div className="detail-card">
            {myPokemon.length > 0 ? (
              <Row>
                <div className="fila1">
                  <Card.Img
                    className="card-detail-img"
                    variant="top"
                    src={myPokemon[0].img}
                    alt={myPokemon[0].name}
                  />
                  <div className="name-type">
                    <div className="card-detail-title">{myPokemon[0].name}</div>
                    <div className="card-type-text">
                      Type:
                      {myPokemon[0].types.map((type) => (
                        <div>{type.name}</div>
                      ))}
                    </div>
                  </div>
                </div>
                <Row>
                  <div className="card-detail-text-container">
                    <Col>
                      <div className="card-detail-text">
                        <h3>Altura:</h3>
                        <div className="envolt-barra">
                          <div
                            style={{
                              background: "orange",
                              width: `${myPokemon[0].height}%`,
                              "border-radius": "1rem 0rem 0rem 1rem",
                            }}
                          ></div>
                          {myPokemon[0].height}
                        </div>
                      </div>
                      <div className="card-detail-text">
                        <h3>Peso:</h3>
                        <div className="envolt-barra">
                          <div
                            style={{
                              background: "green",
                              width: `${myPokemon[0].weight}%`,
                              "border-radius": "1rem 0rem 0rem 1rem",
                            }}
                          ></div>
                          {myPokemon[0].weight}
                        </div>
                      </div>
                      <div className="card-detail-text">
                        <h3>Vida:</h3>
                        <div className="envolt-barra">
                          <div
                            style={{
                              background: "blue",
                              width: `${myPokemon[0].hp}%`,
                              "border-radius": "1rem 0rem 0rem 1rem",
                            }}
                          ></div>
                          {myPokemon[0].hp}
                        </div>
                      </div>
                    </Col>
                    <Col>
                      <div className="card-detail-text">
                        <h3>Ataque:</h3>
                        <div className="envolt-barra">
                          <div
                            style={{
                              background: "red",
                              width: `${myPokemon[0].attack}%`,
                              "border-radius": "1rem 0rem 0rem 1rem",
                            }}
                          ></div>
                          {myPokemon[0].attack}
                        </div>
                      </div>
                      <div className="card-detail-text">
                        <h3>Defensa:</h3>
                        <div className="envolt-barra">
                          <div
                            style={{
                              background: "yellow",
                              width: `${myPokemon[0].defense}%`,
                              "border-radius": "1rem 0rem 0rem 1rem",
                            }}
                          ></div>
                          {myPokemon[0].defense}
                        </div>
                      </div>
                      <div className="card-detail-text">
                        <h3>Velocidad:</h3>
                        <div className="envolt-barra">
                          <div
                            style={{
                              background: "grey",
                              width: `${myPokemon[0].speed}%`,
                              "border-radius": "1rem 0rem 0rem 1rem",
                            }}
                          ></div>
                          {myPokemon[0].speed}
                        </div>
                      </div>
                    </Col>
                  </div>
                </Row>
              </Row>
            ) : (
              <div className="container-spinner">
                <div className="container-icon"></div>
                {/* <div class="spinner-grow" role="status">
                    <span class="visually-hidden">Loading...</span>                    
                    </div> */}
              </div>
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
}
