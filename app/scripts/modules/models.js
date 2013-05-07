App.Org = DS.Model.extend({
  name: DS.attr('string'),
  description: DS.attr('string'),
  members: DS.hasMany('App.Member')
});

App.Member = DS.Model.extend({
  name: DS.attr('string'),
  org: DS.belongsTo('App.Org')
});
