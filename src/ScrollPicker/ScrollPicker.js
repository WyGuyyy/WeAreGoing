import React, { Fragment } from 'react';
import {getInfo} from '../Services/InfoService';
import './ScrollPicker.css';

class ScrollPicker extends React.Component{
    constructor(props){
        super(props);

       // if(RedirectService.checkItemForUndefined(props.location.state)){
            this.state = {
                amount: this.props.amount
            };
        //}

    }
    
    //Lifecycle method for after Header component has mounted to the DOM
    componentDidMount(){ 
       
        this.renderColumns();

        this.timerID = setInterval(
            () => this.tick(),
            1000
        );
    
    }

    componentDidUpdate(){
            
    }

    //Lifecycle event preparing Header component to unmount from DOM
    componentWillUnmount(){
        
    }

    async tick(){
        
        var data = await getInfo();

        if(this.state.amount !== data.amount){
            this.setState({
                amount: data.amount
            });

            this.updateAmount(data.amount);
        }
    }

    updateAmount(newAmount){

        var amount = newAmount;

        var millions = parseInt(amount/1000000);
        amount = amount - (millions * 1000000);

        var hundredThousands = parseInt(amount/100000);
        amount = amount - (hundredThousands * 100000);

        var tenThousands = parseInt(amount/10000);
        amount = amount - (tenThousands * 10000);

        var thousands = parseInt(amount/1000);
        amount = amount - (thousands * 1000);

        var hundreds = parseInt(amount/100);
        amount = amount - (hundreds * 100);

        var tens = parseInt(amount/10);
        amount = amount - (tens * 10);

        var ones = amount;

        var numbersArray = [millions, hundredThousands, tenThousands, thousands, hundreds, tens, ones];
        var idNameArr = ["millions", "hundredThousands", "tenThousands", "thousands", "hundreds", "tens", "ones"];

        for(var numCount = 0; numCount < numbersArray.length; numCount++){
            var spinnerWrapper = document.getElementsByClassName("Picker-SpinnerWrapper")[numCount];
            spinnerWrapper.style.transform = "translateY(-" + (numbersArray[numCount] * 80) + "px)";
        }
    }

    renderColumns(){

        var scrollPickerWrapper = document.getElementsByClassName("Scroll-Picker-Wrapper")[0];
        var spinnerRow = document.createElement("div");
        var spinnerWrapper;
        var itemWrapper;
        var item;

        var dollarSignWrapper = document.createElement("div");
        var dollarSign = document.createElement("h1");

        dollarSignWrapper.classList.add("WeAreGoing-Spinner-DollarSignWrapper");
        dollarSign.classList.add("WeAreGoing-Spinner-DollarSign");
        dollarSign.textContent = "$";

        dollarSignWrapper.appendChild(dollarSign);

        while (scrollPickerWrapper.firstChild) {
            scrollPickerWrapper.removeChild(scrollPickerWrapper.lastChild);
          }

        scrollPickerWrapper.appendChild(dollarSignWrapper);

        spinnerRow.classList.add("Picker-SpinnerRow");

        var amount = this.state.amount;

        var millions = parseInt(amount/1000000);
        amount = amount - (millions * 1000000);

        var hundredThousands = parseInt(amount/100000);
        amount = amount - (hundredThousands * 100000);

        var tenThousands = parseInt(amount/10000);
        amount = amount - (tenThousands * 10000);

        var thousands = parseInt(amount/1000);
        amount = amount - (thousands * 1000);

        var hundreds = parseInt(amount/100);
        amount = amount - (hundreds * 100);

        var tens = parseInt(amount/10);
        amount = amount - (tens * 10);

        var ones = amount;

        var numbersArray = [millions, hundredThousands, tenThousands, thousands, hundreds, tens, ones];
        var idNameArr = ["millions", "hundredThousands", "tenThousands", "thousands", "hundreds", "tens", "ones"];
        
        for(var numCount = 0; numCount < numbersArray.length; numCount++){

            spinnerWrapper = document.createElement("div");
            spinnerWrapper.classList.add("Picker-SpinnerWrapper");

            for(var itemCount = 0; itemCount < 10; itemCount++){ //Start here next time - filling the spinners for the donation

                itemWrapper = document.createElement("div");
                item = document.createElement("h1");

                itemWrapper.classList.add("Picker-ItemWrapper");
                item.classList.add("Picker-Item");

                itemWrapper.id = "Wrapper-" + idNameArr[numCount] + "-" + itemCount;
                itemWrapper.onclick = e => this.onItemClick(e);
                item.id = idNameArr[numCount] + "-" + itemCount;
                item.textContent = itemCount;
                itemWrapper.appendChild(item);
                spinnerWrapper.appendChild(itemWrapper);
            }

            spinnerRow.appendChild(spinnerWrapper);
        }

        scrollPickerWrapper.appendChild(spinnerRow);

    }

    //Render the Header component to the DOM/Screen
    render(){

        return(
            <Fragment>
                <div className="Scroll-Picker-Container">
                    <div className="Scroll-Picker-Wrapper" id={this.props.controlWrapperID}>
                        <div className="WeAreGoing-Spinner-DollarSignWrapper">
                            <h1 className="WeAreGoing-Spinner-DollarSign" >$</h1>
                        </div>
                    </div>
                </div>
            </Fragment>
        );
            
    }
}

export default ScrollPicker;

//<Hamburger />
//
//"react-router-dom": "^6.0.0-alpha.1",