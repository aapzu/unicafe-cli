
const assert = require('assert')
const proxyquire = require('proxyquire')

describe('Api', () => {
    let Api
    let api
    beforeEach(() => {
        Api = require('../../data/api')
        api = new Api()
    })
    describe('restaurants', () => {
        it('must return a promise', () => {
            assert(api.restaurants() instanceof Promise)
        })
        it('must get restaurants with correct uri', (done) => {
            Api = proxyquire('../../data/api', {
                'request-promise': {
                    get: (uri) => {
                        assert.equal(uri, 'http://messi.hyyravintolat.fi/publicapi/restaurants')
                        done()
                    }
                }

            })
            api = new Api()
            api.restaurants()
        })
        it('must throw error if res.status !== "OK"', (done) => {
            Api = proxyquire('../../data/api', {
                'request-promise': {
                    get: function(uri) {
                        return new Promise((resolve) => {
                            resolve("{\"status\": \"UNKNOWN\"}")
                        })
                    }
                }

            })
            api = new Api()
            api.restaurants().catch((e) => {
                assert(e.message.match(/Something went wrong/))
                done()
            })
        })
        it('must call resolve if res.status === "OK"', (done) => {
            Api = proxyquire('../../data/api', {
                'request-promise': {
                    get: function(uri) {
                        return new Promise((resolve) => {
                            resolve("{\"status\": \"OK\", \"test\": \"test\"}")
                        })
                    }
                }

            })
            api = new Api()
            api.restaurants().then((res) => {
                assert.equal(res.test, "test")
                done()
            })
        })

    })
    describe('menu', () => {
        it('must return a promise', () => {
            assert(api.menu() instanceof Promise)
        })
        it('must get restaurants with correct uri', (done) => {
            Api = proxyquire('../../data/api', {
                'request-promise': {
                    get: (uri) => {
                        assert.equal(uri, 'http://messi.hyyravintolat.fi/publicapi/restaurant/10')
                        done()
                    }
                }

            })
            api = new Api()
            api.menu(10)
        })
        it('must throw error if id is not defined', (done) => {
            api.menu()
                .catch((e) => {
                    assert(e.message.match(/Id is required/))
                    done()
                })
        })
        it('must throw error if res.status !== "OK"', (done) => {
            Api = proxyquire('../../data/api', {
                'request-promise': {
                    get: function(uri) {
                        return new Promise((resolve) => {
                            resolve("{\"status\": \"UNKNOWN\"}")
                        })
                    }
                }

            })
            api = new Api()
            api.menu(10).catch((e) => {
                assert(e.message.match(/Something went wrong/))
                done()
            })
        })
        it('must call resolve if res.status === "OK"', (done) => {
            Api = proxyquire('../../data/api', {
                'request-promise': {
                    get: function(uri) {
                        return new Promise((resolve) => {
                            resolve("{\"status\": \"OK\", \"test\": \"test\"}")
                        })
                    }
                }

            })
            api = new Api()
            api.menu(10).then((res) => {
                assert.equal(res.test, "test")
                done()
            })
        })
    })
})
