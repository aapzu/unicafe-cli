
const assert = require('assert')

describe('api-config', () => {
    let apiConfig
    beforeEach(() => {
        apiConfig = require('../../data/api-config')
    })
    describe('uris', () => {
        it('must return right uri for restaurants', () => {
            assert.equal(apiConfig.uris.restaurants, 'http://messi.hyyravintolat.fi/publicapi/restaurants')
        })
        describe('menu', () => {
            it('must throw error if no id is provided', () => {
                assert.throws(
                    () => {
                        apiConfig.menu()
                    },
                    Error
                )
            })
            it('must return right uri', () => {
                assert.equal(apiConfig.menu(10), 'http://messi.hyyravintolat.fi/publicapi/restaurant/10')
            })
        })
    })
})
