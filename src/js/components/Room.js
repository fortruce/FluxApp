var React = require('react');
var MessageStore = require('../stores/MessageStore');
var RoomStore = require('../stores/RoomStore');

function getStateFromStores(room) {
  return {
    messages: MessageStore.getAllForRoom(room)
  }
}

function getMessage(message) {
  return (
    <p>{message.text}</p>
  );
}

module.exports = React.createClass({
  contextTypes: {
    router: React.PropTypes.func
  },

  getInitialState() {
    return getStateFromStores(this.props.room);
  },

  componentDidMount() {
    MessageStore.addChangeListener(this._update);
    RoomStore.addChangeListener(this._update);
  },

  componentDidUnmount() {
    MessageStore.removeChangeListener(this._update);
    RoomStore.removeChangeListener(this._update);
  },

  componentWillReceiveProps(props) {
    this.setState(getStateFromStores(props.room));
  },

  render() {
    var messages = this.state.messages.map(getMessage);
    return (
      <div>
        <h2>{this.props.room}</h2>
        {messages}
      </div>
    );
  },

  _update() {
    this.setState(getStateFromStores(this.props.room));
  }
});