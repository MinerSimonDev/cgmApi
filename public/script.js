const bs = document.getElementById('bloodSugarValue');
const ago = document.getElementById('time');
const date = document.getElementById('date');
const delta = document.getElementById('delta');
const alarm = document.getElementById('alarm');

function setInitialValue() {
    if (!localStorage.getItem('lastValue')) {
        localStorage.setItem('lastValue', new Date().getTime().toString());
    }
}

function updateAgo() {
    setInterval(function () {
        var currentDate = new Date();
        var lastValue = localStorage.getItem('lastValue');

        if (lastValue) {
            var differenceInMinutes = Math.floor((currentDate - new Date(parseInt(lastValue))) / (1000 * 60));

            ago.textContent = differenceInMinutes + " Min";
        } else {
            ago.textContent = "0 Min";
        }
    }, 60000);
}

setInitialValue();
updateAgo();

function dateToBetterDate(date) {
    var day = ("0" + date.getDate()).slice(-2);
    var month = ("0" + (date.getMonth() + 1)).slice(-2);
    var year = date.getFullYear();
    var hours = ("0" + date.getHours()).slice(-2);
    var minutes = ("0" + date.getMinutes()).slice(-2);

    var formattedDate = day + ". " + month + ". " + year;
    var formattedTime = hours + ":" + minutes;

    return formattedDate + " | " + formattedTime;
}

async function fetchCurrentBloodSugar() {
    try {
        const response = await fetch('/api/v1/currentBloodSugar');
        const data = await response.json();

        if (data.currentBloodSugar !== undefined) {
            var newDate = new Date(data.dateString);
            console.log(newDate);

            var currentDate = new Date();
            var lastValue = localStorage.getItem('lastValue');
            var differenceInMinutes = Math.floor((currentDate - newDate) / (1000 * 60));

            ago.textContent = differenceInMinutes + " Min";

            localStorage.setItem("lastValue", currentDate.getTime());
            bs.textContent = data.currentBloodSugar;
            date.textContent = dateToBetterDate(newDate);
            delta.textContent = data.delta.toFixed(1);
            switch (true) {
                case data.currentBloodSugar > 180:
                    alarm.textContent = "High";
                    alarm.style.color = 'rgb(255, 230, 0)';
                    break;

                case data.currentBloodSugar > 230:
                    alarm.textContent = "Very high";
                    alarm.style.color = 'rgb(255, 106, 0)';
                    break;

                case data.currentBloodSugar < 180:
                    alarm.textContent = "None";
                    alarm.style.color = 'rgb(60, 227, 60)';
                    break;

                case data.currentBloodSugar < 80:
                    alarm.textContent = "Low";
                    alarm.style.color = 'rgb(255, 230, 0)';
                    break;

                case data.currentBloodSugar < 60:
                    alarm.textContent = "Very low";
                    alarm.style.color = 'rgb(255, 106, 0)';
                    break;

                default:
                    alarm.textContent = 'None';
                    break;
            }
        } else {
            console.error('Blutzuckerwert nicht verfügbar');
        }
    } catch (error) {
        console.error('Fehler beim Abrufen des Blutzuckerwerts:', error);
    }
}

fetchCurrentBloodSugar();
setInterval(fetchCurrentBloodSugar, 60000);  // Change the interval to 60000 milliseconds (1 minute)