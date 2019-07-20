class Storage {
    set(key, value) {
        localStorage.setItem(key, JSON.stringify(value))
        return true
    }

    get(key) {
        try {
            const storedValue = localStorage.getItem(key)
            if(storedValue) {
                return JSON.parse(storedValue)
            }
            return null
        } catch(e) {
            console.error('Error parsing data ', e)
            return null
        }
    }
}

export default Storage