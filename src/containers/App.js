import React, { Component } from 'react';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import ErrorBoundry from '../components/ErrorBoundry';
import './App.css';

class App extends Component {  //smart components have class syntax.
    constructor() {
        super()
        this.state = {  //two states because there is a state the App component needs to be a class in order to use constructor.
            robots: [],  //these two states are the items that change in the app. The virtual DOM collects this and renders it to pass to the components.
            searchfield: ''
        }
    }

    componentDidMount() {
        fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(users => this.setState({ robots: users }));
    }

    //we create this onSearchChange and it is not part of react so the arrow function syntax is required
    onSearchChange = (event) => {  //on a searchbox change (when you type) it is passed to the component SearchBox. When there is a change it tell the App to run the function.
        this.setState({ searchfield: event.target.value })  //function runs on change and updates the searchfield state up in the constructor.
    }
    render() {
        const { robots, searchfield } = this.state;
        const filteredRobots = robots.filter(robot => {  //when the searchfield in the constructor changes it filters the robots
            return robot.name.toLowerCase().includes(searchfield.toLowerCase());
        })
        if (!robots.length) {
            return <h1>Loading...</h1>
        } 
        else {
            return (
            <div className='tc'>
                <h1 className='f1'>RoboFriends</h1>
                <SearchBox searchChange={this.onSearchChange}/>
                <Scroll>
                    <ErrorBoundry>
                        <CardList robots={filteredRobots}/>
                    </ErrorBoundry>
                </Scroll>  
            </div>
            );
        } 
    }
}
export default App