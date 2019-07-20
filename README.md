It is a simple todo list written in vanilla JS.

It stores todo tasks in persistent browser storage(local storage).

## Files Structure

> data-keeper.js - It deals with application state, singleton instance
>
> index.html - HTML file
>
> index.js - Root file that bootstraps and initializes the app state
>
> mock-data.js - Mock Data used for testing
>
> new-task.js - It contains UI rendering and validation logic for new task
>
> render.js - Responsible of main UI rendering
>
> storage.js - A wrapper around local storage
>
> style.css - CSS styles


## Local development
To run it locally, a web server is needed. <br/>
Easiest way to do so, is by using `http-server` package.

`npm install -g http-server`

`cd todos`

`http-server -p 3004`
