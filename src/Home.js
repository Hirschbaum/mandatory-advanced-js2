import React from 'react';
import './App.css';
import Navigation from './Navigation';
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';
import { Helmet } from 'react-helmet';

class Home extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            movies: [],
            redirect: false,
        }
    }

    componentDidMount() {
        axios.get('http://3.120.96.16:3001/movies')
            .then(response => {
                this.setState({ movies: response.data });
                console.log(response.data);
            })
            .catch(err => {
                console.log('Errrrh, error', err);
            });
    }

    renderTableData() {
        return this.state.movies.map((movie) => {
            const { id, title, director, rating } = movie
            return (
                <tr key={id}>
                    <td>{title}</td>
                    <td>{director}</td>
                    <td>{rating}</td>
                    <td><button key={id}>
                        <Link className='link-button' to={'/movie-details/' + id}>Details</Link>
                    </button></td>

                    <td><button key={id}>
                        <Link className='link-button' to={'/edit/' + id}>Edit</Link>
                    </button></td>
                    <td><button className='link-button' onClick={() => this.onDelete(id)}>Delete</button></td>
                </tr>
            )
        })
    }

    onDelete(id) {
        axios.delete('http://3.120.96.16:3001/movies/' + id)
            .then(() => {

                const movies = this.state.movies.filter(movie => movie.id !== id); //returns movies without that one id
                this.setState({ movies }) //updates movies[] state with const movies from here
            })
            .catch(err => {
                console.log('Update failed', err)
            })
    }

    render() {

        return (
            <div>
                {
                    this.state.redirect && <Redirect to='/' />
                }

                <Helmet>
                    <title>Movies</title>
                </Helmet>

                <Navigation />

                <h3>Home Page</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Director</th>
                            <th>Rating</th>
                            <th>Details</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderTableData()}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default Home;