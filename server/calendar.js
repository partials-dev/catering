var google = Meteor.npmRequire("googleapis");
var scopes = ['https://www.googleapis.com/auth/calendar'];
var CLIENT_ID = global.googleClientSecrets.web.client_id;
var CLIENT_SECRET = global.googleClientSecrets.web.client_secret;

var OAuth2 = google.auth.OAuth2;
var oauth2Client = new OAuth2(CLIENT_ID, CLIENT_SECRET, 'http://dev.partialcinema.com:3000/helper/auth');
var accessToken = null;
var refreshToken = global.googleCalendarRefreshToken;

oauth2Client.setCredentials({
  access_token: accessToken,
  refresh_token: refreshToken
});

var googleAuth = oauth2Client;
var calendar = google.calendar({version: 'v3', auth: googleAuth});
var moment = Meteor.npmRequire("moment");

var calendarIds = {
  rehearsal:  'scromh7crg9cm0u695pumsrb4o@group.calendar.google.com',
  show:       'm0crma3ead736lct9r0f88s1sk@group.calendar.google.com',
  other:      'ghptaulpabvqsefm19cfhokh54@group.calendar.google.com'
};

function listEvents(type, parameters, callback) {
  parameters.calendarId = calendarIds[type];
  calendar.events.list(parameters, callback);
}

function insertRehearsal(rehearsal) {
  Rehearsals.insert(rehearsal);
}

function gotRehearsals(err, results) {
  if (err) {
    console.log("Error retrieving calendar events: ", err);
  }
  results.items.forEach(insertRehearsal);
  //results.items.forEach(function (item){console.log(item.start)});
}

Rehearsals.remove({});

var timeMin = moment().hours(0).minutes(1).format();

listEvents("rehearsal", {orderBy: "startTime", maxResults: 5, singleEvents: true, timeMin: timeMin}, Meteor.bindEnvironment(gotRehearsals)); 

Meteor.startup(function () {
  // code to run on server at startup
});
