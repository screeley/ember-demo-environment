var _ = require('underscore')
/*
 * GET users listing.
 */

exports.store = {}

exports.findById = function(model, id) {
  var m = _.pick(exports.store[model], [id]);
  if (m[id]) {
    return _.values(m)[0];
  } else {
    return null;
  }
}

exports.findBy = function(model, key, value) {
  return _.map(exports.store[model], function(v, k) {
    var val = _.clone(v);
    val.id = Number(k);
    return val;
  }).filter(function(v, k) {
    return v[key] == value;
  })
}

exports.find = function(model) {
  return _.map(exports.store[model], function(v, k) {
    var val = _.clone(v);
    val.id = Number(k);
    return val;
  });
}
