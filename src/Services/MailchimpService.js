import {baseURI} from './APIService';

const addSubscriber = async (email) => {

    var response;
    var sub = {"email_address": email, "status": "subscribed"};

    response = await fetch(baseURI + "/api/mailchimp/subscribe", {  
            method: "POST",                        
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(sub)
        }).catch(console.log);

    return response;

}

export async function subscribe(email){
    return await addSubscriber(email);
}