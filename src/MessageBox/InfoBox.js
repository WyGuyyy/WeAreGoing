import React from 'react';
import './InfoBox.css';

class InfoBox extends React.Component{
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

        var addText2 = "Space exploration of the past and present has always been limited by global government support and funding. Yet, the community of space enthusiasts is ever growing. It may be awhile before world governments give the space frontier the support it needs, but in the meantime, we the community can make a difference.";
        var addText4 = "Every week a new streamer, organization, etc. will be rotated into the 'Reciever of the Week' for which you can give a dollar to for the given week (but please don't ever feel an obligation to give). Its time to make our mark. WE are going to the moon. WE are going to Mars. WE are going ad astra. The human race. Together.";
        var addText6 = "To be clear, NO - I absolutely do not pocket any of the money donated whatsoever except to pay for some of the excess hosting fees to keep the site up an running. But I myself keep nothing.";
        var addText7 = "If we can reach even just a small percentage of the community, we could raise thousands of dollars in a single week for a space related streamer or organization. Spread the word. Lets do this.";
        var addText8 = "Ad Astra my friends. ~ Wyatt"

        return(
            <div className="infoBoxShader">
                <div className="infoBoxWrapper" onClick={this.props.tileClickEvent}>
                    <div className="infoBoxContent">
                        <div className="infoBoxTextWrapper">
                            <p className="infoBoxText">{addText2}</p>
                            <br/>
                            <p className="infoBoxText">{addText4}</p>
                            <br/>
                            <p className="infoBoxText">{addText6}</p>
                            <br/>
                            <p className="infoBoxText">{addText7}</p>
                            <br/>
                            <p className="infoBoxText">{addText8}</p>
                        </div>
                        <div className="InfoBox-Button-Wrapper">
                            <button className="infoBoxConfirm" onClick={this.props.confirm}>{"Close"}</button>
                        </div>
                    </div>
                </div>
            </div>
        );
            
    }s
}

export default InfoBox;

//<Hamburger />
//
//"react-router-dom": "^6.0.0-alpha.1",