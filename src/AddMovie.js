import React from 'react';
import './App.css';
import Navigation from './Navigation';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { Helmet } from 'react-helmet';

class AddMovie extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
                title: '',
                description: '',
                director: '',
                rating: '',
                redirect: false,
                id: '',
        }
    }

    onTitle = (e) => {
        this.setState({title: e.target.value});
    }

    onDescription = (e) => {
        this.setState({description: e.target.value});
    }

    onDirector = (e) => {
        this.setState({director: e.target.value});
    }

    onRating = (e) => {
        this.setState({rating: e.target.value});
    }

    onSubmit = (e) => {
        e.preventDefault();
        axios.post('http://3.120.96.16:3001/movies', 
            {
                title: this.state.title, 
                description: this.state.description,
                director: this.state.director,
                rating: this.state.rating,
            })
        .then(response => {
            this.setState({redirect: true, id: response.data.id})
        })
        .catch(err => {
                console.log('Error, nothing added to the list', err);
        });
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to={`/movie-details/${this.props.match.params.id}`} />
        }

        return (
            <div>
               {/* { this.state.redirect && <Redirect to={`/movie-details/${this.props.match.params.id}`}/>
                       {{
                            pathname: ,
                            state: this.state,
                            title: this.state.title,
                            director: this.state.director,
                            description: this.state.description,
                            rating: this.state.rating,
                            id: this.state.id,
                            
                        }}/>
            }*/}

                <Helmet>
                    <title>Add Movie</title>
                </Helmet>
                <Navigation />
                <h3> Adding Movie to the List</h3>
                <form onSubmit={this.onSubmit}> 
                    <input 
                    title={this.state.title}
                    onChange={this.onTitle} 
                    type='text' placeholder='Title'
                    minLength='1' maxLength='40'/>

                    <textarea 
                    description={this.state.description} 
                    onChange ={this.onDescription} 
                    placeholder='Movie description'
                    minLength='1' maxLength='300'></textarea>

                    <input director= {this.state.director} 
                    onChange={this.onDirector} 
                    type='text' placeholder='Director'
                    minLength='1' maxLength='40'/>

                    <input 
                    rating={this.state.rating} 
                    onChange={this.onRating} 
                    type='number' 
                    placeholder='Number 0.0 - 5.0' 
                    min='0' max='5' step='0.1'/>

                    <input type='submit' value='Add To List'/>
                </form>
            </div>
        )
    }
}

export default AddMovie;