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
        }); //TODO: Error handling
}

async function fetchEvents(event) {
    let lastId = event.lastId;
    return new Promise((resolve, reject) => {
        callEventsAPI().then((eventData) => {
            if (lastId !== undefined && lastId != "") {
                let filteredEvents = eventData.events
                    .filter(event => parseInt(event.id) > parseInt(lastId));
                resolve({events: filteredEvents});
            } else {
                resolve({events: eventData.events}); //TODO: proper response format
            }
        }).catch(reject);
     });
}

exports.handler = fetchEvents; 