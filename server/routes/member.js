var _ = require('underscore')
  , store = require('./store')
/*
 * GET users listing.
 */

store.store.members = {
  0: {
    org_id: 0,
    name: 'Nina'
  },
  1: {
    org_id: 0,
    name: 'Kawan'
  },
  2: {
    org_id: 0,
    name: 'John'
  },
  3: {
    org_id: 0,
    name: 'Andy'
  },
  4: {
    org_id: 0,
    name: 'Bob'
  },
  5: {
    org_id: 0,
    name: 'Art'
  },
  6: {
    org_id: 0,
    name: 'Sean'
  }
}

var lastId = 6;

function findAll(req, res){
  if (req.param('name')) {
    res.send({members: store.findBy('members', 'name', req.param('name'))});
  }
  else if (req.param('org_id')) {
    res.send({members: store.findBy('members', 'org_id', req.param('org_id'))});
  }
  else {
    res.send({members: store.find('members')});
  }
}

function find(req, res){
  res.send({member: store.findById('members', req.param('id'))});
}

function genId() {
  lastId++;
  return lastId;
}

function post(req, res) {
  var data = _.clone(req.body.member)

  data.id = genId();

  store.store.members[data.id] = req.body.member;
  res.send({
    member: data
  });
};

function put(req, res) {
  if (store.findById('members', req.param('id'))) {
    store.store.members[Number(req.param('id'))] = req.body.member;
  }
  res.send(req.body);
};

function del(req, res) {
  delete store.store.members[Number(req.param('id'))];
  res.end('{}');
};

exports.setupRoutes = function(app) {
  app.get('/rest/1/members/:id', find);
  app.get('/rest/1/members', findAll);
  app.put('/rest/1/members/:id', put);
  app.post('/rest/1/members', post);
  app['delete']('/rest/1/members/:id', del);
};
