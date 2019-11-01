import React from 'react'

class History extends React.Component {

    constructor(props) {
        super(props);
    }
    render() {

        return (<div style={{border:'1px solid green'}}>

        <ul>{this.state.history.map((number, index) =>
                    <li key={number.name.toString()} onClick={() => this.onItemClickHandler(number)} >
                        {number.name}
                    </li>
                )}</ul>

        </div>)
    }
}


export default History;