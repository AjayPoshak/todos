import Storage from './storage.js'
/**
 * Its singleton class.
 * 
 * This class is responsible for maintaing the data
 * for this application. As the app grows, its UI components
 * will also grow. So this instance is useful in centralizing
 * the data fetching and updating logic, and also helps
 * in separation of concerns.
 */
class DataKeeper {
    constructor() {
        this.listeners = []
        this.keyName = 'todolist'
        this.storage = new Storage()
        this.data = this.storage.get(this.keyName)
    }

    callSubscribers() {
        this.listeners.map(listener => listener(this.data))
    }
    /**
     * This function whenever called will return
     * the latest state of data
    */ 
    get() {
        return this.data
    }

    // It'll add task in todo panel only
    addTask({panelName = 'todos', task}) {
        if(task && (task.title || task.description)) {
            let data = {...this.data}
            if(Object.keys(data).length === 0) {
                data = {
                    todos: { name: 'To-Do', tasks: new Array() },
                    inProgress: { name: 'In-Progress', tasks: new Array() },
                    done: { name: 'Done', tasks: new Array() }
                }    
            }

            const {tasks} = data[panelName]
            const newTaskId = tasks.length ? tasks[tasks.length-1].id++ : 11
            const updatedTask = {...task, createdAt: new Date().getTime(), id: newTaskId }
            tasks.push(updatedTask)
            this.data = {...data}
            /** 
             * Write this new data to `this.data` to write it in persistent storage
             * and invoke all subscribers about the updated data
            */
            this.set(this.data)
            return this.data
        }
        console.error('At least title or description should be filled')
        return false
    }

    set(data) {
        this.data = data
        this.callSubscribers()
        // Update data in localStorage whenever it is updated
        this.writeToStorage(this.data)
    }

    writeToStorage() {
        this.storage.set(this.keyName, this.data)
    }

    subscribe(func) {
        if(typeof func !== 'function') {
            throw new Error('Expected the lisntener to be function')
        }
        this.listeners.push(func)
    }

    unsubscribe(func) {
        const idx = this.listeners.indexOf(func)
        this.listeners.splice(idx, 1)
    }
}

export default new DataKeeper()