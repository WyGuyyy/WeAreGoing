import {baseURI} from './APIService';

const getCurrentInfo = async () => {

    var response;
    var data;

    await fetch(baseURI + "/api/info", {  
            method: "GET",                        
            headers: {"Content-Type": "application/json"}
        })
        .then(res => res.text())
        .then(
            (text) => {
                var result = text.length ? JSON.parse(text) : {};
                response = result;
                data = {amount: response[0].amount, receiver: response[0].receiver, link: response[0].link};
            }
        ).catch(console.log);

    return data;

}

const modifyAmount = async () => {

    await fetch(baseURI + "/api/info/increment", {  
            method: "GET",                       
            headers: {"Content-Type": "application/json"}
        }).catch(console.log);

}

export async function getInfo(){

    return await getCurrentInfo();

}

export async function incrementAmount(){
    modifyAmount();
}