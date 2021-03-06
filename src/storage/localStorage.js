
export default {

    save(key, value) {
        localStorage.setItem(key, JSON.stringify(value));
    },

    async load(key) {
        return JSON.parse(localStorage.getItem(key))
    }

}