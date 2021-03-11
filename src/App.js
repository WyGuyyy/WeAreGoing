import React from 'react';
import './App.css';
import {getInfo} from './Services/InfoService';
import {subscribe} from './Services/MailchimpService';
import {incrementAmount} from './Services/InfoService';
import ConfirmDonation from './MessageBox/ConfirmDonation';
import ScrollPicker from './ScrollPicker/ScrollPicker';
import PaypalButton from './PaypalButton/PaypalButton';
import InfoBox from './MessageBox/InfoBox'; 

class App extends React.Component{
    constructor(props){
        super(props);

        this.state = {
          amount: 0,
          receiver: "",
          link: ""
        };

    }
    
    componentDidMount(){ 
      this.fillInfo();
    }

    //Lifecycle event preparing Slideshow component to unmount from DOM
    componentWillUnmount(){

    }

    async fillInfo(){
      var data = await getInfo();

      var receiver = document.getElementsByClassName("WelsDollar-Church")[0];
      /*var video = document.getElementsByClassName("WelsDollar-Video")[0];*/

      receiver.textContent = data.receiver;
      console.log(data);
      //video.src = data.link;

     this.setState({
        amount: data.amount,
        receiver: data.receiver,
        link: data.link
      });
    }

    onApprove = async (data, actions) => { //Start here next time and get front/back end hooked up

      incrementAmount();
      localStorage.setItem('donation_timeout', this.getNextTimeout());
      this.showModal();

      return actions.order.capture();

    }

    getNextTimeout(){
      var d = new Date();
      d.setDate(d.getDate() + (6 + 7 - d.getDay()) % 7);
      d.setHours(0, 0, 0, 0);
      return d;
    }

    checkTimeout(timeout){
      
      var currDate = new Date();
      currDate.setHours(0, 0, 0, 0);

      var timeoutDate = new Date(timeout);

      if(timeoutDate < currDate){
        return true;
      }else{
        return false;
      }
    }

    checkTime(){
      var currDate = new Date();

      if(currDate.getDay() === 0 && currDate.getHours() < 12){
          return false;
      }

      return true;
    }

    popoutClick(event){

    }

    async handleSubscribe(event){
        var subInput = document.getElementsByClassName("WelsDollar-SubscribeInput")[0];
        var email = subInput.value;
        var response;

        if(email.trim().localeCompare("") !== 0){
          response = await subscribe(email);
        }else{
          response = {status: 400};
        }

        if(response.status === 200){
          subInput.value = "";
          this.showSubscribeModal();
        }else{
          this.showSubscribeErrorModal();
        }
    }

    addPaypalText(e){
      var text = document.getElementById("hiddenPaypalText");
      var textInit = document.getElementById("initialPaypalText");
      textInit.style.display = "none";
      text.style.display = "block";
    }

    removePaypalText(e){
      var text = document.getElementById("hiddenPaypalText");
      var textInit = document.getElementById("initialPaypalText");
      textInit.style.display = "block";
      text.style.display = "none";
    }

    showModal(){
      document.getElementById("confirmDonationContainer").style.display = "flex";
      document.getElementById("confirmDonationText").textContent = "You are subscribed! Check your email weekly for updates on our mission!";
      document.getElementById("confirmDonationText").textContent = "You will be enriched in every way so that you can be generous on every occasion, and through us your generosity will result in thanksgiving to God. ~ 2 Corinthians 9:11";
      document.getElementsByClassName("confirmDonationContent")[0].classList.add("confirmDonationContentShow");
    }

    showSubscribeModal(){
      document.getElementById("confirmDonationContainer").style.display = "flex";
      document.getElementById("confirmDonationText").textContent = "You are subscribed! Check your email weekly for updates on our mission!";
      document.getElementsByClassName("confirmDonationContent")[0].classList.add("confirmDonationContentShow");

      if(document.getElementsByClassName("WelsDollar-Paypal-Wrapper")[0] !== undefined){
        document.getElementsByClassName("WelsDollar-Paypal-Wrapper")[0].style.opacity = "0";
    }
    }

    showSubscribeErrorModal(){
      document.getElementById("confirmDonationContainer").style.display = "flex";
      document.getElementById("confirmDonationText").textContent = "Sorry, an unexpected problem happened when subscribing. Please make sure a valid email address is entered and try again.";
      document.getElementsByClassName("confirmDonationContent")[0].classList.add("confirmDonationContentShow");

      if(document.getElementsByClassName("WelsDollar-Paypal-Wrapper")[0] !== undefined){
        document.getElementsByClassName("WelsDollar-Paypal-Wrapper")[0].style.opacity = "0";
    }
    }

