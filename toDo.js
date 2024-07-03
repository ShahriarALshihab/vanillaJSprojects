let userInput=document.querySelector(".container .add-task-box input"); 
let addBtn=document.querySelector(".container .add-task-box .add-btn"); 

let allTasksBox=document.querySelector(".container .all-task");

let no_of_tasks_txt=document.querySelector(".container .others .no-of-task"); 

let clearAllBtn=document.querySelector(".container .others .clear-all-task"); 

let othersBox=document.querySelector(".container .others"); 

//Getting local Storage All-todos and if todos isn't exist pass an empty array to todos

let todos=JSON.parse(localStorage.getItem("all-todos")|| "[]"); 


addBtn.addEventListener("click",()=>{
    if(userInput.value!=""){
        createToDo(userInput.value); 
    }
}); 

 let createToDo=(userTask)=>{
     let taskInfo={task:userTask,status:"pending"}; 
     todos.push(taskInfo); //pushing new task ot todos 

     localStorage.setItem("all-todos",JSON.stringify(todos)); 
     userInput.value=""; 
     showTask();
     count_no_of_tasks(); 
 }

 let showTask=()=>{
    let li= ""; 

    todos.forEach((todo,id)=>{
        //If todo is 'completed' then set isCompleted to checked

        let isCompleted=todo.status=="completed"?"checked":""; 

       li += `<div class="task">
            <input type="checkbox" name=""id="${id}"
            onclick="taskComplete(this)" ${isCompleted}>
            <span class="userTask ${isCompleted}">${todo.task}</span>
            <div class="btns">
                <button class="delete-btn" onclick="deleteTask(${id})">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </div>
            </div>`; 
    })

    allTasksBox.innerHTML=li || `<p class="clipboard-icon"><i class="fa-solid fa-clipboard"></i></p>
    <p class="no-task-message">No tasks here yet</p>`; 
    count_no_of_tasks(); 
    if(todos.length==0){
        othersBox.style.display="none"; 

    }else{
        othersBox.style.display="block"; 
    }
 }

 let taskComplete=(element)=>{

    if(element.checked){
        element.nextElementSibling.classList.add("checked"); 

        // Updating the status of selected task to 'completed';
        todos[element.id].status="completed"; 
    }else{
        element.nextElementSibling.classList.remove("checked"); 

        //Updating the status of selected task of 'pending'
        todos[element.id].status="pending"; 
    }
    localStorage.setItem("all-todos",JSON.stringify(todos)); 
}

let deleteTask=(deleteId)=>{
    //removing selected task from the todos
    todos.splice(deleteId,1); 
    localStorage.setItem("all-todos",JSON.stringify(todos)); 
    showTask(); 
}

let count_no_of_tasks=()=>{
    let no_of_tasks=todos.length; 
no_of_tasks_txt.innerHTML=`You have <strong>${no_of_tasks}</strong> Tasks`; 
}

clearAllBtn.addEventListener("click",()=>{
    todos=[]; 
    localStorage.setItem("all-todos", JSON.stringify(todos)); 
    showTask(); 
})

showTask(); 
