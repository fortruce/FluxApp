var Dispatcher = require('../dispatcher');
var assign = require('object-assign');
var EventEmitter = require('events').EventEmitter;
var ActionTypes = require('../constants/constants').ActionTypes;

var ConnectStore = require('../stores/ConnectStore');

var assert = require('assert');

var CHANGE_EVENT = 'change';

var _rooms = [];

function joinRoom(room) {
  assert(_rooms.indexOf(room) === -1)
  _rooms.push(room);
}

var RoomStore = assign({}, EventEmitter.prototype, {
  emitChange() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener(cb) {
    this.on(CHANGE_EVENT, cb);
  },

  removeChangeListener(cb) {
    this.removeListener(CHANGE_EVENT, cb);
  },

  getAll() {
    return _rooms;
  }
});

RoomStore.dispatchToken = Dispatcher.register((action) => {
  switch(action.type) {
    case ActionTypes.JOIN_ROOM:
      joinRoom(action.room);
      RoomStore.emitChange();
      break;

    case ActionTypes.CLICK_ROOM:
      switchRoom(action.room);
      RoomStore.emitChange();
      break;

    case ActionTypes.INIT_CONNECTION:
      console.log('initcon');
      Dispatcher.waitFor([ConnectStore.dispatchToken]);
      joinRoom(ConnectStore.getServer());
      RoomStore.emitChange();
      break;

    default:
      //nothing
  }
});

module.exports = RoomStore;