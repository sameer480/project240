(function(){
	var tasks = [];
const taskList = document.getElementById('list');
const addTaskInput = document.getElementById('add');
const tasksCounter = document.getElementById('tasks-counter');

console.log('Working');
async function fetchTodos(){
	//fetch()
	// fetch('https://jsonplaceholder.typicode.com/todos/1')
	// .then(function(response){
	// 	return response.json();
	// }).then(function(data){
	// 	console.log(data);
	// 		tasks=data.slice(0,10);
	// 		renderList();
	// 	})
	// 	.catch(function(error){
	// 		console.log(error);
	// 	})
		//console.log(response);
		try{
			const reposnse=await fetch('https://jsonplaceholder.typicode.com/todos');
			const data=await reposnse.json();
			console.log(data,'data');
			tasks=data.slice(0,10);
			console.log(tasks,'tasks');
			renderList();
		} catch(error){
			console.log(error);
		}
	
}
function addTaskToDOM(tasks){
	const li=document.createElement('li');
	console.log(tasks);
	li.innerHTML=`<input type="checkbox" id="${tasks.id}" ${tasks.completed?'checked':''} class="custom-checkbox-1"/>
          <label class="custom-checkbox-1" id="${tasks.id}" for="${tasks}">${tasks.title}</label>
          <img src="./deletebtn.jpg" class="delete" data-id="${tasks.id}" />`
          taskList.append(li);
      }

function renderList () {
	console.log('3');
	taskList.innerHTML="";
	for (let i = 0; i < tasks.length; i++) {
		addTaskToDOM(tasks[i]);
	}
	tasksCounter.innerHTML=tasks.length;
}

function toggleTask(taskId) {
	//console.log(taskId,'the task is:');
	const newtask=tasks.filter(function(task){
		console.log('task lenght',task.id);
return task.id==taskId
	});
	//console.log('the new toggle task',newtask);
	//console.log(task);
	//console.log('task lenght',task.length);
	if(newtask.length>0){
		//console.log('task',task);
		const currentTask=newtask[0];
		currentTask.completed=!currentTask.completed;
		renderList();
		showNotification('task toggle successfully');
		return;
	}else{
	showNotification('unsuccesfull');
}

}

function deleteTask (taskId) {
	console.log('taskId',taskId);
	const newtasks=tasks.filter(function(task){
     return task.id!=taskId;
	});
	tasks=newtasks;
	renderList();
	showNotification("task deleted successfully");
}

function addTask (task) {
	if(task){
		console.log(task);
		fetch('https://jsonplaceholder.typicode.com/todos',{
			method:'POST',
			headers:{
				'Content-Type':'application/json',

			},
			body:JSON.stringify(task),
		})
	.then(function(response){
		console.log(response,'reposnse');
		return response.json();
	}).then(function(data){
		console.log(data,'92');
			tasks.push(data);
		renderList();
		showNotification("task added successfully");
		//return;
		})
		.catch(function(error){
			console.log('error',error);
		})
		
	}else{
		console.log('else');
	showNotification("task cannot be added");
}
}

function showNotification(text) {
	alert(text);
}
function handleInputKeypress(e){
	console.log(e);
	if(e.key=='Enter'){
		const text=e.target.value;
console.log('1');
		if(!text){
			showNotification('Text cannot be empty');
			return;
		}
		const task={
			title:text,
			id:Date.now(),
			completed:false
		}
		e.target.value=''
		addTask(task);
	}
}
function handleClickListerner(e){
	const target=e.target;
	console.log(target);
	if (target.className==='delete') {
		console.log('delete');
		const taskId=target.dataset.id;
		deleteTask(taskId);
		return;
	} else if(target.className==='custom-checkbox-1'){
		console.log('toggletask');
		const taskId=target.id;
		toggleTask(taskId);
		return;
	}
}
function initalizeApp(){
	console.log('2');
	fetchTodos();
	addTaskInput.addEventListener('keypress',handleInputKeypress);
	document.addEventListener('click',handleClickListerner);
}
initalizeApp();
})()