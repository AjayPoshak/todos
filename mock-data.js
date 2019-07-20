const todoList = {
    todos: {
        name: 'To-Do',
        tasks: [
            {
                id: 11,
                title: 'Read book History of humankind',
                createdAt: 1563171826021,
                description: 'Read this book idiot. It has been pending since long'
            },
            {
                id: 12,
                title: 'Do laundry',
                createdAt: 1563171826021,
                description: 'Clothes are dirty, please do laundry before they stink like hell'
            },
            {
                id: 13,
                title: 'Open Source Contributions',
                createdAt: 1563171826021,
                description: 'Make some contributions to tools like webpack, styled-components'
            }
        ]
    },
    inProgress: {
        name: 'In-Progress',
        tasks: [
            {
                id: 21,
                title: 'Learn swimming',
                createdAt: 1563171826021,
                description: 'Start learning swimming as there are a lot of things to do'
            },
            {
                id: 22,
                title: 'Learn driving',
                createdAt: 1563171826021,
                description: 'Apply for a temp driving license after it'
            },
        ]
    },
    done: {
        name: 'Done',
        tasks: [
            {
                id: 31,
                title: 'Talk to someone',
                createdAt: 1563172097386,
                description: 'Sometimes talking to human beings isn\'t that bad'
            }
        ]
    }
}

export default todoList