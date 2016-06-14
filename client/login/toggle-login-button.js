import dialogPolyfill from "dialog-polyfill";

var showLoginModal = new ReactiveVar(false);
Template.registerHelper('showLoginModal', function(){ return showLoginModal.get(); });

Template.toggleLoginButton.helpers({
  buttonText: function() {
    if (Meteor.user()) {
      return 'Logout';
    } else {
      return 'Login';
    }
  }
})

Template.toggleLoginButton.events({
  'click .toggle-login-button': function(event, template) {
    var dialog = $('.login-modal')[0];
    if (!dialog.showModal) {
      dialogPolyfill.registerDialog(dialog);
    }

    if (Meteor.user()) {
      Meteor.logout(); 
    } else {
      dialog.showModal();
    }
  }
})

