//import CookList from '../session-cooks-list'
import CookList from '../../lib/cooks-list'

const cookList = new CookList();
Meteor.call('refreshRehearsals');

Template.cateredRehearsal.onCreated(function() {
  this.showFaceSelector = new ReactiveVar(false);
  this.currentAction = new ReactiveVar();
});

var cooks = function() {
  return cookList.CANNONICAL_COOKS.map(function(cook) {
    return {name: cook};
  });
}

Template.cateredRehearsal.helpers({
  cookData: function() {
    var cooks = cookList.readCooks();
    var index = this.index;
    var name = cooks[index];
    var cookData = {name: name, index: this.index, className: 'card-bubble'};
    return cookData;
  },
  getSelectedClass: function(index) {
    if (Session.get("swap-button-selected-" + index)) {
      return "mdl-button--colored raised";
    } else {
      return "";
    }
  },
  cannonicalCooks: function() {
   var cooks = cookList.CANNONICAL_COOKS;
   var index = this.index;
   return cooks.map(function(name){
     return {name:name, index:index};
   })
  },
  up: function() {
    if(Template.instance().showFaceSelector.get()) {
      return 'up';
    } else {
      return '';
    }
  },
  firstRowCooks: function() {
   return cooks().slice(0,2); 
  },
  secondRowCooks: function() {
    return cooks().slice(2);
  },
  currentAction: function() {
    return Template.instance().currentAction.get();
  },
  repositionInsertButton: function() {
    if (Template.instance().currentAction.get() === "add") {
      return "reposition-insert raised";
    } else {
      return "";
    }
  },
  repositionSetButton: function() {
    if (Template.instance().currentAction.get() === "face") {
      return "reposition-set raised";
    } else {
      return "";    
    }
  }
});

var previouslyChecked = null;
Template.cateredRehearsal.events({
  "click .swap-button": function(event, template) {
    if (previouslyChecked) {
      Session.set("swap-button-selected-" + previouslyChecked.index, false)
      cookList.swap(this.index, previouslyChecked.index);
      previouslyChecked = null;
    } else {
      previouslyChecked = this;
      Session.set("swap-button-selected-" + this.index, true)
    }
  },
  "click .delete-cook-button": function(event, template) {
    cookList.deleteAt(this.index);
  },
  "click .insert-cook-menu-item": function(event, template) {
    var data = $(event.currentTarget).data(); 
    var index = data.index;
    var name = data.name;
    cookList.insertAt(index, name);
  },
  "click .set-cook-button": function(event, template) {
    template.currentAction.set("face");
    template.onSelectCook = function(name) {
      var data = $(event.currentTarget).data(); 
      var index = data.index;
      cookList.setAt(index, name);
    };
  },
  "click .uses-face-selector": function(event, template) {
    template.showFaceSelector.set(true);
    //$target = $(event.currentTarget);
    //$target.removeClass("mdl-button--fab");
    //$target.addClass("mdl-button--raised");
  },
  "click .face-selector": function(event, template) {
    template.currentAction.set(null);
    template.showFaceSelector.set(false);
    template.onSelectCook = undefined;
  },
  "click .insert-cook-button": function(event, template) {
    template.currentAction.set("add");
    template.onSelectCook = function(name) {
      var data = $(event.currentTarget).data(); 
      var index = data.index;
      cookList.insertAt(index, name);
    };
  },
  "click .face-selector .user": function(event, template) {
    var data = $(event.currentTarget).data(); 
    template.onSelectCook(data.name);
  }
});
