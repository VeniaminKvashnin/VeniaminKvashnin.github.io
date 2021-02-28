const classNames = {
  TODO_ITEM: 'todo-container',
  TODO_CHECKBOX: 'todo-checkbox',
  TODO_TEXT: 'todo-text',
  TODO_DELETE: 'todo-delete',
}

const list = document.getElementById('todo-list')
const itemCountSpan = document.getElementById('item-count')
const uncheckedCountSpan = document.getElementById('unchecked-count')

let todos = []
let id = 0

class Todo {
  constructor() {
    this.id = ++id
    this.check = false
    this.text = this.getText()
  }
  getText() {
    return prompt('Enter a todo task:')
  }
}

function newTodo() {
  const todo = new Todo()
  todos.push(todo)
  render()
}

function render() {
  list.innerHTML = ''
  todos.map(createTodo).forEach(todo => list.appendChild(todo))
  itemCountSpan.textContent = todos.length
  uncheckedCountSpan.textContent = todos.filter(todo => !todo.check).length
}

function createTodo(todo) {
  const li = document.createElement('li')
  li.innerHTML = `
  <input type="checkbox" onchange="changeTodo(${todo.id})" ${todo.check ? "checked" : ""}>
  <button onclick="deleteTodo(${todo.id})">delete</button>
  <span>${todo.text}</span>
  `
  return li
}

function deleteTodo(todo) {
  todos = todos.filter(todo => todo.id !== id)
  render()
}

function chanegeTodo(id){
  todos = todos.map(todo => todo.id == id ?{...todo, check: !todo.check} : todo)
  uncheckedCountSpan.textContent = todos.filter(todo => !todo.check).length
}