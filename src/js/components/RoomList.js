var React = require('react');
var RoomStore = require('../stores/RoomStore');
var RoomActions = require('../actions/RoomActions');

var Link = require('react-router').Link;

function getStateFromStores() {
  return {
    rooms: RoomStore.getAll()
  };
}

module.exports = React.createClass({
  contextTypes: {
    router: React.PropTypes.func
  },

  getInitialState() {
    return getStateFromStores();
  },

  componentDidMount() {
    RoomStore.addChangeListener(this._update);
  },

  componentDidUnmount() {
    RoomStore.removeChangeListener(this._update);
  },

  render() {
    var rooms = this.state.rooms.map((r) => {
      return (
        <li><Link to="chat" params={{roomName: r}}>{r}</Link></li>
      );
    });
    return (
      <div>
        <ul>{rooms}</ul>
        <form     onSubmit={this._joinRoom}>
          <input  type="text"
                  ref="input"
                  placeholder="join room" />
        </form>
      </div>
    );
  },

  _joinRoom(e) {
    e.preventDefault();
    var room = React.findDOMNode(this.refs.input).value.trim();
    if (room) {
      RoomActions.joinRoom(room, this.context.router);
    }
  },

  _update() {
    this.setState(getStateFromStores());
  }
});