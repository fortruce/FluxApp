var React = require('react');
var RouteHandler = require('react-router').RouteHandler;
var MessageActions = require('../actions/MessageActions');
var RoomStore = require('../stores/RoomStore');
var RoomList = require('../components/RoomList');
var ConnectStore = require('../stores/ConnectStore');
var Room = require('../components/Room');

module.exports = React.createClass({
  contextTypes: {
    router: React.PropTypes.func
  },

  statics: {
    willTransitionTo(transition) {
      if (!ConnectStore.isInitialized())
        transition.redirect('/');
    }
  },

  render() {
    return (
      <div>
        <h2>CHAT</h2>
        <RoomList />
        <Room room={this.context.router.getCurrentParams().roomName} />
        <form onSubmit={this._submit}>
          <input  type="text"
                  ref='input'
                  placeholder="type message..." />
        </form>
      </div>
    );
  },

  _submit(e) {
    e.preventDefault();
    var input = React.findDOMNode(this.refs.input);
    if (input.value.trim()) {
      MessageActions.createMessage(
        input.value.trim(),
        this.context.router.getCurrentParams().roomName);
    }
  }
});