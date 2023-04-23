// Input and Output
window.addEventListener('load', init);
var countFn;
function init(){
    bindEvents();
    printCount();
    countFn = initCount();
    showCount();
}

function showCount(){
    document.getElementById('id').value = countFn();
}

function bindEvents(){
    document.getElementById('add')
    .addEventListener('click', addQuestion);
    document.getElementById('delete').addEventListener('click', deletePerm);
    document.querySelector('#save').addEventListener('click', save);
    document.getElementById('load').addEventListener('click', loadData);
}

function loadData(){
    console.log("I am Load...");
    if(window.localStorage){
            if(localStorage.questions){
                const arr = JSON.parse(localStorage.getItem('questions'));
                questionOperations.questions = arr;
                printTable();
                printCount();
                alert("data loaded...");
            }
            else{
                alert("Nothing to Load...");
            }
    }
    else{
        alert("Outdated Browser");
    }
}

function save(){
    if(window.localStorage){
        const questionArray = questionOperations.questions;
        localStorage.setItem('questions', JSON.stringify(questionArray));
        alert("Data Store in Disk");
    }
    else{
        alert("Ur Browser is Outdated Not Having Support of Storage...");
    }
}

function load(){

}

function deletePerm(){
    questionOperations.remove();
    printTable();
    printCount();
    
    
}

function printTable(){
    document.getElementById('questions').innerHTML='';
    questionOperations.questions.forEach(printQuestion);
}

function addQuestion(){
    // read all fields
    const fields = ["id", "name", "optiona","optionb","optionc","optiond","score","rightans"];
    const questionObject = {}; // Create Object
    for(let  i= 0 ; i<fields.length;i++){
        questionObject[fields[i]] = document.getElementById(fields[i]).value ;
    }
    questionObject.isMarked = false;
    questionOperations.add(questionObject);
    printQuestion(questionObject);
    console.log(questionObject);
    printCount();
    showCount();
}

function printCount(){
    const total = questionOperations.getLength();
    const mark = questionOperations.countMark();
    const unMark = questionOperations.countUnMark();
    document.getElementById('total').innerText = total;
    document.getElementById('mark').innerText = mark;
    document.getElementById('unmark').innerText = unMark;
}

function markDelete(){
    // where i click (On Which Row)
    const icon = this;
    const qid = icon.getAttribute('qid');
    questionOperations.toggleMark(qid);
    const tr = this.parentNode.parentNode;
    tr.classList.toggle('alert-danger');
    printCount();
 // css  (toggle)
}
function edit(){
    console.log("I am The Edit");
}
function createIcon(fn, id, className){
    // <i class="fa-solid fa-trash-can"></i>
    const icon = document.createElement('i');
    icon.className = 'fa-solid '+className;
    icon.addEventListener('click',fn);
    icon.setAttribute("qid",id); // Custom Attribute
    return icon;
}

function printQuestion(questionObject){
// Row, Cells, Fill Data (Object)
const tbody = document.getElementById('questions');
const tr = tbody.insertRow();
var index = 0;
for(let key in questionObject){
    if(key == 'isMarked'){
        continue;
    }
    tr.insertCell(index).innerText = questionObject[key];
    index++;
}
const td= tr.insertCell(index);
td.appendChild(createIcon(markDelete, questionObject.id,'fa-trash-can'));
td.appendChild(createIcon(edit, questionObject.id,'fa-pencil'));
}
