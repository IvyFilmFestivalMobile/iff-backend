const fetch = require('node-fetch');

const REQUEST_OPTIONS = {
    method: 'GET',
    headers: {
        'Authorization': 'Bearer ' + process.env.EVENTBRITE_API_KEY,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
};

const API_STRING =  "https://www.eventbriteapi.com/v3/organizations/79179389909/events/?expand=venue";

async function callEventsAPI() {
    return fetch(API_STRING, REQUEST_OPTIONS)
        .then(res => res.json())
        .then(json => {
            return json;
        });
}

async function fetchEvents(event) {
    return new Promise((resolve, reject) => {
        callEventsAPI().then((eventData) => {
            resolve(eventData); 
        }).catch(reject);
     });
}

exports.handler = fetchEvents; 