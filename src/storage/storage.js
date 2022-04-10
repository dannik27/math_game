
console.log("Platform " + process.env.VUE_APP_PLATFORM)

import localStorage from "./localStorage"
import inMemoryStorage from "./inMemoryStorage"

let implementation
switch(process.env.VUE_APP_PLATFORM) {
    case "web":
        implementation = localStorage
        break;
    case "android":
        implementation = localStorage
        break;
    default:
        implementation = inMemoryStorage
}


export default {

    save(key, value) {
        implementation.save(key, value);
    },

    load(key) {
        implementation.load(key)
    },

    loadOrDefault(key, defaultValue) {
        let value = implementation.load(key)
        return value ? value : defaultValue
    }

}