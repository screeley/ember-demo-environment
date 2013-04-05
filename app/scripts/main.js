App = Em.Application.create({
  rootElement: $('#app'),
});

App.Router.map(function(){
  this.route('about');
  this.resource('company', function(){
    this.route('legal');
    this.route('team');
  });
});


App.CompanyTeamRoute = Em.Route.extend({
  renderTemplate: function(controller, model){
    // Render the base template
    this._super(controller, model);
    // Render the bios template into the sidebar
    this.render('bios', {outlet: 'sidebar'});
  }
});