Rehearsals = new Mongo.Collection("rehearsals");
Cooks = new Mongo.Collection("cooks");


// Clientside

if (Meteor.isClient) {
  // counter starts at 0
  Session.setDefault('counter', 0);

  Template.body.helpers({
    cooks: function() {
      return Cooks.find({});
    },
    rehearsals: function() {
      return Rehearsals.find({});
    }
  });
}


// Serverside

if (Meteor.isServer) {
  var google = Meteor.npmRequire("googleapis");
  var scopes = [
    'https://www.googleapis.com/auth/calendar'
    ];
  var CLIENT_ID = global.googleClientSecrets.web.client_id;
  var CLIENT_SECRET = global.googleClientSecrets.web.client_secret;
  var OAuth2 = google.auth.OAuth2;
  var oauth2Client = new OAuth2(CLIENT_ID, CLIENT_SECRET, 'http://dev.partialcinema.com:3000/helper/auth');
  var accessToken = null;
  var refreshToken = process.env.GOOGLE_CALENDAR_REFRESH_TOKEN;
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
    console.log("Error retrieving calendar events: ", err);
    results.items.forEach(insertRehearsal);
  }
  listEvents("rehearsal", {orderBy: "startTime", maxResults: 10, singleEvents: true}, Meteor.bindEnvironment(gotRehearsals)); 

  Meteor.startup(function () {
    // code to run on server at startup
  });
}

