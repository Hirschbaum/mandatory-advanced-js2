import React from 'react';
import './App.css';
import Navigation from './Navigation';
import axios from 'axios';

class Details extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
                title: '',
                description: '',
                director: '',
                rating: '',
        }
    }

    /*
    componentDidMount() {
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
            console.log('Errrrh, error by movie details', err);
        });
    }*/
    
    render() {
        
        return (
            <div>
                <Navigation />
                <h3>Details to the Movie {this.props.title}</h3>
                <table className="details-table">
                    <tbody>
                        <tr>
                            <th>Title</th>
                            <td>{this.props.title}</td>
                        </tr>
                        <tr>
                            <th>Director</th>
                            <td>{this.props.director}</td>
                        </tr>
                        <tr>
                            <th>Description</th>
                            <td>{this.props.description}</td>
                        </tr>
                        <tr>
                            <th>Rating</th>
                            <td>{this.props.rating}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}

export default Details;