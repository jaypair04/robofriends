import React, { useEffect, useState } from 'react';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import ErrorBoundry from '../components/ErrorBoundry';
import './App.css';

function App() {  //these two states are the items that change in the app. The virtual DOM collects this and renders it to pass to the components.
    const [robots, setRobots] = useState([])  //two states because there is a state the App component needs to be a class in order to use constructor.
    const [searchfield, setSeachfield] = useState('') 
    
    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(users => setRobots( users ));
    })
    //we create this onSearchChange and it is not part of react so the arrow function syntax is required
    const onSearchChange = (event) => {  //on a searchbox change (when you type) it is passed to the component SearchBox. When there is a change it tell the App to run the function.
        setSeachfield( event.target.value )  //function runs on change and updates the searchfield state up in the constructor.
    }
    const filteredRobots = robots.filter(robot => {  //when the searchfield in the constructor changes it filters the robots
            return robot.name.toLowerCase().includes(searchfield.toLowerCase());
        })   
    return !robots.length ?
        <h1>Loading...</h1> : 
        (
        <div className='tc'>
            <h1 className='f1'>RoboFriends</h1>
            <SearchBox searchChange={onSearchChange}/>
            <Scroll>
                <ErrorBoundry>
                    <CardList robots={filteredRobots}/>
                </ErrorBoundry>
            </Scroll>  
        </div>
        );
}
export default App