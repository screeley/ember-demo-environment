App = Em.Application.create({
  rootElement: $('#app'),
  orgId: 0
});

App.Router.map(function(){
  this.route('about');
  this.resource('members', function() {
    this.route('new');
    this.route('edit', {path: '/edit/:id'});
  });
});

App.Store = DS.Store.extend({
  revision: 12
});

DS.RESTAdapter.reopen({
  url: '/rest/1'
});
