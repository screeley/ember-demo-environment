App = Em.Application.create({
  rootElement: $('#app'),
});

App.Router.map(function(){
  this.route('about');
});
