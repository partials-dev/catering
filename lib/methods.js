Meteor.methods({
  clearCooks: function() {
    Cooks.remove({});
  }
});
