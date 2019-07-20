import NewTask from './new-task.js'
import dataKeeper from './data-keeper.js'
class Render {
    constructor(data) {
        this.data = data || {}
        this.panelMountPoint = document.getElementById('js-panels')
    }

    dragstartHandler(event) {
        event.dataTransfer.setData('plain/text', event.target.dataset.taskId)
        event.dataTransfer.dropEffect = 'move'
    }

    onDragOverHandler(event) {
        event.preventDefault()
        event.dataTransfer.dropEffect = 'move'
    }

    onDropHandler(event) {
        event.preventDefault()
        const panelName = event.target.dataset.panelName
        if(!panelName) return false
        const taskId = event.dataTransfer.getData('plain/text')

        this.updateDataInPanel(panelName, taskId)
        this.updateInterface()
    }

    findTaskById(data, id) {
        for(let [key, value] of Object.entries(data)) {
            const {tasks} = value
            const task = tasks.find(task => task.id === parseInt(id, 10))
            if(task) {
                return task
            }
        }
        return null
    }

    removeTaskById(data, id) {
        for(let [key, value] of Object.entries(data)) {
            const {tasks} = value
            const taskIndex = tasks.findIndex(task => task.id === parseInt(id, 10))
            if(taskIndex > -1) {
                let newTasks = {...tasks}
                newTasks = [...tasks.slice(0, taskIndex), ...tasks.slice(taskIndex+1)]
                value.tasks = newTasks
            }
        }
        return data
    }

    addTaskToPanel(data, panelName, task) {
        const panelData = data[panelName]
        panelData.tasks.push(task)
        return data
    }

    updateDataInPanel(panelName, taskId) {

        const task = this.findTaskById(this.data, taskId)
        
        this.data = this.removeTaskById(this.data, taskId)

        this.data = this.addTaskToPanel(this.data, panelName, task)

        dataKeeper.set(this.data)
    }

    generateTaskCards(tasks) {
        if(!tasks || tasks.length === 0) return ''
        return tasks.map((task) => {
            const {id, title, description} = task
            return `
                <section data-task-id="${id}" class="tasks-card" draggable="true" ondragstart="dragstartHandler(event)">
                    <header>
                        <h3 class="tasks-card__header_text">${title}</h3>
                    </header>
                    <article class="tasks-card__description">
                        <p class="tasks-card__text">${description}</p>
                    </article>
                </section>
            `
        }).join(' ')
    }

    generatePanelValues({panelName, panelData}) {
        const {name, tasks} = panelData
        return `
        <section class="list" id='js-${panelName}' data-panel-name="${panelName}" ondragover="onDragOverHandler(event)" ondrop="onDropHandler(event)">
            <header class="list__header">
                <h2 class="list__header_text">${name}</h2>
            </header>
            <article>
                ${this.generateTaskCards(tasks)}
            </article>
        </section>
        `
    }
    /**
     * create panels of `to-do`, `in-progress` & `done`
     */
    createPanels() {
        if(this.panelMountPoint) {
            let panels = []
            for(let [key, value] of Object.entries(this.data)) {
                const generatedPanel = this.generatePanelValues({panelName: key, panelData: value})
                panels.push(generatedPanel)
            }
            this.panelMountPoint.insertAdjacentHTML('beforeend', panels.join(' '))
        }
    }

    destroyPanels() {
        if(this.panelMountPoint) {
            while(this.panelMountPoint.firstChild) {
                this.panelMountPoint.removeChild(this.panelMountPoint.firstChild)
            }
        }
    }

    updateInterface() {
        this.destroyPanels()
        this.createPanels()
    }

    updateComponent(data) {
        this.data = data
        this.destroyPanels()
        this.createPanels()
    }

    init() {
        new NewTask()
        dataKeeper.subscribe(this.updateComponent.bind(this))
        window.dragstartHandler = this.dragstartHandler
        window.onDragOverHandler = this.onDragOverHandler
        window.onDropHandler = this.onDropHandler.bind(this)
        this.createPanels()
    }
}

export default Render