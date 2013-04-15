App.Fixtures = App.Fixtures || {};

// our model
App.Fixtures.Org = {
  name: 'jubarian.org',
  description:
    'A non-profit organization of peopled dedicating to spreading joy.'
}

App.Fixtures.Team = [
  { name: 'Bob' },
  { name: 'Andy' },
  { name: 'John' },
  { name: 'Kawan' },
  { name: 'Nina' },
  { name: 'Sean' },
  { name: 'Art' }
];

App.AboutController = Em.ObjectController.extend({
  teamVisible: false,
  toggleTeam: function() {
    this.set('teamVisible', !this.get('teamVisible'))
  },
  toggleTeamLabel: function() {
    var vis = this.get('teamVisible');
    return vis ? 'hide team' : 'show team';
  }.property('teamVisible')
})

App.TeamController = Em.ArrayController.extend({
  needs: 'about',
  aboutBinding: 'controllers.about'
});

App.TeamView = Em.View.extend({
  isVisibleBinding: 'controller.about.teamVisible',
});

App.AboutRoute = Em.Route.extend({
  model: function() {
    return App.Fixtures.Org;
  }
});

