const MEAT_REGEX = /broileri|(naudan|sian|kebab|kanan|jauhe)liha|porsa(s|an)/i

const isVegan = (item) => item.meta[0].includes('VE')

const isVegetarian = (item) => {
    if (isVegan(item)) { // if vegan, also vegetarian
        return true
    }
    if (item.meta[0].includes('Pyydä Ve')) { // if can be asked for vegan it's quite probably already vegetarian
        return true
    }
    if (item.meta[1].includes('kalaa') || item.meta[1].includes('äyriäisiä')) { // if contains fish or seafood they're in the allergens and we can be sure about it
        return false
    }
    if (MEAT_REGEX.test(item.ingredients)) {
        return false
    }
    return true
}

module.exports = {
    isVegan: isVegan,
    isVegetarian: isVegetarian,
}
