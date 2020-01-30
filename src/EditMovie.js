import React from 'react';
import './App.css';
import Navigation from './Navigation';
import axios from 'axios';
import Helmet from 'react-helmet';
import { Redirect } from 'react-router-dom';

class EditMovie extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
                title: '',
                description: '',
                director: '',
                rating: '',
                redirect: false,
                id: '',
                error: false,
        }
    }

    componentDidMount() {
        this.getMovie();
    }

    getMovie = () => { //to get the movie details from server
        let id = this.props.match.params.id
        axios.get('http://3.120.96.16:3001/movies/' + id)
        .then(response => {
            console.log('Movie GET: ', response);
            this.setState({title: response.data.title})
            this.setState({director: response.data.director})
            this.setState({description: response.data.description})
            this.setState({rating: response.data.rating})
        })
        .catch(err => {
            console.log('Eh, error by getting movie for Editing.js', err);
            this.setState({error: true})
        });
    }

    onChangeTitle = (e) => {
        this.setState({title: e.target.value});
    }

    onChangeDescription = (e) => {
        this.setState({description: e.target.value});
    }

    onChangeDirector = (e) => {
        this.setState({director: e.target.value});
    }

    onChangeRating = (e) => {
        this.setState({rating: e.target.value});
    }

    onSubmit = (e) => { //o sSubmit: PUT, which updates the clicked movie on the server
        e.preventDefault();
        axios.put('http://3.120.96.16:3001/movies/' + this.props.match.params.id, 
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
                console.log('Error, movie not edited', err);
                this.setState({error: true})
        });
    }

    render() {
        let errMessage;
        //console.log(this.state.error);

        if (this.state.error) {
            errMessage = 'Error: movie can not be saved';
        } else {
            errMessage = '';
        };

        if (this.state.redirect) {
            return <Redirect to='/'/>
        }

        return(
            <div>
                <Helmet>
                    <title>Edit Movie</title>
                </Helmet>

                <Navigation />

                <h3>Edit a Movie from the List</h3>

                <form onSubmit={this.onSubmit}> 
                    <input 
                    name='title'
                    value={this.state.title}
                    onChange={this.onChangeTitle}                    
                    type='text'
                    />
                    
                    <textarea 
                    name='description'
                    value={this.state.description} 
                    onChange={this.onChangeDescription}                    
                    minLength='1' maxLength='300'
                    ></textarea>
                    
                    <input 
                    name='director'
                    value= {this.state.director} 
                    onChange={this.onChangeDirector} 
                    type='text' 
                    minLength='1' maxLength='40'/>
                    
                    <input 
                    name='rating'
                    value={this.state.rating} 
                    onChange={this.onChangeRating}                    
                    type='number'
                    min='0' max='5' step='0.1' />
                    
                    <input type='submit' value='Save Changes'/>
                    <br></br>
                    <p>{errMessage}</p>
                </form>
            </div>
        )
    }
}

export default EditMovie;