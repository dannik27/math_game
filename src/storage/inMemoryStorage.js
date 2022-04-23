let state = {}

export default {
    save(key, value) {
        state[key] = value
    },

    async load(key) {
        return state[key]
    }
}