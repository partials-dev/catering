
Template.whatIsModal.events({
  'click .close-what-is-modal': function(event, template) {
    var dialog = $('.what-is-modal')[0];
    dialog.close();
  }
})


Tracker.autorun(function () {
  if (Meteor.user()) {
    var dialog = $('.what-is-modal')[0];
    if (dialog.attributes.open) {
      dialog.close()
    }
  }
})
