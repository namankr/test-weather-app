import React from 'react';
import weather_map from '../App/weathericonmap'

class Image extends React.Component {

    constructor(props) {
        super(props);
    }
    render() {

        return (<div id="weathericon">
            <b>Weather in</b> {
                this.props.value.name
            }
            <div>

                <img width="150px" src={weather_map[this.props.value.weather[0].icon]} alt={this.props.value.weather[0].icon}></img>
            </div>
            <div>
                {Math.round((this.props.value.main.temp - 32) * 5 / 9)}
                <span> &#8451;</span>
                <p>{(this.props.value.weather[0].description)} </p>
            </div>
        </div>)
    }
}
export default Image;