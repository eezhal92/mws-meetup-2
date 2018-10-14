fetch('https://jsonplaceholder.typicode.com/todos/1')
  .then((response) => response.json())
  .then(data => {
    const el = createUserElement(data)
    
    addToApp(el)
  })

function createUserElement (data) {
  const el = document.createElement('div')
  el.innerHTML = `
    <p>${data.title}</p>
  `

  return el;
}

/**
 * 
 * @param {HTMLElement} el 
 */
function addToApp (el) {
  const app = document.querySelector('#app')

  app.appendChild(el)
}