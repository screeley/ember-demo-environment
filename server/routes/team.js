var _ = require('underscore')
/*
 * GET users listing.
 */

var store = {
  "members": {
    0: {
      name: 'Nina'
    },
    1: {
      name: 'Kawan'
    },
    2: {
      name: 'John'
    },
    3: {
      name: 'Andy'
    },
    4: {
      name: 'Bob'
    },
    5: {
      name: 'Art'
    },
    6: {
      name: 'Sean'
    }
  }
}

function findMemberById(id) {
  var m = _.pick(store.members, [id]);
  if (m[id]) {
    m[id].id = Number(id)
    return _.values(m);
  } else {
    return [];
  }
}

function findMemberByName(name) {
  return _.map(store.members, function(v, k) {
    var val = _.clone(v);
    val.id = Number(k);
    return val;
  }).filter(function(v, k) {
    return v.name == name;
  })
}

function findMembers() {
  return _.map(store.members, function(v, k) {
    var val = _.clone(v);
    val.id = Number(k);
    return val;
  });
}


exports.list = function(req, res){
  if (req.method == 'GET') {
    if (req.param('id')) {
      res.send({members: findMemberById(req.param('id'))});
    }
    else if (req.param('name')) {
      res.send({members: findMemberByName(req.param('name'))});
    }
    else {
      res.send({members: findMembers()});
    }
  }
  else if (req.method == 'POST' || req.method == 'PUT') {
    var data = _.clone(req.body)
      , id = data.id;
    delete data.id;
    store.members[Number(id)] = data;
    res.send(req.body);
  }
  else if (req.method == 'DELETE' && req.param('id')) {
  }
};
