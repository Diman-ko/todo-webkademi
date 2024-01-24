// console.log('work')
// находим элемент на странице
// constants


const form = document.querySelector('#form');
const taskInput = document.querySelector('#taskInput');
// console.log(taskInput) //<input type="text" className="form-control" id="taskInput" placeholder="Текст задачи" required>
const tasksList = document.querySelector('#tasksList');
const emptyList = document.querySelector('#emptyList')
const addTask = (event) => {
    //  нужно отменить перезагрузку страницы, event записывается в скобки функции и вызывается метод
    // Отменяем отправку формы
    event.preventDefault(); // этот метод отменяет стандартную перезагрузку страницы.
    // console.log('submit')//
    //  Достаём текст задачи из поля ввода
    const taskText = taskInput.value
    // console.log(taskText) //  выводит текст из поля ввода
    //============================ работаем с данными  localStorage
    //  описали объект для нашей задачи
    const newTask =  {
        id: Date.now(),
        text: taskText,
        done: false,
    };

    //  добавим объект в массив с задачами
    tasks.push(newTask);
    // console.log(tasks);

    renderTask(newTask);
    /*//  формируем css  класс
    const cssClass = newTask.done ? 'task-title task-title--done' : 'task-title';

    //============================


    const taskHTML = `
         <li id="${newTask.id}" class="list-group-item d-flex justify-content-between task-item">
            <span class="${cssClass}">${newTask.text}</span>
            <div class="task-item__buttons">
                <button type="button" data-action="done" class="btn-action">
                     <img src="./img/tick.svg" alt="Done" width="18" height="18">
                 </button>
                <button type="button" data-action="delete" class="btn-action">
                    <img src="./img/cross.svg" alt="Done" width="18" height="18">
                </button>
            </div>
        </li> `
    // console.log(taskHTML) //  проверка вывода с названием названия с помощью интерполяции  ${newTask.text}

    //  Добавляем задачу на страницу
    tasksList.insertAdjacentHTML('beforeend', taskHTML);

*/
    taskInput.value = ''; //  для очистки поля ввода после добавления списка дел, присваиваем ему пустую строку

    // оставляем фокус на поле ввода  input
    taskInput.focus(); //  теперь после очистки поля фокус будет перемещаться на поле ввода  input

    //  скрывает emptyList, сначала проверяем нет ли задач, если есть скрываем
  /*  if (tasksList.children.length > 1) {
        emptyList.classList.add('none');
    }*/
    saveToLocalStorage()
    checkEmptyList()
};

const deleteTask = (event) => {
    //  куда мы кликнули определяем опять параметром  event
    // Проверяем, что клик был НЕ по кнопке delete
    if (event.target.dataset.action !== 'delete') return;

    const parentNode = event.target.closest('.list-group-item');
    // console.log(parentNode); //  проверка правильной работы  работает правильно, указывает нужный тег

    //============================== localStorage
        //  Определяем ID задачи

    const id = Number(parentNode.id);
    // console.log(id) // тест  при нажатии на кнопку delete
    //  находим индекс и удалим из массива по индексу
/*
   const index = tasks.findIndex((task) => task.id === id);
    /!* const index = tasks.findIndex( (task) => {
        // console.log(task);
      /!*  if (task.id === id) {
            return true;
            //  можно упростить
        }*!/
       return task.id === id;
    });*!/
    console.log(index)
    //  Удаляем задачу из массива
    tasks.splice(index, 1);
*/

    // Аналогичный способ с методом filter.  Удаляем задачу через фильтрацию массива и создание нового массива
    tasks = tasks.filter((task) => task.id !== id);
    //==============================


    if (confirm('Вы уверены?')) {
        parentNode.remove() //  удаляет после подтверждения удаления во всплывающем окне

        //  проверяем есть ли в списке задач первый элемент с надписью "Список дел пуст"
      /*  if (tasksList.children.length === 1) {
            emptyList.classList.remove('none'); // удаляем класс
        }*/
    }


    // console.log('del') //  проверка попали ли мы по области
    // console.log(event.target)//  Проверка куда попали.  Видим тот элемент по которому произошёл клик
    /* if (event.target.dataset.action === 'delete') {
        // console.log('delete') //  проверка, что выводится только при попадании на нужную кнопку
        const parentNode = event.target.closest('.list-group-item');
        // console.log(parentNode); //  проверка правильной работы  работает правильно, указывает нужный тег

        if (confirm('Вы уверены?')) {
            parentNode.remove() //  удаляет после подтверждения удаления во всплывающем окне

            //  проверяем есть ли в списке задач первый элемент с надписью "Список дел пуст"
            if  (tasksList.children.length === 1){
                emptyList.classList.remove('none'); // удаляем класс
            }
        }

    }*/
    saveToLocalStorage()
    checkEmptyList()
};

