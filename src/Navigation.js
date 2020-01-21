import React from 'react';
import './App.css';
import { Link } from 'react-router-dom';

class Navigation extends React.Component {
    render() {
        return(
            <nav>
                <Link className='links' to='/'>Home</Link>
                <Link className='links' to='/addmovie'>Add Movie</Link>
            </nav>
        )
    }
}

export default Navigation;