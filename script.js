const list = document.querySelector('.todolist');
const add = document.getElementById('addItem');
const edit = document.getElementById('editItem');
const del = document.getElementById('deleteItem');
const modal = document.getElementById('modal');
const closeModal = document.getElementById('closeModal');
const modalTitle = document.getElementById('modalTitle');
const taskInput = document.getElementById('taskInput');
const modalActionButton = document.getElementById('modalActionButton');
const closeButton = document.getElementById('closeButton');

let selectedItem = null;
let currentAction = null;

function saveTasks() {
    const tasks = [];
    list.querySelectorAll('li').forEach(task => {
        tasks.push(task.textContent);
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    if (tasks) {
        tasks.forEach(taskText => {
            const newItem = document.createElement('li');
            newItem.textContent = taskText;
            list.appendChild(newItem);

            newItem.addEventListener('click', () => {
                if (selectedItem) {
                    selectedItem.classList.remove('selected');
                }
                selectedItem = newItem;
                selectedItem.classList.add('selected');
            });
        });
    }
}

loadTasks();

add.addEventListener('click', () => {
    currentAction = 'add';
    modalTitle.textContent = 'Добавить задачу';
    taskInput.style.display = 'flex';
    taskInput.value = '';
    modalActionButton.textContent = 'Добавить';
    closeButton.style.display = 'flex';
    modal.style.display = 'flex';
});

edit.addEventListener('click', () => {
    if (selectedItem) {
        currentAction = 'edit';
        modalTitle.textContent = 'Редактировать задачу';
        taskInput.value = selectedItem.textContent;
        taskInput.style.display = 'flex';
        modalActionButton.textContent = 'Сохранить';
        modal.style.display = 'flex';
    } else {
        currentAction = null;
        modalTitle.textContent = 'Выберите задачу для редактирования!';
        modalActionButton.textContent = 'Ок';
        taskInput.style.display = 'none';
        modal.style.display = 'flex';
    }
});

del.addEventListener('click', () => {
    if (selectedItem) {
        currentAction = 'delete';
        modalTitle.textContent = 'Вы уверены, что хотите удалить эту задачу?';
        modalActionButton.textContent = 'Да';
        taskInput.style.display = 'none';
        modal.style.display = 'flex';
    } else {
        currentAction = null;
        modalTitle.textContent = 'Выберите задачу для удаления!';
        modalActionButton.textContent = 'Ок';
        taskInput.style.display = 'none';
        modal.style.display = 'flex';
    }
});

closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
});

closeButton.addEventListener('click', () => {
    modal.style.display = 'none';
});

modalActionButton.addEventListener('click', () => {
    if (currentAction === 'add') {
        const newItem = document.createElement('li');
        newItem.textContent = taskInput.value;
        list.appendChild(newItem);

        newItem.addEventListener('click', () => {
            if (selectedItem) {
                selectedItem.classList.remove('selected');
            }
            selectedItem = newItem;
            selectedItem.classList.add('selected');
        });

        saveTasks();
    } else if (currentAction === 'edit') {
        selectedItem.textContent = taskInput.value;
        saveTasks();
    } else if (currentAction === 'delete') {
        list.removeChild(selectedItem);
        selectedItem = null;
        saveTasks();
    }

    modal.style.display = 'none';
});

window.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});