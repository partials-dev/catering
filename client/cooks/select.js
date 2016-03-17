Template.select.helpers({
  cooks: function() {
    var cooks = window.CANNONICAL_COOKS;
    return cooks.map(function(name, index){
      return {name: name, index: index};
    });
  }
});

