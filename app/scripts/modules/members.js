App.MemberController = Em.ObjectController.extend({
  "delete": function() {
    this.get('content').deleteRecord();
    this.get('store').commit();
  },
  edit: function() {
    this.transitionToRoute("members.edit", this);
  },
  save: function() {
    this.get('store').commit();
    this.transitionToRoute("members.index");
  },
  cancel: function() {
    this.get('store.defaultTransaction').rollback();
    this.transitionToRoute("members.index");
  },
  create: function() {
    var record = App.Member.createRecord(this.get('content'));
    this.save();
  },
  cancelNew: function() {
    this.transitionToRoute("members.index");
  }
})

App.MembersIndexController = Em.ArrayController.extend({
  itemController: "member"
})

App.MembersNewController = App.MemberController.extend({});
App.MembersEditController = App.MemberController.extend({});

App.MembersIndexRoute = Em.Route.extend({
  setupController: function(controller, model) {
    App.Org.find(App.get('orgId')).then(function(org) {
      controller.set('content', org.get('members'))
    });
    controller.set('content', Em.A());
  }
})
App.MembersEditRoute = Em.Route.extend({
  serialize: function(obj) {
    return {id: obj.get('id')};
  },
  model: function(params) {
    return App.Member.find(params.id);
  }
})

App.MembersNewRoute = Em.Route.extend({
  model: function(params) {
    return Em.Object.create({org: App.Org.find(App.get('orgId'))});
  }
})
