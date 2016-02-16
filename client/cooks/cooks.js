var capitalize = function(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
};

Template.cook.helpers({
  capitalize: capitalize
});
