$('.container').animate({top:'15%'} , 1000)


$('.alert').animate( {opacity: "1"}, 2000 )
setTimeout(() => {
    $('.alert').animate( {opacity: "0"}, 1000 , ()=>{
        alertDiv.css('display', 'none');
    });
  }, 5000);

let alertDiv = $('#alertDiv');
$('#alertBtn').click(()=>{
    $('.alert').animate( {opacity: "0"}, 1000 , ()=>{
        alertDiv.css('display', 'none');
    });
    
})


let alertDiv2 = $('#alertDiv2');
let alertBtn2 = $("#alertBtn2");
alertDiv2.animate({opacity:'1'} , 1000);
setTimeout(() => {
    $('#alertDiv2').animate( {opacity: "0"}, 1000 , ()=>{
        alertDiv2.css('display', 'none');
    });
  }, 10000);
alertBtn2.click( ()=>{
    alertDiv2.animate({opacity:'0'} , 1000 , ()=>{
        alertDiv2.css('display', 'none');
    })
})

let addBtn = document.getElementById('addBtn');
let editBtn = document.getElementById('editBtn');
let todoInput = document.getElementById('todoInput');
let list = document.getElementById('list');
let clearBtn = document.getElementById('clearBtn');
// saving data to local storage
let todoLists ;
if(localStorage.getItem('lists') == null){
    todoLists = [];
}else{
    todoLists = JSON.parse(localStorage.getItem('lists'));
    showTodoLists();
    showPendingTasks();
}


todoInput.addEventListener('keyup' , ()=>{

    if(todoInput.value.trim() != 0){
        addBtn.classList.add('active');
        
    }else if(todoInput.value.trim() == 0){
        addBtn.classList.remove('active');
        
    }
})

function checkActivity(){
    if(todoLists.length == 0){
        editBtn.classList.remove('active');
    }else{
        editBtn.classList.add('active');
    }
}

addBtn.addEventListener('click', function () {
    if (todoInput.value.trim() !== "") {  
        todoLists.push(todoInput.value);
        localStorage.setItem('lists' , JSON.stringify(todoLists));
        showTodoLists();
        showPendingTasks();
        checkActivity()
        todoInput.value = "";
    }
});

function showTodoLists() {
    let todoDivs = ``;
    for (let i = 0; i < todoLists.length; i++) {
        todoDivs += `<div class="list-info">
        <li> <span>${i+1}.</span> ${todoLists[i]}
            <div class="list-delete">
                <button class="deleteBtn btn btn-primary" data-index="${i}"><i class="fas fa-trash"></i></button>
            </div>
        </li>
    </div>`;
    }
    list.innerHTML = todoDivs;

    // Add event listeners to delete buttons after updating the DOM
    document.querySelectorAll('.deleteBtn').forEach(button => {
        button.addEventListener('click', function () {
            let taskIndex = this.getAttribute("data-index");
            deleteTask(taskIndex);
        });
    });
}

function showPendingTasks() {
    document.getElementById('pending').innerHTML = `<p>You have <span> ${todoLists.length} </span> Pending tasks</p>`;
    
}

function deleteTask(index) {
    todoLists.splice(index, 1);
    localStorage.setItem('lists', JSON.stringify(todoLists));
    showTodoLists();
    showPendingTasks();
    checkActivity()
}

clearBtn.addEventListener('click', function () {
    todoLists = [];
    localStorage.setItem('lists', JSON.stringify(todoLists));
    showTodoLists();
    showPendingTasks();
    editBtn.classList.remove('active');
    addBtn.classList.remove('active');
    todoInput.value = "";
});


editBtn.addEventListener('click', function () {
    if (todoLists.length > 0) {
        let lastElement = todoLists[todoLists.length - 1];
        todoInput.value = lastElement;
        todoLists.pop(); // removes the last element
        showTodoLists();
        showPendingTasks();
        checkActivity()
    }
});

