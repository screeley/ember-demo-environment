var store = require('./store')

store.store.orgs = {
  0: {
    name: 'jubarian.org',
    description:
      'A non-profit organization of peopled dedicating to spreading joy.'
  }
}

function find(req, res){
  var data = {
    org: store.findById('orgs', req.param('id')),
  }
  if (data.org) {
    data.members = store.findBy('members', 'org_id', req.param('id'))
    data.org.member_ids = data.members.map(function(m) { return m.id })
  }
  res.send(data);
}

exports.setupRoutes = function(app) {
  app.get('/rest/1/orgs/:id', find);
};
