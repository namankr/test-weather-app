import React from 'react';

class Wind extends React.Component {

    constructor(props) {
        super(props);
    }
    render() {

        return (<div>

            
            <table id="data" >
            <tbody>
                <tr>
                    <th>Wind</th>
                    <th>Humidity</th>
                    <th>Cloud</th>
                    <th>Sun rise</th>
                    <th>sun set</th>
             
                </tr>

                <tr>
                    <td>{(this.props.value.wind.speed)}</td>
                    <td>{(this.props.value.main.humidity)}%</td>
                    <td>{(this.props.value.clouds.all)} %</td>
                    <td>{( new Date(this.props.value.sys.sunrise*1000).toLocaleTimeString() )} </td>
                    <td>{(new Date(this.props.value.sys.sunset*1000).toLocaleTimeString() )} </td>
                    
                    
                </tr>
                </tbody>
            </table>
        </div>)
    }
}


export default Wind;


