import dataKeeper from './data-keeper.js'
import Render from './render.js'


(function() {
    const skeleton = {
        todos: {name: 'To-Do', tasks: [{
            id: 11,
            title: 'Get Started',
            description: 'Start adding tasks to get started.'
        }]},
        done: {name: 'Done'},
        inProgress: {name: 'In-Progress'},
    }
    
    const render = new Render(dataKeeper.get() || skeleton)
    render.init()
})()

window.addEventListener('beforeunload', () => {
    // dataKeeper.writeToStorage()
})