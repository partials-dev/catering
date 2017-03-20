var require = meteorInstall({"lib":{"collections":{"actions.js":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                 //
// lib/collections/actions.js                                                                                      //
//                                                                                                                 //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                   //
var Actions = new Mongo.Collection('actions');                                                                     // 1
module.export("default", exports.default = Actions);                                                               // 1
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"cooks.js":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                 //
// lib/collections/cooks.js                                                                                        //
//                                                                                                                 //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                   //
var Cooks = new Mongo.Collection('cooks');                                                                         // 1
module.export("default", exports.default = Cooks);                                                                 // 1
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"rehearsals.js":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                 //
// lib/collections/rehearsals.js                                                                                   //
//                                                                                                                 //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                   //
var Rehearsals = new Mongo.Collection('rehearsals');                                                               // 1
module.export("default", exports.default = Rehearsals);                                                            // 1
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"accounts-config.js":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                 //
// lib/accounts-config.js                                                                                          //
//                                                                                                                 //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                   //
AccountsTemplates.configure({                                                                                      // 1
  forbidClientAccountCreation: true,                                                                               // 2
  hideSignUpLink: true                                                                                             // 3
});                                                                                                                // 1
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"cooks-list.js":["babel-runtime/helpers/classCallCheck","./collections/cooks","./collections/actions",function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                 //
// lib/cooks-list.js                                                                                               //
//                                                                                                                 //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                   //
var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");                                            //
                                                                                                                   //
var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);                                                   //
                                                                                                                   //
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }                  //
                                                                                                                   //
module.export({                                                                                                    // 1
  CANNONICAL_COOKS: function () {                                                                                  // 1
    return CANNONICAL_COOKS;                                                                                       // 1
  },                                                                                                               // 1
  "default": function () {                                                                                         // 1
    return CooksList;                                                                                              // 1
  }                                                                                                                // 1
});                                                                                                                // 1
var Cooks = void 0;                                                                                                // 1
module.import('./collections/cooks', {                                                                             // 1
  "default": function (v) {                                                                                        // 1
    Cooks = v;                                                                                                     // 1
  }                                                                                                                // 1
}, 0);                                                                                                             // 1
var Actions = void 0;                                                                                              // 1
module.import('./collections/actions', {                                                                           // 1
  "default": function (v) {                                                                                        // 1
    Actions = v;                                                                                                   // 1
  }                                                                                                                // 1
}, 1);                                                                                                             // 1
var CANNONICAL_COOKS = ['thomas', 'ian', 'alex', 'jeff', 'adriana', 'dane'];                                       // 5
var cooksDep = new Tracker.Dependency();                                                                           // 7
                                                                                                                   //
function generateFollowers() {                                                                                     // 9
  var followers = {};                                                                                              // 10
                                                                                                                   //
  for (var i = 0; i < CANNONICAL_COOKS.length; i++) {                                                              // 11
    var thisCook = CANNONICAL_COOKS[i];                                                                            // 12
    var nextCook = null;                                                                                           // 13
                                                                                                                   //
    if (CANNONICAL_COOKS[i + 1]) {                                                                                 // 14
      nextCook = CANNONICAL_COOKS[i + 1];                                                                          // 15
    } else {                                                                                                       // 16
      nextCook = CANNONICAL_COOKS[0];                                                                              // 17
    }                                                                                                              // 18
                                                                                                                   //
    followers[thisCook] = nextCook;                                                                                // 19
  }                                                                                                                // 20
                                                                                                                   //
  return followers;                                                                                                // 21
}                                                                                                                  // 22
                                                                                                                   //
function logAction(type, name, i, previousCook, isUndo) {                                                          // 24
  var isLoggedInClient = Meteor.isClient && Meteor.user();                                                         // 25
  var canSaveChanges = isLoggedInClient || Meteor.isServer;                                                        // 26
                                                                                                                   //
  if (canSaveChanges && !isUndo) {                                                                                 // 27
    Actions.insert({                                                                                               // 28
      type: type,                                                                                                  // 29
      name: name,                                                                                                  // 30
      index: i,                                                                                                    // 31
      previousCook: previousCook,                                                                                  // 32
      createdAt: new Date()                                                                                        // 33
    });                                                                                                            // 28
  }                                                                                                                // 35
}                                                                                                                  // 36
                                                                                                                   //
var followers = generateFollowers();                                                                               // 38
                                                                                                                   //
var CooksList = function () {                                                                                      //
  function CooksList() {                                                                                           // 41
    (0, _classCallCheck3.default)(this, CooksList);                                                                // 41
    this.dependency = cooksDep;                                                                                    // 42
  }                                                                                                                // 43
                                                                                                                   //
  CooksList.prototype.prepend = function () {                                                                      //
    function prepend(name) {                                                                                       //
      var cooks = this.readCooks();                                                                                // 46
      cooks.unshift(name);                                                                                         // 47
      this.writeCooks(cooks);                                                                                      // 48
    }                                                                                                              // 49
                                                                                                                   //
    return prepend;                                                                                                //
  }();                                                                                                             //
                                                                                                                   //
  CooksList.prototype.getAt = function () {                                                                        //
    function getAt(i) {                                                                                            //
      var cooks = this.readCooks();                                                                                // 52
      this.ensureIndexExists(i);                                                                                   // 53
      return cooks[i];                                                                                             // 54
    }                                                                                                              // 55
                                                                                                                   //
    return getAt;                                                                                                  //
  }();                                                                                                             //
                                                                                                                   //
  CooksList.prototype.cooked = function () {                                                                       //
    function cooked() {                                                                                            //
      this.generateNextCook();                                                                                     // 58
      var cooks = this.readCooks();                                                                                // 59
      var name = cooks[0];                                                                                         // 60
      cooks.shift();                                                                                               // 61
      this.writeCooks(cooks);                                                                                      // 62
      logAction('cooked', name, 0);                                                                                // 63
    }                                                                                                              // 64
                                                                                                                   //
    return cooked;                                                                                                 //
  }();                                                                                                             //
                                                                                                                   //
  CooksList.prototype.setAt = function () {                                                                        //
    function setAt(i, name, isSwap, isUndo) {                                                                      //
      var cooks = this.readCooks();                                                                                // 67
      this.ensureIndexExists(i);                                                                                   // 68
      var previousCook = cooks[i];                                                                                 // 69
      cooks[i] = name;                                                                                             // 70
      this.writeCooks(cooks);                                                                                      // 71
                                                                                                                   //
      if (!isSwap) {                                                                                               // 72
        logAction('set', name, i, previousCook, isUndo);                                                           // 73
      }                                                                                                            // 74
    }                                                                                                              // 75
                                                                                                                   //
    return setAt;                                                                                                  //
  }();                                                                                                             //
                                                                                                                   //
  CooksList.prototype.deleteAt = function () {                                                                     //
    function deleteAt(index, isUndo) {                                                                             //
      this.generateNextCook();                                                                                     // 78
      var cooks = this.readCooks();                                                                                // 79
      logAction('delete', cooks[index], index, null, isUndo);                                                      // 80
      cooks.splice(index, 1);                                                                                      // 81
      this.writeCooks(cooks);                                                                                      // 82
    }                                                                                                              // 83
                                                                                                                   //
    return deleteAt;                                                                                               //
  }();                                                                                                             //
                                                                                                                   //
  CooksList.prototype.insertAt = function () {                                                                     //
    function insertAt(index, name, isUndo) {                                                                       //
      var cooks = this.readCooks();                                                                                // 86
      cooks.splice(index, 0, name);                                                                                // 87
      this.writeCooks(cooks);                                                                                      // 88
      logAction('insert', name, index, null, isUndo);                                                              // 89
    }                                                                                                              // 90
                                                                                                                   //
    return insertAt;                                                                                               //
  }();                                                                                                             //
                                                                                                                   //
  CooksList.prototype.swap = function () {                                                                         //
    function swap(i1, i2, isUndo) {                                                                                //
      var firstPerson = this.getAt(i1);                                                                            // 93
      var secondPerson = this.getAt(i2);                                                                           // 94
      this.setAt(i1, secondPerson, true);                                                                          // 95
      this.setAt(i2, firstPerson, true);                                                                           // 96
      logAction('swap', [firstPerson, secondPerson], [i1, i2], null, isUndo);                                      // 97
    }                                                                                                              // 98
                                                                                                                   //
    return swap;                                                                                                   //
  }();                                                                                                             //
                                                                                                                   //
  CooksList.prototype.undoAction = function () {                                                                   //
    function undoAction(action) {                                                                                  //
      switch (action.type) {                                                                                       // 101
        // TODO: add a linter to this project. Run it, and make sure it passes.                                    // 102
        // I recommend JavaScript standard style:                                                                  // 103
        // https://github.com/feross/standard#what-you-might-do-if-youre-clever                                    // 104
        case 'cooked':                                                                                             // 105
          this.setAt(0, action.name, false, true);                                                                 // 106
          break;                                                                                                   // 107
                                                                                                                   //
        case 'set':                                                                                                // 108
          this.setAt(action.index, action.previousCook, false, true);                                              // 109
          break;                                                                                                   // 110
                                                                                                                   //
        case 'delete':                                                                                             // 111
          this.insertAt(action.index, action.name, true);                                                          // 112
          break;                                                                                                   // 113
                                                                                                                   //
        case 'insert':                                                                                             // 114
          this.deleteAt(action.index, true);                                                                       // 115
          break;                                                                                                   // 116
                                                                                                                   //
        case 'swap':                                                                                               // 117
          this.swap(action.index[0], action.index[1], true);                                                       // 118
          break;                                                                                                   // 119
      }                                                                                                            // 101
                                                                                                                   //
      Actions.remove(action._id);                                                                                  // 121
    }                                                                                                              // 122
                                                                                                                   //
    return undoAction;                                                                                             //
  }();                                                                                                             //
                                                                                                                   //
  CooksList.prototype.ensureIndexExists = function () {                                                            //
    function ensureIndexExists(i) {                                                                                //
      var cooks = this.readCooks();                                                                                // 125
      var lastIndex = cooks.length - 1;                                                                            // 126
                                                                                                                   //
      while (i > lastIndex) {                                                                                      // 127
        this.generateNextCook();                                                                                   // 128
        cooks = this.readCooks();                                                                                  // 129
        lastIndex = cooks.length - 1;                                                                              // 130
      }                                                                                                            // 131
    }                                                                                                              // 132
                                                                                                                   //
    return ensureIndexExists;                                                                                      //
  }();                                                                                                             //
                                                                                                                   //
  CooksList.prototype.generateNextCook = function () {                                                             //
    function generateNextCook() {                                                                                  //
      var cooks = this.readCooks();                                                                                // 135
      var lastIndex = cooks.length - 1;                                                                            // 136
      var lastCook = cooks[lastIndex];                                                                             // 137
      var nextCook = this.whoFollows(lastCook);                                                                    // 138
      cooks.push(nextCook);                                                                                        // 139
      this.writeCooks(cooks);                                                                                      // 140
    }                                                                                                              // 141
                                                                                                                   //
    return generateNextCook;                                                                                       //
  }();                                                                                                             //
                                                                                                                   //
  CooksList.prototype.whoFollows = function () {                                                                   //
    function whoFollows(name) {                                                                                    //
      return followers[name];                                                                                      // 144
    }                                                                                                              // 145
                                                                                                                   //
    return whoFollows;                                                                                             //
  }();                                                                                                             //
                                                                                                                   //
  CooksList.prototype.readCooks = function () {                                                                    //
    function readCooks() {                                                                                         //
      cooksDep.depend();                                                                                           // 148
      this.checkCooks();                                                                                           // 149
      var doc = Cooks.findOne({});                                                                                 // 150
                                                                                                                   //
      if (doc) {                                                                                                   // 151
        return doc.value;                                                                                          // 152
      }                                                                                                            // 153
    }                                                                                                              // 154
                                                                                                                   //
    return readCooks;                                                                                              //
  }();                                                                                                             //
                                                                                                                   //
  CooksList.prototype.checkCooks = function () {                                                                   //
    function checkCooks() {                                                                                        //
      if (Meteor.isServer) {                                                                                       // 157
        var docs = Cooks.find({}).fetch();                                                                         // 158
                                                                                                                   //
        if (docs.length > 1) {                                                                                     // 159
          throw new Error("Found more than one cooks document in the cooks collection: " + JSON.stringify(docs));  // 160
        } else if (docs.length === 0) {                                                                            // 161
          throw new Error('No documents in Cooks collection.');                                                    // 162
        } else if (docs[0] && !docs[0].value) {                                                                    // 163
          throw new Error('Document is missing value property');                                                   // 164
        }                                                                                                          // 165
      }                                                                                                            // 166
    }                                                                                                              // 167
                                                                                                                   //
    return checkCooks;                                                                                             //
  }();                                                                                                             //
                                                                                                                   //
  CooksList.prototype.writeCooks = function () {                                                                   //
    function writeCooks(cooks) {                                                                                   //
      this.checkCooks();                                                                                           // 170
      var doc = Cooks.findOne({});                                                                                 // 171
                                                                                                                   //
      if (doc) {                                                                                                   // 172
        Cooks.update(doc._id, {                                                                                    // 173
          $set: {                                                                                                  // 173
            value: cooks                                                                                           // 173
          }                                                                                                        // 173
        });                                                                                                        // 173
      } else {                                                                                                     // 174
        console.log('Inserting cooks');                                                                            // 175
        Cooks.insert({                                                                                             // 176
          value: cooks                                                                                             // 176
        });                                                                                                        // 176
      }                                                                                                            // 177
                                                                                                                   //
      cooksDep.changed();                                                                                          // 178
    }                                                                                                              // 179
                                                                                                                   //
    return writeCooks;                                                                                             //
  }();                                                                                                             //
                                                                                                                   //
  CooksList.prototype.count = function () {                                                                        //
    function count() {                                                                                             //
      return this.readCooks().length;                                                                              // 182
    }                                                                                                              // 183
                                                                                                                   //
    return count;                                                                                                  //
  }();                                                                                                             //
                                                                                                                   //
  return CooksList;                                                                                                //
}();                                                                                                               //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}],"methods.js":["./collections/cooks",function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                 //
// lib/methods.js                                                                                                  //
//                                                                                                                 //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                   //
var Cooks = void 0;                                                                                                // 1
module.import('./collections/cooks', {                                                                             // 1
  "default": function (v) {                                                                                        // 1
    Cooks = v;                                                                                                     // 1
  }                                                                                                                // 1
}, 0);                                                                                                             // 1
Meteor.methods({                                                                                                   // 3
  clearCooks: function () {                                                                                        // 4
    Cooks.remove({});                                                                                              // 5
  }                                                                                                                // 6
});                                                                                                                // 3
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}]},"server":{"gitignore":{"google-calendar-refresh-token.js":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                 //
// server/gitignore/google-calendar-refresh-token.js                                                               //
//                                                                                                                 //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                   //
global.googleCalendarRefreshToken = "1/dKHJZAaUWC7C4ZmOrT99qHDKuXuVxsvyrEp8AWe_s7FIgOrJDtdun6zK6XiATCKT";          // 1
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"google-client-secret.js":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                 //
// server/gitignore/google-client-secret.js                                                                        //
//                                                                                                                 //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                   //
global.googleClientSecrets = {                                                                                     // 1
  "web": {                                                                                                         // 1
    "client_id": "650934664824-9jkko6s2klfnsncep2h1bbl9n01fepju.apps.googleusercontent.com",                       // 1
    "project_id": "poetic-genius-115422",                                                                          // 1
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",                                                       // 1
    "token_uri": "https://accounts.google.com/o/oauth2/token",                                                     // 1
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",                                   // 1
    "client_secret": "mPReJ6Hv-oJ3gcvDL2v2d6iY",                                                                   // 1
    "redirect_uris": ["http://dev.partialcinema.com/helper/auth", "http://dev.partialcinema.com:3000/helper/auth"]
  }                                                                                                                // 1
};                                                                                                                 // 1
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"user-credentials.js":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                 //
// server/gitignore/user-credentials.js                                                                            //
//                                                                                                                 //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                   //
module.export("default", exports.default = {                                                                       // 1
  username: 'partials',                                                                                            // 2
  email: 'partialcinemabooking@gmail.com',                                                                         // 3
  password: 'Cateringb1rd'                                                                                         // 4
});                                                                                                                // 1
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"calendar.js":["../lib/cooks-list","../lib/collections/cooks","../lib/collections/rehearsals","./cooks",function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                 //
// server/calendar.js                                                                                              //
//                                                                                                                 //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                   //
var CookList = void 0;                                                                                             // 1
module.import('../lib/cooks-list', {                                                                               // 1
  "default": function (v) {                                                                                        // 1
    CookList = v;                                                                                                  // 1
  }                                                                                                                // 1
}, 0);                                                                                                             // 1
var Cooks = void 0;                                                                                                // 1
module.import('../lib/collections/cooks', {                                                                        // 1
  "default": function (v) {                                                                                        // 1
    Cooks = v;                                                                                                     // 1
  }                                                                                                                // 1
}, 1);                                                                                                             // 1
var Rehearsals = void 0;                                                                                           // 1
module.import('../lib/collections/rehearsals', {                                                                   // 1
  "default": function (v) {                                                                                        // 1
    Rehearsals = v;                                                                                                // 1
  }                                                                                                                // 1
}, 2);                                                                                                             // 1
var rebuildCooks = void 0;                                                                                         // 1
module.import('./cooks', {                                                                                         // 1
  "default": function (v) {                                                                                        // 1
    rebuildCooks = v;                                                                                              // 1
  }                                                                                                                // 1
}, 3);                                                                                                             // 1
rebuildCooks();                                                                                                    // 6
var cooks = new CookList();                                                                                        // 8
var google = Meteor.npmRequire('googleapis'); // const scopes = ['https://www.googleapis.com/auth/calendar']       // 10
                                                                                                                   //
var CLIENT_ID = global.googleClientSecrets.web.client_id;                                                          // 12
var CLIENT_SECRET = global.googleClientSecrets.web.client_secret;                                                  // 13
var OAuth2 = google.auth.OAuth2;                                                                                   // 15
var oauth2Client = new OAuth2(CLIENT_ID, CLIENT_SECRET, 'http://dev.partialcinema.com:3000/helper/auth');          // 16
var accessToken = null;                                                                                            // 17
var refreshToken = global.googleCalendarRefreshToken;                                                              // 18
oauth2Client.setCredentials({                                                                                      // 20
  access_token: accessToken,                                                                                       // 21
  refresh_token: refreshToken                                                                                      // 22
});                                                                                                                // 20
var googleAuth = oauth2Client;                                                                                     // 25
var calendar = google.calendar({                                                                                   // 26
  version: 'v3',                                                                                                   // 26
  auth: googleAuth                                                                                                 // 26
});                                                                                                                // 26
var moment = Meteor.npmRequire('moment');                                                                          // 27
var CALENDAR_IDS = {                                                                                               // 29
  rehearsal: 'scromh7crg9cm0u695pumsrb4o@group.calendar.google.com',                                               // 30
  show: 'm0crma3ead736lct9r0f88s1sk@group.calendar.google.com',                                                    // 31
  other: 'ghptaulpabvqsefm19cfhokh54@group.calendar.google.com'                                                    // 32
};                                                                                                                 // 29
                                                                                                                   //
function listEvents(type, parameters, callback) {                                                                  // 35
  parameters.calendarId = CALENDAR_IDS[type];                                                                      // 36
  calendar.events.list(parameters, callback);                                                                      // 37
}                                                                                                                  // 38
                                                                                                                   //
function refreshRehearsals() {                                                                                     // 40
  console.log('Refreshing rehearsals.');                                                                           // 41
  var cookList = Cooks.findOne({});                                                                                // 42
  var todayStart = moment().hours(0).minutes(1);                                                                   // 43
  var lastRefreshedAt = moment(cookList.lastRefreshedAt) || todayStart;                                            // 44
  var oneWeekFromToday = todayStart.add(31, 'days');                                                               // 45
  console.log("Last refreshed at " + lastRefreshedAt.format('LLL'));                                               // 47
  listEvents('rehearsal', {                                                                                        // 48
    orderBy: 'startTime',                                                                                          // 48
    singleEvents: true,                                                                                            // 48
    timeMin: lastRefreshedAt.format(),                                                                             // 48
    timeMax: oneWeekFromToday.format()                                                                             // 48
  }, Meteor.bindEnvironment(gotRehearsals));                                                                       // 48
  var pastRehearsals = 0;                                                                                          // 50
                                                                                                                   //
  function gotRehearsals(err, results) {                                                                           // 51
    if (err) {                                                                                                     // 52
      console.log('Error retrieving calendar events: ', err);                                                      // 53
      return;                                                                                                      // 54
    }                                                                                                              // 55
                                                                                                                   //
    Rehearsals.remove({});                                                                                         // 57
    var now = moment();                                                                                            // 58
    results.items.forEach(function (rehearsal) {                                                                   // 59
      var isPastRehearsal = moment(rehearsal.start.dateTime).isBefore(now); // const humanReadableStartTime = moment(rehearsal.start.dateTime).format('LLL')
                                                                                                                   //
      rehearsal.description = rehearsal.description || '';                                                         // 62
      var catered = rehearsal.description.indexOf('uncatered') < 0; // console.log(`Got event startin at ${humanReadableStartTime}`)
                                                                                                                   //
      if (isPastRehearsal) {                                                                                       // 65
        pastRehearsals++;                                                                                          // 66
        cooks.cooked();                                                                                            // 67
      } else if (catered) {                                                                                        // 68
        Rehearsals.insert(rehearsal);                                                                              // 69
                                                                                                                   //
        if (Rehearsals.find().count() > cooks.count()) {                                                           // 70
          cooks.generateNextCook();                                                                                // 71
        }                                                                                                          // 72
      }                                                                                                            // 73
    });                                                                                                            // 74
    console.log("Found " + pastRehearsals + " past rehearsals");                                                   // 76
    Cooks.update(cookList._id, {                                                                                   // 77
      $set: {                                                                                                      // 77
        lastRefreshedAt: now.toDate()                                                                              // 77
      }                                                                                                            // 77
    });                                                                                                            // 77
  }                                                                                                                // 78
}                                                                                                                  // 79
                                                                                                                   //
Meteor.startup(function () {                                                                                       // 81
  refreshRehearsals();                                                                                             // 82
});                                                                                                                // 83
Meteor.methods({                                                                                                   // 85
  refreshRehearsals: refreshRehearsals                                                                             // 86
});                                                                                                                // 85
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}],"cooks.js":["../lib/collections/cooks","../lib/cooks-list",function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                 //
// server/cooks.js                                                                                                 //
//                                                                                                                 //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                   //
module.export({                                                                                                    // 1
  "default": function () {                                                                                         // 1
    return rebuildCooks;                                                                                           // 1
  }                                                                                                                // 1
});                                                                                                                // 1
var Cooks = void 0;                                                                                                // 1
module.import('../lib/collections/cooks', {                                                                        // 1
  "default": function (v) {                                                                                        // 1
    Cooks = v;                                                                                                     // 1
  }                                                                                                                // 1
}, 0);                                                                                                             // 1
var CANNONICAL_COOKS = void 0;                                                                                     // 1
module.import('../lib/cooks-list', {                                                                               // 1
  "CANNONICAL_COOKS": function (v) {                                                                               // 1
    CANNONICAL_COOKS = v;                                                                                          // 1
  }                                                                                                                // 1
}, 1);                                                                                                             // 1
                                                                                                                   //
function rebuildCooks() {                                                                                          // 4
  var cookList = Cooks.findOne({});                                                                                // 5
                                                                                                                   //
  if (!cookList || !cookList.value || cookList.value.length === 0) {                                               // 7
    console.log('rebuilding cooks');                                                                               // 8
    Cooks.remove({});                                                                                              // 9
    Cooks.insert({                                                                                                 // 10
      value: CANNONICAL_COOKS                                                                                      // 10
    });                                                                                                            // 10
  }                                                                                                                // 11
}                                                                                                                  // 12
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}],"default-user.js":["./gitignore/user-credentials","meteor/accounts-base",function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                 //
// server/default-user.js                                                                                          //
//                                                                                                                 //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                   //
var defaultUserCredentials = void 0;                                                                               // 1
module.import('./gitignore/user-credentials', {                                                                    // 1
  "default": function (v) {                                                                                        // 1
    defaultUserCredentials = v;                                                                                    // 1
  }                                                                                                                // 1
}, 0);                                                                                                             // 1
var Accounts = void 0;                                                                                             // 1
module.import('meteor/accounts-base', {                                                                            // 1
  "Accounts": function (v) {                                                                                       // 1
    Accounts = v;                                                                                                  // 1
  }                                                                                                                // 1
}, 1);                                                                                                             // 1
// import stringify from 'json-stringify-safe'                                                                     // 3
var existingUser = Accounts.findUserByUsername(defaultUserCredentials.username); // const allAccounts = Meteor.users.find({}).fetch()
// console.log(`Existing user: ${stringify(allAccounts)}`)                                                         // 8
                                                                                                                   //
if (!existingUser) {                                                                                               // 10
  Accounts.createUser(defaultUserCredentials);                                                                     // 11
}                                                                                                                  // 12
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}]}},{"extensions":[".js",".json"]});
require("./lib/collections/actions.js");
require("./lib/collections/cooks.js");
require("./lib/collections/rehearsals.js");
require("./lib/accounts-config.js");
require("./lib/cooks-list.js");
require("./lib/methods.js");
require("./server/gitignore/google-calendar-refresh-token.js");
require("./server/gitignore/google-client-secret.js");
require("./server/gitignore/user-credentials.js");
require("./server/calendar.js");
require("./server/cooks.js");
require("./server/default-user.js");
//# sourceMappingURL=app.js.map
