import React from 'react';
import './ConfirmDonation.css';

class ConfirmPurchase extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            
        };

    }
    
    //Lifecycle method for after Header component has mounted to the DOM
    componentDidMount(){ 
    
    }

    //Lifecycle event preparing Header component to unmount from DOM
    componentWillUnmount(){
        
    }

    hideModal(event){
        document.getElementById((this.state.id === undefined ? "modalContainer" : this.state.id)).style.display = "none";
    }

    //Render the Header component to the DOM/Screen
    render(){

        var passage = "Thank you so much for the donation! I understand this is a complete free will donation out of your own generosity, and I cannot express with words how much I appreciate that. Ad astra! ~ Wyatt";
        var btnText = "Close";

        return(
            <div className="confirmDonation" id="confirmDonationContainer" onClick={this.props.tileClickEvent}>
                <div className="confirmDonationContent">
                    <p className="confirmDonationText" id="confirmDonationText">{passage}</p>
                    <div className="ConfirmDonation-Button-Wrapper">
                        <button className="confirmDonationConfirmText" onClick={this.props.confirm}>{btnText}</button>
                    </div>
                </div>
            </div>
        );
            
    }s
}

export default ConfirmPurchase;

//<Hamburger />
//
//"react-router-dom": "^6.0.0-alpha.1",