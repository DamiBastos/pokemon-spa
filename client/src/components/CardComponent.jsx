/* eslint-disable jsx-a11y/img-redundant-alt */
import React from "react";
import Style from "../styles/CardComponent.css"
import Card from 'react-bootstrap/Card';

export default function CardComponent({id, name, img, types}){
    return(
        <Card className="card" style={{ width: '15rem' }} >
        <div class="card-title">
        <Card.Title>
            {id}.
        </Card.Title>
        <Card.Title>
            {name}
        </Card.Title>
        </div>
        <Card.Img variant="top"  src={img} class="card-img-top" alt="Not image" />
            <Card.Text>type: {
                    types?.map((el) => {
                        return (
                            <div>
                            {el.name} 
                            </div>
                        )
                    })
                }
            </Card.Text>
        </Card>
    )
}