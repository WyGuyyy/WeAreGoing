import React from 'react';
import './App.css';
import {getInfo} from './Services/InfoService';
import {subscribe} from './Services/MailchimpService';
import {incrementAmount} from './Services/InfoService';
import ConfirmDonation from './MessageBox/ConfirmDonation';
import ScrollPicker from './ScrollPicker/ScrollPicker';
import PaypalButton from './PaypalButton/PaypalButton';
import InfoBox from './MessageBox/InfoBox'; 
import LoadingSpinner from './LoadingSpinner/LoadingSpinner';
import {processOrder} from './Services/OrderService';

class App extends React.Component{
    constructor(props){
        super(props);

        this.state = {
          amount: 0,
          receiver: "",
          link: "",
          coverFee: false
        };

    }
    
    componentDidMount(){ 
      this.fillInfo();
    }

    //Lifecycle event preparing Slideshow component to unmount from DOM
    componentWillUnmount(){

    }

    onClickCover(event){
      this.showCoverModal();
    }

    async fillInfo(){
      var data = await getInfo();

      var receiver = document.getElementsByClassName("WeAreGoing-Reciever")[0];
      var link = document.getElementsByClassName("WeAreGoing-Link")[0];
      /*var video = document.getElementsByClassName("WeAreGoing-Video")[0];*/

      receiver.textContent = data.receiver;
      link.href = data.link;
      //video.src = data.link;

     this.setState({
        amount: data.amount,
        receiver: data.receiver,
        link: data.link
      });
    }

    checkboxClicked(event){
      var cover = document.getElementsByClassName("WAG-CoverFee-Checkbox")[0];
      var isCovered = false
      
      if(cover.checked){
        isCovered = true;
      }else{
        isCovered = false;
      }

      this.setState({
        coverFee: isCovered
      });
    }

    onApprove = async (data, actions) => { //Start here next time and get front/back end hooked up

      document.getElementsByClassName("loaderBackground")[0].style.display = "flex";

      var result = await processOrder({order_id: data.orderID, payer_id: data.payerID, token: data.facilitatorAccessToken});
      if(result == 1){

        //incrementAmount();
        localStorage.setItem('donation_timeout', this.getNextTimeout());
        this.showModal();

      }else{

      }

      document.getElementsByClassName("loaderBackground")[0].style.display = "none";
      //return actions.order.capture();

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

      if(currDate.getDay() === 1 && currDate.getHours() < 12){
          return false;
      }

      return true;
    }

    popoutClick(event){

    }

    async handleSubscribe(event){
        var subInput = document.getElementsByClassName("WeAreGoing-SubscribeInput")[0];
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
      document.getElementById("confirmDonationText").textContent = "Thank you so much for the donation! I understand this is a complete free will donation out of your own generosity, and I cannot express with words how much I appreciate that. Ad astra! ~ Wyatt";
      document.getElementsByClassName("confirmDonationContent")[0].classList.add("confirmDonationContentShow");
    }

    showSubscribeModal(){
      document.getElementById("confirmDonationContainer").style.display = "flex";
      document.getElementById("confirmDonationText").textContent = "You are subscribed! Check your email weekly for updates on our mission!";
      document.getElementsByClassName("confirmDonationContent")[0].classList.add("confirmDonationContentShow");

      if(document.getElementsByClassName("WeAreGoing-Paypal-Wrapper")[0] !== undefined){
        document.getElementsByClassName("WeAreGoing-Paypal-Wrapper")[0].style.opacity = "0";
    }
    }

    showCoverModal(){
      document.getElementById("confirmDonationContainer").style.display = "flex";
      document.getElementById("confirmDonationText").textContent = "Papyal charges approximately a 10 cent fee per transaction, so the donation fund would recieve $0.90 after the fee is taken out. Covering the 10 cent fee would mean your entire dollar would go towards the donation for the week, but you would be paying $1.10 instead of just $1.00. Either way, your donation is much appreciated!";
      document.getElementsByClassName("confirmDonationContent")[0].classList.add("confirmDonationContentShow");

      if(document.getElementsByClassName("WeAreGoing-Paypal-Wrapper")[0] !== undefined){
        document.getElementsByClassName("WeAreGoing-Paypal-Wrapper")[0].style.opacity = "0";
    }
    }

    showSubscribeErrorModal(){
      document.getElementById("confirmDonationContainer").style.display = "flex";
      document.getElementById("confirmDonationText").textContent = "Sorry, an unexpected problem happened when subscribing. Please make sure a valid email address is entered and try again.";
      document.getElementsByClassName("confirmDonationContent")[0].classList.add("confirmDonationContentShow");

      if(document.getElementsByClassName("WeAreGoing-Paypal-Wrapper")[0] !== undefined){
        document.getElementsByClassName("WeAreGoing-Paypal-Wrapper")[0].style.opacity = "0";
    }
    }

