import Cooks from './collections/cooks';

Meteor.methods({
  clearCooks: function() {
    Cooks.remove({});
  }
});
