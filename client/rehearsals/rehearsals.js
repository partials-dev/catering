Template.rehearsal.helpers({
  cookData: function() {
    var cooks = Session.get('cooks');
    var index = this.index;
    var name = cooks[index];
    var cookData = {name: name, index: this.index, className: 'card-bubble'};
    return cookData;
  },
  getSelectedClass: function(index) {
    if (Session.get("swap-button-selected-" + index)) {
      return "mdl-button--colored";
    } else {
      return "";
    }
  },
  cannonicalCooks: function() {
   var cooks = window.CANNONICAL_COOKS;
   return cooks.map(function(name){
     return {name:name};
   })
  }
});

var previouslyChecked = null;
Template.rehearsal.events({
  "click .swap-button": function(event, template) {
    if (previouslyChecked) {
      Session.set("swap-button-selected-" + previouslyChecked.index, false)
      window.cookList.swap(this.index, previouslyChecked.index);
      previouslyChecked = null;
    } else {
      previouslyChecked = this;
      Session.set("swap-button-selected-" + this.index, true)
    }
  },
  "click .delete-cook-button": function(event, template) {
    window.cookList.deleteAt(this.index);
  },
  "click .add-cook-button": function(event, template) {
    var name = $(event.currentTarget).data().name;
    window.cookList.prepend(name);
  }
});