    closeModal(){
      document.getElementById("confirmDonationContainer").style.display = "none";
      document.getElementsByClassName("confirmDonationContent")[0].classList.remove("confirmDonationContentShow");

      if(document.getElementsByClassName("WeAreGoing-Paypal-Wrapper")[0] !== undefined){
        document.getElementsByClassName("WeAreGoing-Paypal-Wrapper")[0].style.opacity = "1";
    }

      this.forceUpdate();
    }

    showPopout(event){
      //document.getElementsByClassName("infoBoxShader")[0].style.display = "inline-block";
      document.getElementsByClassName("infoBoxShader")[0].classList.add("infoBoxWrapperShow");
      document.getElementsByClassName("infoBoxWrapper")[0].classList.add("infoBoxWrapperShow");

      if(document.getElementsByClassName("WeAreGoing-Paypal-Wrapper")[0] !== undefined){
          document.getElementsByClassName("WeAreGoing-Paypal-Wrapper")[0].style.opacity = "0";
      }
      
    }

    closePopout(event){
      document.getElementsByClassName("infoBoxShader")[0].classList.remove("infoBoxWrapperShow");
      document.getElementsByClassName("infoBoxWrapper")[0].classList.remove("infoBoxWrapperShow");
      
      if(document.getElementsByClassName("WeAreGoing-Paypal-Wrapper")[0] !== undefined){
          document.getElementsByClassName("WeAreGoing-Paypal-Wrapper")[0].style.opacity = "1";
      }

    }
    
    render(){

      var currAmount = 0;

        return(
            <div className="weAreGoingContainer">
                <InfoBox confirm={e => this.closePopout(e)}/>
                <ConfirmDonation confirm={e => {this.closeModal()}}/>
                <LoadingSpinner/>
                <h1 className="weAreGoingPopout" onClick={e => this.showPopout(e)}>?</h1>
                <div className="WeAreGoing-Title-Wrapper">
                    <h1 className="WeAreGoing-Title"><span className="WAG-We WAG-Title">WE</span> <span className="WAG-Are WAG-Title">ARE</span> <span className="WAG-Going WAG-Title">GOING</span></h1>
                </div>
                <div className="weAreGoingWrapper">
                    <div className="WeAreGoing-Donation-Wrapper">
                        <h2 className="WeAreGoing-Donation-Title TextShow">This Weeks Donation</h2>
                        <div className="WeAreGoing-Reciever-Divider TextShow" id="donationDivider"></div>
                        <ScrollPicker amount={currAmount}/>
                    </div>
                    <div className="WeAreGoing-Reciever-Wrapper">
                        <h2 className="WeAreGoing-Reciever-Title TextShow">Reciever of the Week</h2>
                        <div className="WeAreGoing-Reciever-Divider"></div>
                        <a href="" className="WeAreGoing-Link"><h3 className="WeAreGoing-Reciever TextShow"></h3></a>
                    </div>
                    {this.checkTimeout(localStorage.getItem("donation_timeout")) ?
                     this.checkTime() ? <div className="WeAreGoing-Paypal-Wrapper">
                        <h2 className="WeAreGoing-Paypal-Title TextShow">Donate a dollar:</h2>
                        <div className="WAG-CoverFee-Wrapper">
                          <label className="WAG-CoverFee-Label" onClick={e => this.onClickCover(e)}>Cover 10 cent fee?</label>
                          <input className="WAG-CoverFee-Checkbox" type="checkbox" onClick={e => this.checkboxClicked(e)}/>
                        </div>
                        <PaypalButton 
                          amount={1 + (this.state.coverFee ? .1 : 0)}
                          currency={'USD'}
                          onApprove={this.onApprove}
                        />
                    </div> : <div><h2 className="WeAreGoing-Paypal-Title TextShow">This weeks donation period has ended. Donation button will open again at 12:00 PM EST Sunday.</h2></div> :
                    <div className="WeAreGoing-Paypal-Title-Wrapper">
                        <h2 className="WeAreGoing-Paypal-Title TextShow" id="test">You have already given a dollar this week!</h2>
                    </div>
                  }
                  <div className="WeAreGoing-SubscribeMessage-Wrapper">
                    <h2 className="WeAreGoing-SubscribeMessage">Subscribe to recieve weekly updates about our mission!</h2>
                  </div>
                  <div className="WeAreGoing-SubscribeForm">
                      <input className="WeAreGoing-SubscribeInput" placeholder="Email"/>
                      <button className="WeAreGoing-SubscribeButton" onClick={e => this.handleSubscribe(e)}>Subscribe</button>
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