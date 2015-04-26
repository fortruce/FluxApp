var React = require('react');
var RouteHandler = require('react-router').RouteHandler;

module.exports = React.createClass({
  render() {
    return (
      <div>
        <h1>This is IRCChat!</h1>
        <RouteHandler />
      </div>
    );
  }
});