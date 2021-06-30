import { Component } from 'react';
import './styles.css';

export class Home extends Component {
    state = {
        counter: 0
    }

    handleButtonIncrement = () => {
        this.setState({counter: this.state.counter + 1}, () => {console.log(this.state.counter);});
        
    } 
    render() {
        return (
            <div className='container'>
            <h1>{this.state.counter}</h1>
            <button onClick={this.handleButtonIncrement} >increment</button>
            </div>
        )
    }
}