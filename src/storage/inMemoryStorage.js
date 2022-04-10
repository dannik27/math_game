let state = {}

export default {
    save(key, value) {
        state[key] = value
    },

    load(key) {
        return state[key]
    }
}