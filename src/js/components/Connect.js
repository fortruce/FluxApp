var React = require('react');
var ConnectActions = require('../actions/ConnectActions');

module.exports = React.createClass({
  contextTypes: {
    router: React.PropTypes.func
  },

  render() {
    return (
      <div>
        <h2>Connect to Server</h2>
        <form onSubmit={this._submit}>
          <input  type="text"
                  ref="nick"
                  placeholder="nick" />
          <input  type="text"
                  ref="server"
                  defaultValue="irc.freenode.net"
                  placeholder="server" />
          <input  type="text"
                  ref="port"
                  defaultValue="6667"
                  placeholder="port" />
          <input  type="submit" />
        </form>
      </div>
    );
  },

  _submit(e) {
    e.preventDefault();
    var nick = React.findDOMNode(this.refs.nick).value.trim();
    var server = React.findDOMNode(this.refs.server).value.trim();
    var port = React.findDOMNode(this.refs.port).value.trim();
    if (!nick || !server || !port)
      return;
    ConnectActions.initConnection({
      router: this.context.router,
      nick: nick,
      server: server,
      port: port
    });
  }
});