/* eslint-disable jsx-a11y/img-redundant-alt */
import React from "react";
import  "../styles/CardComponent.css";
import Card from "react-bootstrap/Card";

export default function CardComponent({ id, name, img, types }) {
  return (
    <Card className="card">
      <div class="card-title">
        <Card.Title>{id}.</Card.Title>
        <Card.Title>{name}</Card.Title>
      </div>
      <Card.Img variant="top" src={img} class="card-img-top" alt="Not image" />
      <Card.Text>
        {" "}
        type:{" "}
        {types?.map((el) => {
          return <div className="type-name">{el.name}</div>;
        })}
      </Card.Text>
    </Card>
  );
}
