
module.exports = {
    restaurants: "http://messi.hyyravintolat.fi/publicapi/restaurants",
    menu: function(id) {
        if (id === undefined)
            throw "Id is required!"
        return "http://messi.hyyravintolat.fi/publicapi/restaurant/" + id
    }
}