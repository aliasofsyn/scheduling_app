let monthNav = 0;
let clicked = null;
let userLogged = localStorage.getItem('userLoggedIn')
let shiftsList = localStorage.getItem('shifts') ? JSON.parse(localStorage.getItem('shifts')) : [];
const weekdays = [
    "Sunday", "Monday", 'Tuesday', 'Wednesday','Thursday','Friday','Saturday'
];
const calendar = document.getElementById('calendar');
const createShift = document.getElementById('addShift');
const deleteShift = document.getElementById('deleteShift');
const BG = document.getElementById('newEventBG');
const shiftType = document.getElementById('shiftTitleInput');

let shiftEnd =  document.getElementById('shiftEnd');
let shiftStart = document.getElementById('shiftStart');
let addButton = document.getElementById('addButton').addEventListener('click', saveShift);


makeCalendar();

saveShift();




function makeShift(date){
    //gets the date of the clicked boxx
    clicked =  date;
    // gets the shifts listed on that day 
    const shiftForDay = shiftsList.find(s => s.date === clicked);
    const totalShifts = shiftsList.length;
    //console.log(shiftForDay)
    if (shiftForDay){
        info = ''
        // for loop creates a list item for every shift on the day including their name, start and end time a displays it on the pop up
        for(let i = 0; i < totalShifts; i++){
        let multipleShift = JSON.parse(localStorage.getItem('shiftsList'))
        var shiftLI = document.createElement('li')
        shiftLI.classList.add('listedEvent')
        let info = multipleShift[i].shiftTitle + ": " +multipleShift[i].shiftStart +" - "+ multipleShift[i].shiftEnd
        shiftLI.appendChild(document.createTextNode(info))
        info = ''
        shiftUL = document.getElementById('shiftList')

        }
        shiftUL.appendChild(shiftLI)
        deleteShift.style.display = 'block';
        

    }else{ 
        createShift.style.display = 'block';
    }
        BG.style.display = 'block';
}

function removeListedItems(parent){
    while(parent.firstChild){
        parent.removeChild(parent.firstChild)
    }
}


function deletesShift(){
    shiftsList = shiftsList.filter( e=> e.date !== clicked)
    localStorage.setItem('shiftsList', JSON.stringify(shiftsList))
    const shiftListed = document.querySelector('#shiftList')
    removeListedItems(shiftListed);

    closePopUp();

}

function addShift(){
    deleteShift.style.display = 'none';
    createShift.style.display = 'block';
    saveShift();

}

function saveShift(){
    // if there's an input to add a shift it pushes the input data into the shiftsList array 
if(shiftType.value && shiftStart.value && shiftEnd.value){
    shiftType.classList.remove('error');
    shiftsList.push({
        date: clicked,
        shiftTitle: shiftType.value,
        shiftStart: shiftStart.value,
        shiftEnd: shiftEnd.value,
        })
    localStorage.setItem('shiftsList', JSON.stringify(shiftsList, shiftEnd, shiftStart));
    closePopUp();
    } else {
        shiftType.classList.add('error');
    }
}

function closePopUp(){
    shiftType.classList.remove('error');   
    createShift.style.display = 'none'; 
    deleteShift.style.display = 'none'; 

    BG.style.display = 'none';
    shiftType.value = ''; 
    clicked = null;
    document.getElementById('shiftStart').value = 1;
    document.getElementById('shiftEnd').value = 1;
        makeCalendar();

}



function makeCalendar(){
    //gets the date of the Day
    const dt = new Date();
   
    //When pressing the back or next button to get the next month either adds or substracts from month nav which is used to get the correct month
    if (monthNav !== 0){
        dt.setMonth(new Date().getMonth() + monthNav);
    }

    const day = dt.getDate(); //current day
    const month = dt.getMonth(); //current month 
    const year = dt.getFullYear(); //current year
   
    //gets the total amount of days for each mont 
    const daysInMonth = new Date(year, month + 1, 0).getDate();
   
    //displays month on the homepage
    document.getElementById('monthDisplay').innerText = `${dt.toLocaleDateString('en-us',{month: "long"})} ${year}`
   
    //clears calendar in order to recreate calendar when switching months to ensure correct amount of days are in the month
    calendar.innerHTML = '';
   
    //creates every day into a singular box into a div
    for (let i = 1; i < daysInMonth;i++){
        const daySquare = document.createElement('div');
        daySquare.classList.add('day')
    
        //adds day to the box 
        daySquare.innerText = i;
        
        //loops through every day in the month and searches for if there's a shift listed on that day
        if (i < daysInMonth){
            const dayString = `${month+1}/${i}/${year}`;
            const shiftForDay = shiftsList.find(e => e.date === dayString);

            //if there is a shift on that day then it creates a div which holds the information for the shift(name and time)
            if(shiftForDay){
                const shiftDiv = document.createElement('div');
                shiftDiv.classList.add('shiftsList');
                shiftDiv.innerText = "Employee: "+shiftForDay.shiftTitle + "||"+shiftForDay.shiftStart +" - "+shiftForDay.shiftEnd;
                daySquare.appendChild(shiftDiv);
            }
            //listens for if a day box is clicked which is used later for creating, adding, and deleting shifts. 
            daySquare.addEventListener('click', () => makeShift(dayString));
            

            //finds the current days and highlights it blue for the client 
            if (i  == day && monthNav == 0){
                daySquare.id = 'currentDay';
            }
        }
        calendar.appendChild(daySquare);
    }
}



function makeButtons(){
    document.getElementById('nextButton').addEventListener('click', () => {
    monthNav++;
    makeCalendar();
    });
    document.getElementById('backButton').addEventListener('click', () => {
    monthNav--;
    makeCalendar();
    });

    document.getElementById('saveButton').addEventListener('click', saveShift);
    document.getElementById('cancelButton').addEventListener('click', closePopUp);
    document.getElementById('deleteButton').addEventListener('click', deletesShift);
    document.getElementById('closeButton').addEventListener('click', closePopUp);
    document.getElementById('addButton').addEventListener('click', addShift);
}

//Drop down from w3Schools link: https://www.w3schools.com/howto/howto_js_dropdown.asp
function Dropdown() {
    document.getElementById("DP").classList.toggle("show");
  }

window.onclick = function Dropdown(event){
    if (!event.target.matches('.DPButton')) {
        var dropdowns = document.getElementsByClassName("DPContent");
        for (let i = 0; i < dropdowns.length; i++) {
          var openDropdown = dropdowns[i];
          if (openDropdown.classList.contains('show')) {
            openDropdown.classList.remove('show');
          }
        }
      }
}



makeButtons();
