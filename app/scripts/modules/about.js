App.AboutController = Em.ObjectController.extend({
  teamVisible: false,
  toggleTeam: function() {
    this.set('teamVisible', !this.get('teamVisible'))
  },
  toggleTeamLabel: function() {
    return this.get('teamVisible') ? 'hide team' : 'show team';
  }.property('teamVisible'),
  manageTeam: function() {
    this.transitionToRoute("members.index");
  }
})

App.TeamController = Em.ArrayController.extend({
  needs: 'about',
  aboutBinding: 'controllers.about'
});

App.TeamView = Em.View.extend({
  isVisibleBinding: 'controller.about.teamVisible'
});

App.AboutRoute = Em.Route.extend({
  model: function() {
    return App.Org.find(App.get('orgId'));
  }
});
