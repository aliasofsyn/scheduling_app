
let col = []; 
async function mainEvent(){
    console.log('mainEvent started')
    fetch('./user.json')
    .then(response =>{
        return response.json()
    })
    .then(data => {
        for(let i =0; i < data.users.length; i++){
            for(var key in data.users[i]){
                if(col.indexOf(key) == -1){
                    col.push(key)
                }
            }
        }   
        let table = document.createElement('table')
        let row = table.insertRow(-1)
       
        for(let i = 0 ; i<col.length; i++ ){
            let tableHeader = document.createElement('th')
            tableHeader.innerHTML = col[i]
            row.appendChild(tableHeader)
        }

        for(let i = 0; i< data.users.length; i++){
            row = table.insertRow(-1)
            for(let k = 0; k< col.length; k++){
                let tablePoint = row.insertCell(-1)
                tablePoint.innerHTML = data.users[i][col[k]]

            }
        }
        let container = document.getElementById('container')
        container.innerHTML = ''
        container.appendChild(table)
    })   
}



document.addEventListener('DOMContentLoaded', mainEvent())
