// Local storage keys
const EVENT_KEY = 'events';
const REGISTRATION_KEY = 'registrations';

// Helper function to get data from localStorage
function getData(key) {
    return JSON.parse(localStorage.getItem(key)) || [];
}

// Helper function to save data to localStorage
function saveData(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

// Create Event
function createEvent() {
    const name = document.getElementById('name').value;
    const description = document.getElementById('description').value;
    const date = document.getElementById('date').value;

    const events = getData(EVENT_KEY);
    const newEvent = { id: events.length + 1, name, description, date };
    events.push(newEvent);
    saveData(EVENT_KEY, events);

    alert('Event Created Successfully!');
    window.location.href = 'index.html';
}

// Display Events
function displayEvents() {
    const eventList = document.getElementById('event-list');
    const events = getData(EVENT_KEY);

    if (events.length === 0) {
        eventList.innerHTML = '<li>No upcoming events.</li>';
    } else {
        events.forEach(event => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `<a href="event_details.html?id=${event.id}">${event.name} - ${event.date}</a>`;
            eventList.appendChild(listItem);
        });
    }
}

// Load Event Details
function loadEventDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const eventId = urlParams.get('id');
    const events = getData(EVENT_KEY);
    const event = events.find(e => e.id == eventId);

    if (event) {
        document.getElementById('event-name').textContent = event.name;
        document.getElementById('event-description').textContent = event.description;
        document.getElementById('event-date').textContent = event.date;
        document.getElementById('register-link').href = `register.html?id=${event.id}`;
    }
}

// Register for Event
function registerForEvent() {
    const urlParams = new URLSearchParams(window.location.search);
    const eventId = urlParams.get('id');

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;

    const registrations = getData(REGISTRATION_KEY);
    const newRegistration = { eventId, name, email };
    registrations.push(newRegistration);
    saveData(REGISTRATION_KEY, registrations);

    alert('Registered Successfully!');
    window.location.href = 'index.html';
}

// Display Registrations
function displayRegistrations() {
    const urlParams = new URLSearchParams(window.location.search);
    const eventId = urlParams.get('id');
    const registrations = getData(REGISTRATION_KEY);
    const eventRegistrations = registrations.filter(r => r.eventId == eventId);

    const registrationList = document.getElementById('registration-list');

    if (eventRegistrations.length === 0) {
        registrationList.innerHTML = '<li>No registrations yet.</li>';
    } else {
        eventRegistrations.forEach(reg => {
            const listItem = document.createElement('li');
            listItem.textContent = `${reg.name} (${reg.email})`;
            registrationList.appendChild(listItem);
        });
    }
}
