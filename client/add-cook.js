Template.addCook.events({
  "click #add-button": function(event, template) {
    var name = 'thomas';
    var cooks = Session.get('cooks');
    cooks.unshift(name);
    Session.set('cooks', cooks);
  }
});
