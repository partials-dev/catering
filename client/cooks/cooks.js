var capitalize = function(word) {
  if(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
  } else {
    return '';
  }
};

Template.cook.helpers({
  capitalize: capitalize
});
