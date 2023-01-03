const readline = require('readline');

var r = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

console.log('Insert start time...');

let isFirst = true;
const inputVariables = ["HalfTime (Y/N)", "year", "month", "day", "hour", "minute"];
const outputVariables = {
    year: 0,
    month: 0,
    day: 0,
    hour: 0,
    minute: 0,
}
let addHour = 0;
let count = 0;

r.setPrompt(`${inputVariables[count]}? > `);
r.prompt();

r.on('line', function (line) {
    if (isFirst) {
        if (line.toLocaleLowerCase() === 'y') {
            addHour = 4;
        } else {
            addHour = 9;
        }
        isFirst = false;
        count++;
        r.setPrompt(`${inputVariables[count]}? > `);
        r.prompt()
    } else {
        outputVariables[inputVariables[count]] = line;
        if (line == 'exit') {
            r.close();
        }
        if (count > 4) {
            r.close();
            start();
        } else {
            count++;
            r.setPrompt(`${inputVariables[count]}? > `);
            r.prompt()
        }
    }
});
r.on('close', function () {});

const start = () => {
    const year = outputVariables.year;
    const month = outputVariables.month;
    const day = outputVariables.day;
    const hour = Number(outputVariables.hour);
    const minute = outputVariables.minute;
    console.log(`Today's Start Time: ${year}년 ${month}월 ${day}일 ${hour}시 ${minute}분`);

    const xmasTime = new Date(`${year}-${month}-${day} ${hour+addHour}:${minute}`);
    setInterval(() => {
        const curTime = new Date();
        let diff = xmasTime - curTime;
        const diffHours = Math.floor(diff / (1000 * 60 * 60));
        diff -= diffHours * (1000 * 60 * 60);
        const diffMin = Math.floor(diff / (1000 * 60));
        diff -= diffMin * (1000 * 60);
        const diffSec = Math.floor(diff / 1000);
        const string = `${diffHours < 10 ? `0${diffHours}` : diffHours}:${diffMin < 10 ? `0${diffMin}` : diffMin}:${diffSec < 10 ? `0${diffSec}` : diffSec}`
        console.log(string);
    }, 1000);
}