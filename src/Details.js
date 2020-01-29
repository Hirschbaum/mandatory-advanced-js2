import React from 'react';
import './App.css';
import Navigation from './Navigation';
import { Helmet } from 'react-helmet';
import axios from 'axios';

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
    
    /*getMovieDetails = () => {
        this.setState({ title: this.props.title })
        this.setState({ director: this.props.director })
        this.setState({ description: this.props.description })
        this.setState({ rating: this.props.rating })
    }*/

    
    getMovieDetails() {
        let id = this.props.match.params.id; //to route id from Home
        axios.get('http://3.120.96.16:3001/movies/' + id)
        .then(response => {
            console.log('Movie', response);
            this.setState({title: response.data.title})
            this.setState({director: response.data.director})
            this.setState({description: response.data.description})
            this.setState({rating: response.data.rating})
        })
        .catch(err => {
            console.log('Error by movie details', err);
        });
    }

    render() {
        console.log(this.props.location.state);

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
            </div>
        )
    }
}

export default Details;