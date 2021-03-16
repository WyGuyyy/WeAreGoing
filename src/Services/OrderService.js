import { order } from 'paypal-rest-sdk';
import {baseURI} from './APIService';

const processCustomerOrder = async (orderData) => {

    var status = "";

    var status = await fetch(baseURI + "/api/order/capture", {  
        method: "POST",
        headers: {"Content-Type": "application/json"},                 
        body: JSON.stringify(orderData)
        }).then(result => result.text()).then(data => {
            return data;
        }).catch(console.log);

    return status;

}

export async function processOrder(orderData){

    var status = await processCustomerOrder(orderData).then((value) => {
        return value;
    });

    return status;

}