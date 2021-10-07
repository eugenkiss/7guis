// Native
const EventEmitter = require('events')

// Packages
const Deque = require('double-ended-queue')

class ReleaseEmitter extends EventEmitter {}

function defaultInit () {
  return '1'
}

class Sema {
  constructor (nr, { initFn = defaultInit, pauseFn, resumeFn, capacity = 10 } = {}) {
    if (pauseFn ^ resumeFn) {
      throw new Error('pauseFn and resumeFn must be both set for pausing')
    }

    this.nrTokens = nr
    this.free = new Deque(nr)
    this.waiting = new Deque(capacity)
    this.releaseEmitter = new ReleaseEmitter()
    this.noTokens = initFn === defaultInit
    this.pauseFn = pauseFn
    this.resumeFn = resumeFn

    this.releaseEmitter.on('release', (token) => {
      const p = this.waiting.shift()
      if (p) {
        p.resolve(token)
      } else {
        if (this.resumeFn && this.paused) {
          this.paused = false
          this.resumeFn()
        }

        this.free.push(token)
      }
    })

    for (let i = 0; i < nr; i++) {
      this.free.push(initFn())
    }
  }

  async v () {
    let token = this.free.pop()

    if (token) {
      return token
    }

    return new Promise((resolve, reject) => {
      if (this.pauseFn && !this.paused) {
        this.paused = true
        this.pauseFn()
      }

      this.waiting.push({ resolve, reject })
    })
  }

  p (token) {
    this.releaseEmitter.emit('release', this.noTokens ? '1' : token)
  }

  drain () {
    const a = new Array(this.nrTokens)
    for (let i = 0; i < this.nrTokens; i++) {
      a[i] = this.v()
    }
    return Promise.all(a)
  }

  nrWaiting () {
    return this.waiting.length
  }
}

module.exports = Sema
