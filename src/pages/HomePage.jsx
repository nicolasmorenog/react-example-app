import React from 'react';
import { Link } from 'react-router-dom'

const HomePage = () => {

    const padding = {
        padding: 5
    };

    return (
        <div>
            <h1>React Example App</h1>
            <nav>
                <Link style={padding} to="/anecdotes">Anecdotes</Link>
                <Link style={padding} to="/left-right">Left-Right</Link>
                <Link style={padding} to="/lista-compra">Lista Compra</Link>
                <Link style={padding} to="/part1">Part 1</Link>
                <Link style={padding} to="counter">Counter</Link>
                <Link style={padding} to="/unicafe">Unicafe</Link>
            </nav>
        </div >
    )
}

export default HomePage