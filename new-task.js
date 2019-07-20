import dataKeeper from './data-keeper.js'
class NewTask {
    constructor() {
        window.closeModal = this.closeModal
        window.addTask = this.addTask.bind(this)
        window.newTaskHandler = this.newTaskHandler.bind(this)
    }

    openModal() {
        const modalRoot = document.getElementById('modal-root')
        if(modalRoot) {
            const modalHTML = `
                <section class="modal">
                    <div class="modal__overlay" onclick="closeModal()"></div>
                    <article class="modal__body">
                            <header>
                                <h3 class="modal__body_header">Add Task</h3>
                            </header>
                        <form class="form" id="js-add-task">
                            <input class="form__input-text" id="js-title"type="text" placeholder="Add Title" />
                            <input class="form__input-text" id="js-desc" type="text" placeholder="Add Description" />
                            <footer class="modal__body_footer">
                                <button class="btn" type="button" onclick="addTask(event)">Add</button>
                            </footer>
                        </form>
                    </article>
                </section>
            `
            modalRoot.insertAdjacentHTML('beforeend', modalHTML)
        }
    }

    closeModal() {
        const modalRoot = document.getElementById('modal-root')
        while(modalRoot.firstChild) {
            modalRoot.removeChild(modalRoot.firstChild)
        }
    }

    addTask(event) {
        event.preventDefault()
        const title = document.getElementById('js-title').value
        const description = document.getElementById('js-desc').value

        if(title.length > 0 || description.length > 0) {
            dataKeeper.addTask({task: {title, description}})
            this.closeModal()
        }
    }

    newTaskHandler(event) {
        this.openModal()
    }
}

export default NewTask