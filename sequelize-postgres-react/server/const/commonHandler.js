const catchHandler = message => e => {
  // eslint-disable-next-line no-console
  console.error(message + ' error: ', e)
  return e;
}

module.exports = {
  catchHandler
}