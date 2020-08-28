const PENDING = "PENDING"
const FULFILLED = "FULFILLED"
const REJECTED = "REJECTED"

const resolvedPromise = (promise, x, resolve, reject) => {
    if (promise === x) {
        reject(new TypeError("TypeError"))
    }

    if ((typeof x === "object" && x !== null) || typeof x === "function") {
        let called = false
        try {
            const then = x.then
            if (typeof then === "function") {
                then.call(x, y => {
                    if (called) return
                    called = true
                    resolvedPromise(promise, y, resolve, reject)
                }, r => {
                    if (called) return
                    called = true
                    reject(r)
                })
            } else {
                resolve(x)
            }
        } catch (e) {
            if (called) return
            called = true
            reject(e)
        }
    } else {
        resolve(x)
    }
}

class Promise {
    constructor(executor) {
        this.status = PENDING
        this.value = undefined
        this.reason = undefined
        this.onResolvedCallbacks = []
        this.onRejectedCallbacks = []

        const resolve = value => {
            if (this.status === "PENDING") {
                this.status = FULFILLED
                this.value = value
                this.onResolvedCallbacks.forEach(fn => fn())
            }
        }

        const reject = reason => {
            if (this.status === PENDING) {
                this.status = REJECTED
                this.reason = reason
                this.onRejectedCallbacks.forEach(fn => fn())
            }
        }

        executor(resolve, reject)
    }

    then(onFulfilled, onRejected) {
        onFulfilled = typeof onFulfilled === "function" ? onFulfilled : val => val
        onRejected = typeof onRejected === "function" ? onRejected : err => {throw err}
        const promise2 = new Promise((resolve, reject) => {
            if (this.status === FULFILLED) {
                setTimeout(() => {
                    try {
                        let x = onFulfilled(this.value)
                        resolvedPromise(promise2, x, resolve, reject)
                    } catch (e) {
                        reject(e)
                    }
                })
            }

            if (this.status === REJECTED) {
                setTimeout(() => {
                    try {
                        let x = onRejected(this.reason)
                        resolvedPromise(promise2, x, resolve, reject)
                    } catch (e) {
                        reject(e)
                    }
                })
            }

            if (this.status === PENDING) {
                this.onResolvedCallbacks.push(() => {
                    setTimeout(() => {
                        try {
                            let x = onFulfilled(this.value)
                            resolvedPromise(promise2, x, resolve, reject)
                        } catch (e) {
                            reject(e)
                        }
                    })
                })

                this.onRejectedCallbacks.push(() => {
                    setTimeout(() => {
                        try {
                            let x = onRejected(this.reason)
                            resolvedPromise(promise2, x, resolve, reject)
                        } catch (e) {
                            reject(e)
                        }
                    })
                })
            }
        })

        return promise2
    }

    catch(errCallback) {
        return this.then(null, errCallback)
    }

    finally(fn) {
        return this.then(fn, fn)
    }

    static resolve() {
        return new Promise((resolve, reject) => {
            resolve(this.value)
        })
    }

    static reject() {
        return new Promise((resolve, reject) => {
            reject(this.reason)
        })
    }
}

const p = new Promise((resolve, reject) => {
    resolve("哈哈")
})

p.then(data => {
    console.log(data)
    return data
}).then(data => {
    console.log(data)
    throw new Error("好玩")
}).catch(err => {
    console.log(err)
    return "你猜"
}).finally(data => {
    console.log(data)
})
