var selectVal = document.querySelectorAll('#alarm-values select');
var timeVal = document.querySelectorAll('#alarm-values select');
var form = document.querySelectorAll('#alarm-values');
var list = document.getElementById('list');
var delBtn = document.getElementById('list input');
var myPopup = document.querySelector(".popup-box");
var btnClose = document.querySelector("#close-pop");
var sound = new Audio('alarmm.mp3');
sound.loop = true;

//create a function to use for the select droupdown
function loop(st, en, element) {
    for (let i = st; i <= en; i++) {
        const list = document.createElement("option");
        list.value = i < 10 ? "0" + i : i;
        list.innerHTML = i < 10 ? "0" + i : i;
        element.appendChild(list);
    }
}
//add dropdown values in the form
function dropdownVal() {

    loop(1, 12, selectVal[0]);
    loop(0, 59, selectVal[1]);
    loop(0, 59, selectVal[2]);

    for (let i = 0; i <= 1; i++) {
        const list = document.createElement("option");
        list.value = i === 0 ? "AM" : "PM";
        list.innerHTML = i === 0 ? "AM" : "PM";
        selectVal[3].appendChild(list);

    }
}


dropdownVal();
//create var that can contain list of alarms
var alarm_list = [];

document.getElementById("set-alarm-btn").onclick = function(e) {
    //getting option val of time
    var hr = timeVal[0].value;
    var min = timeVal[1].value;
    var sec = timeVal[2].value;
    var ap = timeVal[3].value;

    var alarm_time = `${hr}:${min}:${sec} ${ap}`;
    if (alarm_time.includes("hour") || alarm_time.includes("Min") || alarm_time.includes("Sec") || alarm_time.includes("duration")) {
        window.alert("Invalid values");
        return;
    }
    var abc = 0;
    for (let i = 0; i < alarm_list.length; i++) {
        if (alarm_list[i] == alarm_time) {
            abc = 1;
        }
    }
    if (abc == 0) {
        alarm_list.push(alarm_time);
        console.log(alarm_list);
        render();
    } else {
        window.alert("Alarm Already added");
    }

    form[0].reset;

}


//render alaram list with delete button
function render() {
    document.getElementById('list').innerHTML = '';
    for (let i = 0; i < alarm_list.length; i++) {
        sendToDom(alarm_list[i], i);
    }
}


//data will send to dom
function sendToDom(element, i) {
    let newli = document.createElement("li");
    newli.innerHTML = `
        <span>${element}</span>
        <input type="button" value="Delete" id=${i} onclick="Delete(${i})">
        `;
    list.appendChild(newli);

}

// add zero on time
function addZero(time) {
    return (time < 10) ? "0" + time : time;

}
//get current time

function currtime() {
    let currentTime = new Date();
    let hour = currentTime.getHours();
    if (hour === 0) {
        hour = 12;
    }
    if (hour > 12) {
        hour = hour - 12;
    }
    let ampm = currentTime.getHours() >= 12 ? 'PM' : 'AM';

    let time = addZero(hour) + ":" + addZero(currentTime.getMinutes()) + ":" + addZero(currentTime.getSeconds()) + " " + ampm;

    document.getElementById("currtime").innerText = time;
    for (let i = 0; i < alarm_list.length; i++) {
        if (alarm_list[i] === time) {
            // window.alert("Wake up and close the alarm!!");
            sound.play();
            poPup();
            btnClose.onclick = function() {
                myPopup.style.display = "none";
                document.getElementById("alarm").style.filter = "blur(0px)";
                sound.pause();
                Delete(i);
            };

            render();
        }
    }
}

//model show when alarm will ringing
function poPup() {
    document.getElementById("alarm").style.filter = "blur(7px)";
    myPopup.style.display = "block";
}

//delete
function Delete(id) {
    // console.log(id);
    alarm_list.splice(id, 1);
    console.log(alarm_list);
    render();
}

setInterval(currtime, 1000);
