function Email(subject, body, recipient) {
  this.subject = subject
  this.body = body
  this.recipient = recipient
}

Email.prototype.toString = function() {
    return 'To: <' + this.recipient + '>\n' +
      'Subject: "' + this.subject + '"\n' +
      'Body:\n' +
      '\n' + this.body
}

module.exports = Email
