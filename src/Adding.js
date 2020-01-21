import React from 'react';
import './App.css';
import Navigation from './Navigation';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

class AddMovie extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
                title: '',
                description: '',
                director: '',
                rating: '',
                redirect: false,
        }
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

    addMovieHandler = (e) => {
        //e.preventDefault();
        axios.post('http://3.120.96.16:3001/movies', 
        {
        title: this.state.title, 
        description: this.state.description,
        director: this.state.director,
        rating: this.state.rating,
        })
        .then(this.setState({redirect: true}))
            /*.then( response => {
                //update list with GET:
                axios.get('http://3.120.96.16:3001/movies')
            })*/
            .catch(err => {
                console.log('Errrrh, nothing added to the list', err);
            });
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to='/' />
        }

        return (
            <div>
                <Navigation />
                <h3> Adding Movie to the List</h3>
                <form onSubmit={this.addMovieHandler}> {/* onSubmit post to the server*/}
                    <input title='this.state.title' onChange={this.onChangeTitle} type='text' placeholder='Title'/>
                    <textarea description='this.state.description' onChange={this.onChangeDescription} placeholder='Movie description'></textarea>
                    <input director= 'this.state.director' onChange={this.onChangeDirector} type='text' placeholder='Director'/>
                    <input rating='this.state.rating' onChange={this.onChangeRating} type='number' placeholder='Number 0.0 - 5.0' />
                    <input type='submit' value='Add To List'/>
                </form>
            </div>
        )
    }
}

export default AddMovie;