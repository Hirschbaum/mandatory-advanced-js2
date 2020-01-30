import React from 'react';
import './App.css';
import Navigation from './Navigation';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import { Link } from 'react-router-dom';

class Details extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
                title: '',
                description: '',
                director: '',
                rating: '',
                id: '',
        }
    }
    
    componentDidMount() {
        this.getMovieDetails();
    }
    
    getMovieDetails() {
        let id = this.props.match.params.id; //to route id from Home
        axios.get('http://3.120.96.16:3001/movies/' + id)
        .then(response => {
            //console.log('Movie', response);
            this.setState({title: response.data.title})
            this.setState({director: response.data.director})
            this.setState({description: response.data.description})
            this.setState({rating: response.data.rating})
            this.setState({id: response.data.id})
        })
        .catch(err => {
            console.log('Error by movie details', err);
        });
    }

    render() {
        
        return (
            <div>
                <Navigation />

                <Helmet>
                    <title>{this.state.title}</title>
                </Helmet>

                <h3>Details to the Movie {this.state.title}</h3>
                <table className="details-table">
                    <tbody>
                        <tr>
                            <th>Title</th>
                            <td>{this.state.title}</td>
                        </tr>
                        <tr>
                            <th>Director</th>
                            <td>{this.state.director}</td>
                        </tr>
                        <tr>
                            <th>Description</th>
                            <td>{this.state.description}</td>
                        </tr>
                        <tr>
                            <th>Rating</th>
                            <td>{this.state.rating}</td>
                        </tr>
                    </tbody>
                </table>
                <button key={this.state.id} className='edit-button'>
                        <Link className='link-button link-edit'  to={'/edit/' + this.props.match.params.id}>Edit</Link>
                </button>
            </div>
        )
    }
}

export default Details;