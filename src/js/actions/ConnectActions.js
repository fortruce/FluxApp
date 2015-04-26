var ActionTypes = require('../constants/constants').ActionTypes;
var Dispatcher = require('../dispatcher');

module.exports = {
  initConnection(payload) {
    Dispatcher.dispatch({
      type: ActionTypes.INIT_CONNECTION,
      nick: payload.nick,
      server: payload.server,
      port: payload.port
    });
    payload.router.transitionTo('/Server');
  }
};