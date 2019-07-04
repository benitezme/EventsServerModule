import * as Sentry from '@sentry/node';

class ClientError extends Error {
  constructor(args) {
    super(args);
    Sentry.configureScope((scope) => {
      scope.setLevel('debug');
    });
    Sentry.captureException(this);
  }
}

class ServerError extends Error {
  constructor(args) {
    super(args);
    Sentry.configureScope((scope) => {
      scope.setLevel('error');
    });
    Sentry.captureException(this);
  }
}

export class AuthentificationError extends ClientError {
  constructor(message) {
    super(message)
    this.code = 401
    this.message = 'Autentification not found, you have to be authentificated to perform this action.'
  }
}

export class DatabaseError extends ClientError {
  constructor(message) {
    super(message)
    this.code = 404
    this.message = `Resource Error: ${this.message}`
  }
}

export class WrongArgumentsError extends ClientError {
  constructor(message) {
    super(message)
    this.code = 400
    this.message = `Wrong arguments : ${this.message}`
  }
}

export class NotImplementedYetError extends ServerError {
  constructor(message) {
    super(message)
    this.code = 501
    this.message = `This is not implemented yet, but will be soon. ${this.message}`
  }
}

export class ServiceUnavailableError extends ServerError {
  constructor(message) {
    super(message)
    this.code = 503
    this.message = `At least one service is unresponding ${this.message}`
  }
}
