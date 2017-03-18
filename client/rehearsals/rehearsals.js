import CookList from '../session-cooks-list'
import {CANNONICAL_COOKS} from '../../lib/cooks-list'

const cookList = new CookList()
Meteor.call('refreshRehearsals')

Template.cateredRehearsal.onCreated(function () {
  this.showFaceSelector = new ReactiveVar(false)
  this.currentAction = new ReactiveVar()
})

var cannonicalCookOrder = CANNONICAL_COOKS.map(
  function (cook) { return {name: cook} }
)

Template.cateredRehearsal.helpers({
  cookData () {
    var currentCookList = cookList.readCooks()
    var index = this.index
    var name = currentCookList[index]
    var cookData = {name, index, className: 'card-bubble'}
    return cookData
  },
  getSelectedClass (index) {
    if (Session.get('swap-button-selected-' + index)) {
      return 'mdl-button--colored raised'
    } else {
      return ''
    }
  },
  up () {
    if (Template.instance().showFaceSelector.get()) {
      return 'up'
    } else {
      return ''
    }
  },
  firstRowCooks () {
    return cannonicalCookOrder.slice(0, 2)
  },
  secondRowCooks () {
    return cannonicalCookOrder.slice(2, 5)
  },
  thirdRowCooks () {
    return cannonicalCookOrder.slice(5)
  },
  currentAction () {
    return Template.instance().currentAction.get()
  },
  repositionInsertButton () {
    // TODO: using jQuery in a Meteor app has a code smell to it.
    // Try refactoring to use the template system.
    // IAN: Sounds Great! This whole animation was a mess, though.
    // I think if we don't find a functional solution within an hour, lets can it.
    var currentButton = $(`#insert-cook-${this.index}`)[0]
    var insertButtonDiv = $(`#insert-cook-container-${this.index}`)[0]
    var faceSelectorDiv = $(`#current-action-container-${this.index}`)[0]

    if (Template.instance().currentAction.get() === 'add') {
      changeParentDiv($(currentButton), $(faceSelectorDiv))
      // return "reposition-insert raised";
    } else {
      changeParentDiv($(currentButton), $(insertButtonDiv))
      // return "";
    }
  },

  repositionSetButton () {
    // TODO: see above comment about jQuery
    var currentButton = $(`#set-cook-${this.index}`)[0]
    var setButtonDiv = $(`#set-button-container-${this.index}`)[0]
    var faceSelectorDiv = $(`#current-action-container-${this.index}`)[0]

    if (Template.instance().currentAction.get() === 'face') {
      changeParentDiv($(currentButton), $(faceSelectorDiv))
      // return "reposition-set raised";
    } else {
      changeParentDiv($(currentButton), $(setButtonDiv))
      // return "";
    }
  }
})

// TODO: see above comment about jQuery
var changeParentDiv = function (button, destination) {
  button.prependTo(destination)
}

function snackbarMessage (label) {
  var snackbarContainer = document.querySelector('#catering-snackbar')
  var data = {
    message: label,
    timeout: 2000
  }
  snackbarContainer.MaterialSnackbar.showSnackbar(data)
}

var previouslyChecked = null
Template.cateredRehearsal.events({
  'click .swap-button': function (event, template) {
    if (previouslyChecked) {
      Session.set('swap-button-selected-' + previouslyChecked.index, false)
      cookList.swap(this.index, previouslyChecked.index)
      previouslyChecked = null

      snackbarMessage('Swapped.')
    } else {
      previouslyChecked = this
      Session.set('swap-button-selected-' + this.index, true)
    }
  },
  'click .delete-cook-button': function (event, template) {
    cookList.deleteAt(this.index)

    snackbarMessage('Deleted.')
  },
  'click .insert-cook-menu-item': function (event, template) {
    var {index, name} = $(event.currentTarget).data()
    cookList.insertAt(index, name)
    snackbarMessage('Inserted.')
  },
  'click .set-cook-button': function (event, template) {
    template.currentAction.set('face')
    template.onSelectCook = function (name) {
      var {index} = $(event.currentTarget).data()
      cookList.setAt(index, name)
      snackbarMessage('Set.')
    }
  },
  'click .uses-face-selector': function (event, template) {
    template.showFaceSelector.set(true)
  },
  'click .face-selector': function (event, template) {
    template.currentAction.set(null)
    template.showFaceSelector.set(false)
    template.onSelectCook = undefined
  },
  'click .insert-cook-button': function (event, template) {
    template.currentAction.set('add')
    template.onSelectCook = function (name) {
      var data = $(event.currentTarget).data()
      var index = data.index
      cookList.insertAt(index, name)

      snackbarMessage('Inserted.')
    }
  },
  'click .face-selector .user': function (event, template) {
    var data = $(event.currentTarget).data()
    template.onSelectCook(data.name)
  }
})
