import upcomingRehearsals from './upcoming-rehearsals'

var allRehearsals = new ReactiveVar([])
var cateredRehearsals = new ReactiveVar([])

Template.body.helpers({
  rehearsals: function () {
    allRehearsals.set(upcomingRehearsals())
    return allRehearsals.get()
  }
})
