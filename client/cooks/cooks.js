import {CANNONICAL_COOKS} from '../../lib/cooks-list'

var addRule = function (rule) {
  sheet = document.styleSheets[1]
  sheet.insertRule(rule, 0)
}

var generateUserStyle = function () {
  cooks = CANNONICAL_COOKS

  for (var i = 0; i < cooks.length; i++) {
    var name = cooks[i]
    var url = `${name}.jpg`
    var newRule = `#catering .${name} { background-image: URL('${url}'), URL('no-pic.jpg') !important;}`
    addRule(newRule)
  }
}

generateUserStyle()

var capitalize = function (word) {
  if (word) {
    return word.charAt(0).toUpperCase() + word.slice(1)
  } else {
    return ''
  }
}

Template.cook.helpers({
  capitalize: capitalize
})
