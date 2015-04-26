var Dispatcher = require('../dispatcher');
var assign = require('object-assign');
var ActionTypes = require('../constants/constants').ActionTypes;
var EventEmitter = require('events').EventEmitter;
var ChatMessageUtils = require('../utils/ChatMessageUtils');

var CHANGE_EVENT = 'change';

var _messages = {};

function _addMessage(message) {
  _messages[message.id] = message;
}

var MessageStore = assign({}, EventEmitter.prototype, {
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
    return _messages;
  },

  getAllForRoom(room) {
    var messages = [];
    for (var id in _messages) {
      if (_messages[id].room === room)
        messages.push(_messages[id]);
    };
    messages.sort((a,b) => {
      if (a.timestamp < b.timestamp)
        return -1;
      else if (b.timestamp < a.timestamp)
        return 1;
      else return 0;
    });
    return messages;
  }
});

MessageStore.dispatchToken = Dispatcher.register((action) => {
  switch(action.type) {
    case ActionTypes.CREATE_MESSAGE:
      var message = ChatMessageUtils.getCreatedMessageData(
        action.text,
        action.room
      );
      _addMessage(message);
      MessageStore.emitChange();
      break;
    default:
      // nothing
  }
});

module.exports = MessageStore