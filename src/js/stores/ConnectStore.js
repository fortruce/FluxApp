var Dispatcher = require('../dispatcher');
var assign = require('object-assign');
var ActionTypes = require('../constants/constants').ActionTypes;
var EventEmitter = require('events').EventEmitter;

var CHANGE_EVENT = 'change';

var _connection = {}
var _init = false;

function initConnection(nick, server, port) {
  _connection.nick = nick;
  _connection.server = server;
  _connection.port = port;
  _init = true;
}

var ConnectStore = assign({}, EventEmitter.prototype, {
  emitChange() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener(cb) {
    this.on(CHANGE_EVENT, cb);
  },

  removeChangeListener(cb) {
    this.removeListener(CHANGE_EVENT, cb);
  },

  isInitialized() {
    return _init;
  },

  getNick() {
    return _connection.nick;
  },

  getServer() {
    return _connection.server;
  }
});

ConnectStore.dispatchToken = Dispatcher.register((action) => {
  switch (action.type) {
    case ActionTypes.INIT_CONNECTION:
      initConnection(action.nick, action.server, action.port);
      ConnectStore.emitChange();
      break;

    default:
      // nothing
  }
});

module.exports = ConnectStore;