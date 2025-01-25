const inputField = document.querySelector('.js-input-field');
const clearAllButton = document.querySelector('.js-clear-all-button');
const clearAllCompleteButton = document.querySelector('.js-clear-all-complete-button');

inputField.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        addItemToList();
    } else {
        return;
    }
});

clearAllButton.addEventListener('click', () => {
    resetInputFieldToDefault();
    const allTodoItems = document.querySelectorAll('.todo-instance-container');
    allTodoItems.forEach(item => {
        item.remove();
    })
});

clearAllCompleteButton.addEventListener('click', () => {

    const allCompleteItems = document.querySelectorAll('.complete-status');
    allCompleteItems.forEach(item => {
        item.remove();
    })

    if (!checkIfListIsFull()){
        resetInputFieldToDefault();
    };
});


function resetInputFieldToDefault() {
    inputField.value = '';
    inputField.placeholder = 'Enter To-Do';
    inputField.style.setProperty("--placeholder-color","lightgray");
}

const todoLimit = 18;

function checkIfListIsFull() {
    const allTodoItems = document.querySelectorAll('.todo-instance-container');

    if(allTodoItems.length >= todoLimit){
        inputField.value = '';
        inputField.placeholder = 'List is Full';
        inputField.style.setProperty("--placeholder-color","red");
        return true;
    } else {
        return false;
    }

}

function addItemToList() {

    checkIfListIsFull();

    const todoListContainer = document.querySelector('.todo-List-Container');

    function isEmpty(str) {
        return !str.trim().length;
    }
    
    function resetInputField() {
        inputField.value = '';
    }

    if (isEmpty(inputField.value)) {
        resetInputField();
    } else {
        // Creation of individual todo Items
        const todoItem = document.createElement("div");
        todoItem.classList.add('todo-instance-container');
        const randID = (Math.floor(Math.random() * 10000).toString());
        const inputFormattedForClassNameUse = inputField.value.replace(/\s+/g, "-").replace(/[^a-zA-Z]/g, "") + `-${randID}`;
        todoItem.classList.add(`todo-${inputFormattedForClassNameUse}`);
        todoItem.innerHTML = `
        
        <button class='complete-button js-complete-button-${randID}' onclick='
                
            const thisItem = document.querySelector(".todo-${inputFormattedForClassNameUse}");
                thisItem.classList.toggle("complete-status");            

        '>✔</button>

        <button class='delete-button js-delete-button-${randID}' onclick='
        
            resetInputFieldToDefault();
            const thisItem = document.querySelector(".todo-${inputFormattedForClassNameUse}");
            thisItem.remove();

        '>✖</button>
        <span class='todo-instance-text'>${inputField.value}</span>
        `;

        todoListContainer.appendChild(todoItem);
    }
    resetInputField();
};
