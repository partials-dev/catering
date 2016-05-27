
Template.loginModal.events({
  'click .close-login-modal': function(event, template) {
    var dialog = $('.login-modal')[0];
    dialog.close();
  }
})


Tracker.autorun(function () {
  if (Meteor.user()) {
    var dialog = $('.login-modal')[0];
    if (dialog.attributes.open) {
      dialog.close()
    }
  }
})
