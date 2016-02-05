Template.cook.helpers({
  name: function() {
    var index = this.index;
    var cooks = ['thomas', 'ian', 'jeff','thomas', 'adriana', 'dane'];
    return cooks[index];
  },
  capitalize: function(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }
});

