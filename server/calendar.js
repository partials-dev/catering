import * as cooks from '../lib/cooks-list'

const google = Meteor.npmRequire("googleapis");
const scopes = ['https://www.googleapis.com/auth/calendar'];
const CLIENT_ID = global.googleClientSecrets.web.client_id;
const CLIENT_SECRET = global.googleClientSecrets.web.client_secret;

const OAuth2 = google.auth.OAuth2;
const oauth2Client = new OAuth2(CLIENT_ID, CLIENT_SECRET, 'http://dev.partialcinema.com:3000/helper/auth');
const accessToken = null;
const refreshToken = global.googleCalendarRefreshToken;

oauth2Client.setCredentials({
  access_token: accessToken,
  refresh_token: refreshToken
});

const googleAuth = oauth2Client;
const calendar = google.calendar({version: 'v3', auth: googleAuth});
const moment = Meteor.npmRequire("moment");

const CALENDAR_IDS = {
  rehearsal:  'scromh7crg9cm0u695pumsrb4o@group.calendar.google.com',
  show:       'm0crma3ead736lct9r0f88s1sk@group.calendar.google.com',
  other:      'ghptaulpabvqsefm19cfhokh54@group.calendar.google.com'
};

function listEvents(type, parameters, callback) {
  parameters.calendarId = CALENDAR_IDS[type];
  calendar.events.list(parameters, callback);
}

function refreshRehearsals() {
  console.log('');
  console.log("Refreshing rehearsals.");
  const cookList = Cooks.findOne({});
  const todayStart = moment().hours(0).minutes(1);
  const lastRefreshedAt = moment(cookList.lastRefreshedAt) || todayStart;
  const oneWeekFromToday = todayStart.add(31, 'days');

  console.log(`Last refreshed at ${lastRefreshedAt.format('LLL')}`)
  listEvents("rehearsal", {orderBy: "startTime", singleEvents: true, timeMin: lastRefreshedAt.format(), timeMax: oneWeekFromToday.format()}, Meteor.bindEnvironment(gotRehearsals)); 

  var pastRehearsals = 0;
  function gotRehearsals(err, results) {
    if (err) {
      console.log("Error retrieving calendar events: ", err);
      return;
    }

    Rehearsals.remove({});
    const now = moment();
    results.items.forEach(function(rehearsal) {
      const isPastRehearsal = moment(rehearsal.start.dateTime).isBefore(now);
      const humanReadableStartTime = moment(rehearsal.start.dateTime).format('LLL');
      console.log(`Got event startin at ${humanReadableStartTime}`);
      if (isPastRehearsal) {
        pastRehearsals++;
        cooks.cooked();
      } else {
        Rehearsals.insert(rehearsal);
      }
    });

    console.log(`Found ${pastRehearsals} past rehearsals`);
    Cooks.update(cookList._id, { $set: {lastRefreshedAt: now.toDate() }});
  }
}

Meteor.startup(function () {
  refreshRehearsals();
});

Meteor.methods({
  refreshRehearsals
});
