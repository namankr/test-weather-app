import React, { Component } from 'react'
import axios from 'axios'
import Suggestions from './suggestions'
let city = null;
import { HomePage } from '../HomePage/HomePage'



class Search extends Component {
    state = {
        query: '',
        results: [],
        default: null
    }


    getInfo = () => {
        axios.get(`http://autocomplete.travelpayouts.com/places2?term=${this.state.query}&locale=en&types[]=city`)
            .then(({ data }) => {
               
                this.setState({
                    results: data
                })
                console.log('result is here from api ...', this.state.results)
            })
    }
    inputBox = (name) => {
        console.log(this.search)
        this.search.value = name;
        city = name;
        this.setState({
            results: []
        })
    }
    _onFocus = () => {
        console.log('you just cllicked on input ///')
        console.log(this.state.default,"default state");
        if (this.state.default == null) {
            console.log(this.state.default,"under if default state");
            console.log(new HomePage(),"connected ");
            getLocation();
           // HomePage.value

        }
    }
    _onBlur = () => {
        console.log('you just _onBlur on input ///')
        this.setState({
            results: []
        })
    }

    keydown = () => {
        console.log('you just _onkeydown on input ///')
        this.setState({
            results: []
        })
    }

    handleInputChange = () => {
        this.setState({
            query: this.search.value,
            table: false
        },
            () => {
                if (this.state.query && this.state.query.length > 1) {
                    if (this.state.query.length % 2 === 0) {
                        this.getInfo()
                    }
                }
            })
    }

    render() {
        return (
            <div>

                <form>
                    <input
                        className="search-box"
                        placeholder="Search for a city"
                        ref={input => this.search = input}
                        onChange={this.handleInputChange}
                        onFocus={this._onFocus}
                       // onBlur={this._onBlur}
                        onKeyDown={this.keydown}
                    required />
                </form>

                <ul>
                    {
                        (this.state.results.length != 0) ?
                            this.state.results.map(items => <li onClick={() => this.inputBox(items.name)}>{items.name}</li>)
                            : ""

                    }
                </ul>

            </div>
        )
    }
}


export default Search
export { city } 

