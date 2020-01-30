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
            search: '',
            error: false,
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

    renderTableData() { //filter should be first, to be able map it through after filtering
        return this.state.movies
        .filter(movie => {
            if (
                movie.title.toLowerCase().includes(this.state.search.toLowerCase())
            ) {
                return (
                    <tr key={movie.id}>
                    <td style={{ width: '30%' }}>{movie.title}</td>
                    <td style={{ width: '30%' }}>{movie.director}</td>
                    <td style={{ width: '10%' }}>{movie.rating}</td>

                    <td style={{ width: '10%' }}>
                        <button key={movie.id}>
                            <Link className='link-button' to={'/movie-details/' + movie.id}>More</Link>
                        </button>
                    </td>

                    <td style={{ width: '10%' }}>
                        <button key={movie.id}>
                            <Link className='link-button' to={'/edit/' + movie.id}>Edit</Link>
                        </button>
                    </td>

                    <td style={{ width: '10%' }}>
                        <button
                            className='delete-button' key={movie.id}
                            onClick={() => this.onDelete(movie.id)}>Delete
                        </button>
                    </td>
                </tr>
                );
            } else {
                return null;
            }
        })
        .map((movie) => {
            const { id, title, director, rating } = movie
            return (
                <tr key={id}>
                    <td style={{ width: '30%' }}>{title}</td>
                    <td style={{ width: '30%' }}>{director}</td>
                    <td style={{ width: '10%' }}>{rating}</td>

                    <td style={{ width: '10%' }}>
                        <button key={id}>
                            <Link className='link-button' to={'/movie-details/' + id}>More</Link>
                        </button>
                    </td>

                    <td style={{ width: '10%' }}>
                        <button key={id}>
                            <Link className='link-button' to={'/edit/' + id}>Edit</Link>
                        </button>
                    </td>

                    <td style={{ width: '10%' }}>
                        <button
                            className='delete-button' key={id}
                            onClick={() => this.onDelete(id)}>Delete
                        </button>
                    </td>
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
                this.setState({error: true})
            })
    }

    updateSearch = (e) => {
        this.setState({ search: e.target.value })
    }

    render() {
        let errMessage;
        if(this.state.error) {
            errMessage = 'Error: movie could not be deleted or has been already deleted';
        } else {
            errMessage ='';
        }

        return (
            <div>
                {
                    this.state.redirect && <Redirect to='/' />
                }

                <Helmet>
                    <title>Movies</title>
                </Helmet>

                <Navigation />

                <h3>Movies</h3>

                <input
                    type='text'
                    placeholder='Search film...'
                    value={this.state.search}
                    onChange={this.updateSearch} />
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
                <br/>
                <p>{errMessage}</p>
            </div>
        )
    }
}

export default Home;