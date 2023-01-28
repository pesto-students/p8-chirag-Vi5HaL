// write an webpage 
// counter value - init 0
// 2 button 
    // add - to add the counter value increment by 1
    // substract - to decrement by 1

    
    
function add(){
    const countDiv = document.getElementById('count');
    console.log(countDiv)
    countDiv.innerHTML = parseInt(countDiv.innerHTML) + 1
}

function substract(){
    const countDiv = document.getElementById('count');

    console.log(countDiv.innerHTML)

    countDiv.innerHTML = parseInt(countDiv.innerHTML) - 1
}