const doneTask = (event) => { //  куда мы кликнули определяем опять параметром  event

    if (event.target.dataset.action !== 'done') return;

    // console.log('done') //  проверка, что выводится только при попадании на нужную кнопку
    const parentNode = event.target.closest('.list-group-item')//  нашли родительский тег  li
    // console.log(parentNode); //  выводит названия тех кнопок на которые нажимаем
    const taskTitle = parentNode.querySelector('.task-title');
    // console.log(taskTitle); //  видим нужный span   в консоле

    // Добавляем этому span нужный класс
    taskTitle.classList.toggle('task-title--done');

//===================================== Тут localStorage
    const id = Number(parentNode.id);  //  определяем   id задачи
    const task = tasks.find((task) => task.id === id);
    task.done = !task.done
// ======================================================
    /*    if (event.target.dataset.action === 'done') {
        // console.log('done') //  проверка, что выводится только при попадании на нужную кнопку
        const parentNode = event.target.closest('.list-group-item')//  нашли родительский тег  li
        // console.log(parentNode); //  выводит названия тех кнопок на которые нажимаем
        const taskTitle = parentNode.querySelector('.task-title');
        // console.log(taskTitle); //  видим нужный span   в консоле

        // Добавляем этому span нужный класс
        taskTitle.classList.toggle('task-title--done');

        // ======================
        //   Добавляем родительскому parentNode  всему комплексу li  значение выполнено, окрашивая в зелёный цвет из бутстрапа
        parentNode.classList.toggle('list-group-item-success')

    }*/
    saveToLocalStorage()
    checkEmptyList()
};


//======= array for localStorage ============

let tasks = [];
// console.log(tasks)
if (localStorage.getItem('tasks')) {
// console.log(JSON.parse(localStorage.getItem('tasks')));

    tasks = JSON.parse(localStorage.getItem('tasks'));
    tasks.forEach((task) => renderTask(task));
}




// =====================================

//  Добавляем задачи. Вызов формы  при прослушивании событий
form.addEventListener('submit', addTask);

// Удаляем задачи при прослушивании событий  области добавленной задачи
tasksList.addEventListener('click', deleteTask);

//  Отмечаем задание как выполненное
tasksList.addEventListener('click', doneTask);


// ======================================== добавление и удаление записипервого li элемента "Список пуст"==============


const checkEmptyList = () => {
    // console.log(tasks.length)
    if (tasks.length === 0) {
        const emptyListHTML = `
        <li id="emptyList" class="list-group-item empty-list">
            <img src="./img/leaf.svg" alt="Empty" width="48" class="mt-3">
            <div class="empty-list__title">Список дел пуст</div>
        </li>`;
        tasksList.insertAdjacentHTML('afterbegin', emptyListHTML);
    }

    if (tasks.length > 0) {
        const emptyListEl =  document.querySelector('#emptyList');
        emptyListEl ? emptyListEl.remove() : null;
    }
};

checkEmptyList() // записываем его в конце и в addTask, deleteTask, done Task



// ======================================== Local storage==============

function saveToLocalStorage() { // записываем saveToLocalStorage()  в конце и в addTask, deleteTask, done Task
    localStorage.setItem('tasks', JSON.stringify(tasks))
}


function renderTask(task) {
    const cssClass = task.done ? 'task-title task-title--done' : 'task-title';
    const taskHTML = `
         <li id="${task.id}" class="list-group-item d-flex justify-content-between task-item">
            <span class="${cssClass}">${task.text}</span>
            <div class="task-item__buttons">
                <button type="button" data-action="done" class="btn-action">
                     <img src="./img/tick.svg" alt="Done" width="18" height="18">
                 </button>
                <button type="button" data-action="delete" class="btn-action">
                    <img src="./img/cross.svg" alt="Done" width="18" height="18">
                </button>
            </div>
        </li> `
    // console.log(taskHTML) //  проверка вывода с названием названия с помощью интерполяции  ${newTask.text}

    //  Добавляем задачу на страницу
    tasksList.insertAdjacentHTML('beforeend', taskHTML);
};