"use strict"

module.exports = {
    uris: {
        restaurants: "http://messi.hyyravintolat.fi/publicapi/restaurants",
        menu: function(id) {
            if (id === undefined)
                throw new Error("Id is required!")
            return "http://messi.hyyravintolat.fi/publicapi/restaurant/" + id
        }
    },
    areacodes: {
        1: "Keskusta",
        2: "Kumpula",
        3: "Meilahti",
        5: "Viikki",
        6: "Metropolia"
    }
}
