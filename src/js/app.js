var React = require('react');
var Router = require('react-router');
var DefaultRoute = Router.DefaultRoute;
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;
var NotFoundRoute = Router.NotFoundRoute;

var App = require('./components/App');
var Connect = require('./components/Connect');
var Chat = require('./components/Chat');
var RoomList = require('./components/RoomList');

var routes = (
  <Route handler={App} path="/">
    <DefaultRoute handler={Connect} />
    <NotFoundRoute handler={Connect} />
    <Route name="chat" path="/:roomName" handler={Chat} />
  </Route>
);

Router.run(routes, function (Handler) {
  React.render(<Handler />, document.getElementById('container'));
});