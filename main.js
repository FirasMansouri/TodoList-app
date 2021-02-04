const itemButton = document.querySelector(".item-button");
const itemInput = document.querySelector('.item-input');
const todoList= document.querySelector(".todo-list");

itemButton.addEventListener("click", addItem);
todoList.addEventListener("click", deleteCheck);
document.addEventListener('DOMContentLoaded', getTodosFromLocalStorage);

function addItem(event){
    event.preventDefault();
    if(itemInput.value!=""){
        const newDiv= document.createElement('div');
        newDiv.classList.add('newTodo');
        newDiv.classList.add('unchecked');
        const node= document.createElement('li');
        const textNode= itemInput.value;
        node.innerText= textNode;
        const circleButton= document.createElement('button');
        circleButton.classList.add('circleButton');
        circleButton.innerHTML= "<i class='far fa-circle'></i>";
        newDiv.appendChild(circleButton);
        newDiv.appendChild(node);
        const trashButton= document.createElement('button');
        trashButton.classList.add('trashButton');
        trashButton.innerHTML= "<i class='far fa-trash-alt'></i>";
        newDiv.appendChild(trashButton);
        todoList.appendChild(newDiv);
        addToLocalStorage(newDiv.outerHTML);
        itemInput.value="";
    }
}

function deleteCheck(event){
    const item= event.target;
    if(item.classList[1]=="fa-circle"){
        checkFromLocalStorage((item.parentElement).parentElement);
        item.classList.remove(item.classList[1]);
        item.classList.add("fa-check-circle");
        const newTodo= (item.parentElement).parentElement;
        newTodo.classList.remove(newTodo.classList[1]);
        newTodo.classList.add('checked');
    }
    else if(item.classList[1]=="fa-check-circle"){
        UncheckFromLocalStorage((item.parentElement).parentElement);
        item.classList.remove(item.classList[1]);
        item.classList.add("fa-circle");
        const newTodo= (item.parentElement).parentElement;
        newTodo.classList.remove(newTodo.classList[1]);
        newTodo.classList.add('unchecked');
    }
    else if(item.classList[1]=="fa-trash-alt"){
        (item.parentElement).parentElement.remove();
        removeFromLocalStorage((item.parentElement).parentElement);
    }
}

function addToLocalStorage(item){
    let todos;
    if(localStorage.getItem('todos')===null){
        todos=[];
    }else{
        todos=JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(item);
    localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodosFromLocalStorage(){
    let todos;
    if(localStorage.getItem('todos')!==null){
        todos=JSON.parse(localStorage.getItem('todos'));
        todos.forEach(element => {
            todoList.innerHTML+=element;
        });
    }
}

function removeFromLocalStorage(item){
    let todos;
    if(localStorage.getItem('todos')===null){
        todos=[];
    }else{
        todos=JSON.parse(localStorage.getItem('todos'));
    }

    item.querySelectorAll('[aria-hidden="true"]').forEach(i => {
        i.removeAttribute('aria-hidden');
      });
    todos.splice(todos.indexOf(item.outerHTML),1);
    localStorage.setItem('todos', JSON.stringify(todos));
}

function checkFromLocalStorage(item){
    let todos;
    if(localStorage.getItem('todos')===null){
        todos=[];
    }else{
        todos=JSON.parse(localStorage.getItem('todos'));
    }

    item.querySelectorAll('[aria-hidden="true"]').forEach(i => {
        i.removeAttribute('aria-hidden');
      });
    let index= todos.indexOf(item.outerHTML);
    let s = todos[index];
    let temp = document.createElement('div');
    temp.innerHTML = s;
    let htmlObject = temp.firstChild;
    htmlObject.classList.remove(htmlObject.classList[1]);
    htmlObject.classList.add('checked');
    let button= htmlObject.firstChild;
    let i= button.firstChild;
    i.classList.remove(i.classList[1]);
    i.classList.add('fa-check-circle');
    todos.splice(index,1,htmlObject.outerHTML);
    
    localStorage.setItem('todos', JSON.stringify(todos));
}

function UncheckFromLocalStorage(item){
    let todos;
    if(localStorage.getItem('todos')===null){
        todos=[];
    }else{
        todos=JSON.parse(localStorage.getItem('todos'));
    }

    item.querySelectorAll('[aria-hidden="true"]').forEach(i => {
        i.removeAttribute('aria-hidden');
      });
    let index= todos.indexOf(item.outerHTML);
    let s = todos[index];
    let temp = document.createElement('div');
    temp.innerHTML = s;
    let htmlObject = temp.firstChild;
    htmlObject.classList.remove(htmlObject.classList[1]);
    htmlObject.classList.add('unchecked');
    let button= htmlObject.firstChild;
    let i= button.firstChild;
    i.classList.remove(i.classList[1]);
    i.classList.add('fa-circle');
    todos.splice(index,1,htmlObject.outerHTML);
    localStorage.setItem('todos', JSON.stringify(todos));
}
