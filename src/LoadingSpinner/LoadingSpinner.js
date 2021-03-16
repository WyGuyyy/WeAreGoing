import React from 'react';
import ReactDOM from "react-dom"
import './LoadingSpinner.css';

class LoadingSpinner extends React.Component{
    constructor(props){
        super(props);

        this.state = {

        };

    }
    
    componentDidMount(){ 

    }

    //Lifecycle event preparing Slideshow component to unmount from DOM
    componentWillUnmount(){
        
    }


    render(){

        return(
            <div className="loaderBackground">
                <div className="loader">
                    
                </div>
            </div>
        );
            
    }
}

export default LoadingSpinner;


//"react-router-dom": "^6.0.0-alpha.1",