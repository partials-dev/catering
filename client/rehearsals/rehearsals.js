import stringify from 'json-stringify-safe'
import CookList from '../session-cooks-list'
import Actions from '../../lib/collections/actions'
//import CookList from '../../lib/cooks-list'
import {CANNONICAL_COOKS} from '../../lib/cooks-list'

const cookList = new CookList();
Meteor.call('refreshRehearsals');

Template.cateredRehearsal.onCreated(function() {
  this.showFaceSelector = new ReactiveVar(false);
  this.currentAction = new ReactiveVar();
});

var cooks = function() {
  return CANNONICAL_COOKS.map(function(cook) {
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
   var cooks = CANNONICAL_COOKS;
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
   return cooks().slice(0, 2);
  },
  secondRowCooks: function() {
    return cooks().slice(2, 5);
  },
  thirdRowCooks: function() {
    return cooks().slice(5);
  },
  currentAction: function() {
    return Template.instance().currentAction.get();
  },
  repositionInsertButton: function() {
    var currentButton = $(`#insert-cook-${this.index}`)[0];
    var insertButtonDiv = $(`#insert-cook-container-${this.index}`)[0];
    var faceSelectorDiv = $(`#current-action-container-${this.index}`)[0];

    if (Template.instance().currentAction.get() === "add") {
      changeParentDiv($(currentButton), $(faceSelectorDiv));
      //return "reposition-insert raised";
    } else {
      changeParentDiv($(currentButton), $(insertButtonDiv));
      //return "";
    }
  },

  repositionSetButton: function() {
    var currentButton = $(`#set-cook-${this.index}`)[0];
    var setButtonDiv = $(`#set-button-container-${this.index}`)[0];
    var faceSelectorDiv = $(`#current-action-container-${this.index}`)[0];

    if (Template.instance().currentAction.get() === "face") {
      changeParentDiv($(currentButton), $(faceSelectorDiv));
      //return "reposition-set raised";
    } else {
      changeParentDiv($(currentButton), $(setButtonDiv));
      //return "";
    }
  }
});

var changeParentDiv = function (button, destination) {
  button.prependTo(destination);
}


var showingSnackbar = false; // prevent queuing multiple
var actionUndone = false; // So you can't mash the undo button on the snackbar and mess stuff up
function snackbarMessage (label) {
  var snackbarContainer = document.querySelector('#catering-snackbar');
  actionUndone = false; // Reset for last action clicked
  if (!this.showingSnackbar) {
    var lastAction = Actions.find().fetch().slice(-1)[0];
    var data = {
      message: label,
      timeout: 5000,
      // Find a way to kill the snackbar when the action button is pressed.
      actionHandler: () => {
        if (!actionUndone){
          cookList.undoAction(lastAction);
          actionUndone = true; // prevent multiple presses
        }
      },
      actionText: "undo"
    };
    snackbarContainer.MaterialSnackbar.showSnackbar(data);
    this.showingSnackbar = true;
    window.setTimeout( () => {this.showingSnackbar = false;}, data.timeout);
  }
}

var previouslyChecked = null;
Template.cateredRehearsal.events({
  "click .swap-button": function(event, template) {
    if (previouslyChecked) {
      Session.set("swap-button-selected-" + previouslyChecked.index, false)
      cookList.swap(this.index, previouslyChecked.index);
      previouslyChecked = null;

      snackbarMessage("Swapped.");

    } else {
      previouslyChecked = this;
      Session.set("swap-button-selected-" + this.index, true)
    }
  },
  "click .delete-cook-button": function(event, template) {
    cookList.deleteAt(this.index);

    snackbarMessage("Deleted.");
  },
  "click .insert-cook-menu-item": function(event, template) {
    var data = $(event.currentTarget).data();
    var index = data.index;
    var name = data.name;
    cookList.insertAt(index, name);

    snackbarMessage("Inserted.");
  },
  "click .set-cook-button": function(event, template) {
    template.currentAction.set("face");
    template.onSelectCook = function(name) {
      var data = $(event.currentTarget).data();
      var index = data.index;
      cookList.setAt(index, name);

      snackbarMessage("Set.");
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

      snackbarMessage("Inserted.");
    };
  },
  "click .face-selector .user": function(event, template) {
    var data = $(event.currentTarget).data();
    template.onSelectCook(data.name);
  }
});