    closeModal(){
      document.getElementById("confirmDonationContainer").style.display = "none";
      document.getElementsByClassName("confirmDonationContent")[0].classList.remove("confirmDonationContentShow");

      if(document.getElementsByClassName("WelsDollar-Paypal-Wrapper")[0] !== undefined){
        document.getElementsByClassName("WelsDollar-Paypal-Wrapper")[0].style.opacity = "1";
    }

      this.forceUpdate();
    }

    showPopout(event){
      //document.getElementsByClassName("infoBoxShader")[0].style.display = "inline-block";
      document.getElementsByClassName("infoBoxShader")[0].classList.add("infoBoxWrapperShow");
      document.getElementsByClassName("infoBoxWrapper")[0].classList.add("infoBoxWrapperShow");

      if(document.getElementsByClassName("WelsDollar-Paypal-Wrapper")[0] !== undefined){
          document.getElementsByClassName("WelsDollar-Paypal-Wrapper")[0].style.opacity = "0";
      }
      
    }

    closePopout(event){
      document.getElementsByClassName("infoBoxShader")[0].classList.remove("infoBoxWrapperShow");
      document.getElementsByClassName("infoBoxWrapper")[0].classList.remove("infoBoxWrapperShow");
      
      if(document.getElementsByClassName("WelsDollar-Paypal-Wrapper")[0] !== undefined){
          document.getElementsByClassName("WelsDollar-Paypal-Wrapper")[0].style.opacity = "1";
      }

    }
    
    render(){

      var currAmount = 0;

        return(
            <div className="welsDollarContainer">
                <InfoBox confirm={e => this.closePopout(e)}/>
                <ConfirmDonation confirm={e => {this.closeModal()}}/>
                <h1 className="welsDollarPopout" onClick={e => this.showPopout(e)}>?</h1>
                <div className="WelsDollar-Title-Wrapper">
                    <h1 className="WelsDollar-Title"><span className="WAG-We WAG-Title">WE</span> <span className="WAG-Are WAG-Title">ARE</span> <span className="WAG-Going WAG-Title">GOING</span></h1>
                </div>
                <div className="welsDollarWrapper">
                    <div className="WelsDollar-Donation-Wrapper">
                        <h2 className="WelsDollar-Donation-Title TextShow">This Weeks Donation</h2>
                        <div className="WelsDollar-Church-Divider TextShow" id="donationDivider"></div>
                        <ScrollPicker amount={currAmount}/>
                    </div>
                    <div className="WelsDollar-Church-Wrapper">
                        <h2 className="WelsDollar-Church-Title TextShow">Reciever of the Week</h2>
                        <div className="WelsDollar-Church-Divider"></div>
                        <h3 className="WelsDollar-Church TextShow">Tim Dodd - Everyday Astronaut</h3>
                    </div>
                    {this.checkTimeout(localStorage.getItem("donation_timeout")) ?
                     this.checkTime() ? <div className="WelsDollar-Paypal-Wrapper">
                        <h2 className="WelsDollar-Paypal-Title TextShow">Donate a dollar:</h2>
                        <PaypalButton 
                          amount={1}
                          currency={'USD'}
                          onApprove={this.onApprove}
                        />
                    </div> : <div><h2 className="WelsDollar-Paypal-Title TextShow">This weeks donation period has ended. Donation button will open again at 12:00 PM EST Sunday.</h2></div> :
                    <div className="WelsDollar-Paypal-Title-Wrapper">
                        <h2 className="WelsDollar-Paypal-Title TextShow" id="test">You have already given a dollar this week!</h2>
                    </div>
                  }
                  <div className="WelsDollar-SubscribeMessage-Wrapper">
                    <h2 className="WelsDollar-SubscribeMessage">Subscribe to recieve weekly updates about our mission!</h2>
                  </div>
                  <div className="WelsDollar-SubscribeForm">
                      <input className="WelsDollar-SubscribeInput" placeholder="Email"/>
                      <button className="WelsDollar-SubscribeButton" onClick={e => this.handleSubscribe(e)}>Subscribe</button>
                  </div>
                </div>
            </div>
        );
            
    }
}

export default App;


//"react-router-dom": "^6.0.0-alpha.1",

//<label className="subscribeLabel">Subscribe and stay up to date </label>
//<input className="subscribeInput"/>