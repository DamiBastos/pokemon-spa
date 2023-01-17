import React from "react";
import { Link } from "react-router-dom";

export default function LandingPage() {

    return(
        <div>
            <h1>PokeApp</h1>
            <h4>Catch and Create your Pokemon!!</h4>
            <div>
                <Link to="./home">
                    <button>LET´s GO</button>
                </Link>
            </div>
        </div>
    );
}