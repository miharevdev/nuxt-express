
class Storage {

    setKey(key, payload) {
        localStorage.setItem(key, payload);
    }

    getKey(key) {
        return localStorage.getItem(key);
    }

    removeKey(key) {
        localStorage.removeItem(key);
    }

}

export const storage = new Storage();