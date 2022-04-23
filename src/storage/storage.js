
console.log("Platform " + process.env.VUE_APP_PLATFORM)

import localStorage from "./localStorage"
import inMemoryStorage from "./inMemoryStorage"
import capacitorFilesystemStorage from "./capacitorFilesystemStorage"

let implementation
switch(process.env.VUE_APP_PLATFORM) {
    case "web":
        implementation = localStorage
        break;
    case "android":
        implementation = capacitorFilesystemStorage
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
        console.log(implementation)
        return implementation.load(key)
            .then(value => {
                return value ? value : defaultValue
            })
    }

}