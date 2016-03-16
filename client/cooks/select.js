Template.select.helpers({
  cooks: function() {
    var cooks = Session.get('cooks');
    return cooks.map(function(name, index){
      return {name: name, index: index};
    });
  }
});
