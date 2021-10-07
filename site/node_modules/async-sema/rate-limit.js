const Sema = require('./index')

module.exports = function rateLimit(rps) {
  const sema = new Sema(rps);

  return async function rl() {
    await sema.v();
    setTimeout(() => sema.p(), 1000);
  }
}
