var Dispatcher = require('../dispatcher');
var ActionTypes = require('../constants/constants').ActionTypes;

module.exports = {
  createMessage(text, room) {
    Dispatcher.dispatch({
      type: ActionTypes.CREATE_MESSAGE,
      text: text,
      room: room
    });
  }
}