var Dispatcher = require('../dispatcher');
var ActionTypes = require('../constants/constants').ActionTypes;

module.exports = {
  joinRoom(room, router) {
    Dispatcher.dispatch({
      type: ActionTypes.JOIN_ROOM,
      room: room
    });
    router.transitionTo('/' + room);
  }
};