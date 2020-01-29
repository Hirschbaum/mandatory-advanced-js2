import React from 'react';
import './App.css';
import Navigation from './Navigation';
import axios from 'axios';
import Helmet from 'react-helmet';

class EditMovie extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
                title: '',
                description: '',
                director: '',
                rating: '',
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

    /*getMovieDetails = () => {
        let id = this.props.match.params.id
        axios.get('http://3.120.96.16:3001/movies/' + id)
        .then(response => {
            console.log('Movie getting: ', response);
            this.setState({title: response.data.title})
            this.setState({director: response.data.director})
            this.setState({description: response.data.description})
            this.setState({rating: response.data.rating})
        })
        .catch(err => {
            console.log('Eh, error by getting movie for Editing.js', err);
        });
    }*/

    updateMovieHandler = (e) => {
        let id = this.props.match.params.id
        axios.post('http://3.120.96.16:3001/movies/' + id)
        .then(response => {
            console.log('Movie getting: ', response);
            this.setState({title: response.data.title})
            this.setState({director: response.data.director})
            this.setState({description: response.data.description})
            this.setState({rating: response.data.rating})
        })
        .catch(err => {
            console.log('Uh, error by editing movie', err);
        });
    }

    render() {
        return(
            <div>
                <Helmet>
                    <title>Edit Movie</title>
                </Helmet>
                <Navigation />
                <h3>Edit a Movie from the List</h3>
                <form onSubmit={this.updateMovieHandler}> {/* onSubmit put to the server*/}
                    <input 
                    title={this.state.title}
                    onChange={this.onChangeTitle} 
                    type='text'
                    minLength='1' maxLength='40'/>
                    
                    <textarea 
                    description={this.state.description} 
                    onChange={this.onChangeDescription} 
                    minLength='1' maxLength='300'
                    ></textarea>
                    
                    <input 
                    director= {this.state.director} 
                    onChange={this.onChangeDirector} 
                    type='text' 
                    minLength='1' maxLength='40'/>
                    
                    <input 
                    rating={this.state.rating} 
                    onChange={this.onChangeRating} 
                    type='number'
                    min='0' max='5' step='0.1' />
                    
                    <input type='submit' value='Save Changes'/>
                </form>
            </div>
        )
    }
}

export default EditMovie;