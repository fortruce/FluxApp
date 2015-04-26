module.exports = {
  getCreatedMessageData(text, room) {
    var timestamp = Date.now();
    return {
      id: timestamp,
      room: room,
      nick: 'Joseph',
      timestamp: timestamp,
      text: text,
      isRead: true
    };
  }
};