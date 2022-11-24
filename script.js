var selectVal = $('#alarm-values select').children();
var timeVal = $('#alarm-values select');
var form = $('#alarm-values').children();
var list = $('#list');
var delBtn = $('#list input');

var sound = new Audio('alarmm.mp3');
sound.loop = true;

//add dropdown values in the form
function dropdownVal() {
    for (let i = 12; i >= 1; i--) {
        i = i < 10 ? "0" + i : i;
        let option = `<option value=${i}>${i}</option>`;
        $(selectVal[0]).after(option);

    }

    for (let i = 59; i >= 0; i--) {
        i = i < 10 ? "0" + i : i;
        let option = `<option value=${i}>${i}</option>`;
        $(selectVal[1]).after(option);
    }
    for (let i = 59; i >= 0; i--) {
        i = i < 10 ? "0" + i : i;
        let option = `<option value=${i}> ${i} </option>`;
        $(selectVal[2]).after(option)
    }

    for (let i = 0; i <= 1; i++) {
        let ap = i === 0 ? "PM" : "AM";
        let option = `<option value=${ap}>${ap}</option>`;
        $(selectVal[3]).after(option)

    }
}
dropdownVal();
//create var that can contain list of alarms
var alarm_list = [];

$("#set-alarm-btn").click(function(e) {
    //getting option val of time
    var hr = $(timeVal[0]).val();
    var min = $(timeVal[1]).val();
    var sec = $(timeVal[2]).val();
    var ap = $(timeVal[3]).val();

    var alarm_time = `${hr}:${min}:${sec} ${ap}`;
    // console.log(alarm_time.includes("hr"));
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

})

function render() {
    document.getElementById('list').innerHTML = '';
    for (let i = 0; i < alarm_list.length; i++) {
        sendToDom(alarm_list[i], i);
    }
}

function sendToDom(element, i) {
    let li = $(`<li>
    <span>${element}</span>
    <input type="button" value="Delete" id=${i} onclick="Delete(${i})">
    </li>`);
    list.append(li);

}

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

    $(`#currtime`).text(time)
    for (let i = 0; i < alarm_list.length; i++) {
        if (alarm_list[i] === time) {
            window.alert("Wake up and close the alarm!!");
            sound.play();
            setTimeout(function() {
                sound.pause();
            }, 5000);
            Delete(i);
            render();
        }
    }
}


//delete
function Delete(id) {
    console.log(id);
    alarm_list.splice(id, 1);
    console.log(alarm_list);
    render();
}

setInterval(currtime, 1000);
