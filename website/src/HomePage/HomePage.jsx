import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { userActions } from '../_actions';
import Image from './../_components/image'
import Wind from './../_components/hum-prepcip-wind-cloud'
import getPosition from './../App/gps.js'
import Search from './../_components/search'
import Suggestions from './../_components/suggestions'
import { city } from './../_components/search'
import History from './../_components/History'

import '../style/app.css'


const fetch = require('node-fetch');

class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.myRef = React.createRef();
        this.state = {
            key: '682873a57ec806a365aad3da6bf2aa17', //Not a good prctive should not be shown //process.env//
            data: undefined,
            history: [],
            isHover: false
        };
    }
    componentDidMount() {
        this.props.getUsers();
        // console.log(weather);
    }
    handleSubmit = (event) => {
        event.preventDefault();
        console.log(city, "city value of suggestion");
        let res = city;
        console.log('result : ', res);
        // getByName(res); 

        fetch(`http://api.openweathermap.org/data/2.5/weather?q=${res}&units=imperial&appid=${this.state.key}`)
            .then((response) => response.json())
            .then(data => {
                console.log(data)

                this.setState({
                    data
                })
                // Correct
                this.setState((prevState, props) => ({
                    history: [...prevState.history, data]
                }));
            }
            );
    }


    getLocation = () => {
        console.log("calling from search bar first time");
        if (this.state.data == undefined) {
            getPosition()
                .then((position) => {
                    console.log(position);
                    let lat = position.coords.latitude;
                    let lon = position.coords.longitude;
                    fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${this.state.key}`)
                        //  api.openweathermap.org/data/2.5/weather?lat=35&lon=139
                        .then((response) => response.json())
                        .then(data => {
                            console.log(data)

                            this.setState({
                                data
                            })
                            // Correct
                            this.setState((prevState, props) => ({
                                history: [...prevState.history, data]
                            }));
                        }
                        );

                })
                .catch((err) => {
                    console.error(err.message);
                });
        }

    }

    handleDeleteUser(id) {
        return (e) => this.props.deleteUser(id);
    }
    onItemClickHandler = (data) => {
        console.log("test");
        console.log(data);
        this.setState({
            data
        })
    }
    handleHover = () => {
        console.log('on hover on div');
        this.setState({
            isHover: true
        })
    }

    handleHoverLeave = () => {
        console.log('on hover on div');
        this.setState({
            isHover: false
        })
    }

    getWeather = () => {
        console.log('get weather location', this.state)
        this.getLocation();
    }




    render() {
        const { user, users } = this.props;
        return (
            <div className="col-md-6 col-md-offset-3">
                <div id="namewithimage">
                    <h2>Hi {user.firstName}!</h2>
                    <img src={`http://localhost:4000/${user.profileImage}`} alt="users profile Image" />

                </div>
                <div id="history" onMouseEnter={this.handleHover} onMouseLeave={this.handleHoverLeave}>
                    <button className="button button2">History</button>
                    <ul style={{ display: this.state.isHover ? '' : 'none' }}>{this.state.history.map((number, index) =>
                        <li key={number.name.toString()} onClick={() => this.onItemClickHandler(number)} >
                            {number.name}
                        </li>
                    )}</ul>

                </div>

                <div id="current-location">
                    <button class="button1" onClick={this.getWeather}>Current location weather</button>
                </div>

                <div id="form">

                    <form onSubmit={this.handleSubmit}>
                        <label>
                            <h3> Add a city </h3>
                        </label>
                        <Search value={this.state.data} required />
                        <input className="btn btn-orange" type="submit" value="Get Weather" />
                    </form>
                </div>

                {
                    this.state.data && <div>

                        <Image value={this.state.data} />
                        <Wind value={this.state.data} />
                    </div>
                }


                <p id="logout">
                    <Link to="/login">Logout</Link>
                </p>
            </div>
        );
    }
}

//ReactDOM.render(Dropdown, document.getElementById('root'));

function mapState(state) {
    const { users, authentication } = state;
    const { user } = authentication;
    return { user, users };
}

const actionCreators = {
    getUsers: userActions.getAll,
    deleteUser: userActions.delete
}

const connectedHomePage = connect(mapState, actionCreators)(HomePage);
export { connectedHomePage as HomePage };


