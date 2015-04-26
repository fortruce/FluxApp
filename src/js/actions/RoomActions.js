var Dispatcher = require('../dispatcher');
var ActionTypes = require('../constants/constants').ActionTypes;

module.exports = {
  joinRoom(room) {
    Dispatcher.dispatch({
      type: ActionTypes.JOIN_ROOM,
      room: room
    });
  },

  clickRoom(room) {
    Dispatcher.dispatch({
      type: ActionTypes.CLICK_ROOM,
      room: room
    });
  }
};