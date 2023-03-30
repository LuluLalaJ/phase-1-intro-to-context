// Your code here

function createEmployeeRecord(array) {
    const employeeRecord = {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents:[],
        timeOutEvents: [], 
    }

    return employeeRecord
}

function createEmployeeRecords(array) {
    return array.map(createEmployeeRecord)
}

function createTimeInEvent(employeeRecord, timeInStamp){
    const newTimeStamp = {
        type: "TimeIn",
        hour: Number(timeInStamp.slice(-4)),
        date: timeInStamp.slice(0, -5)
    }
    employeeRecord.timeInEvents.push(newTimeStamp) 
    return employeeRecord
}

function createTimeOutEvent(employeeRecord, timeOutStamp){
    const newTimeStamp = {
        type: "TimeOut",
        hour: Number(timeOutStamp.slice(-4)),
        date: timeOutStamp.slice(0, -5)
    }
    employeeRecord.timeOutEvents.push(newTimeStamp) 
    return employeeRecord
}

function hoursWorkedOnDate(employeeRecord, date) {
    const timeInObj = employeeRecord.timeInEvents.find(ele => ele.date === date)
    const timeOutObj = employeeRecord.timeOutEvents.find(ele => ele.date === date)
    return Math.floor((timeOutObj.hour - timeInObj.hour)/100)
}

function wagesEarnedOnDate(employeeRecord, date) {
    const hours = hoursWorkedOnDate(employeeRecord, date)
    const rate = employeeRecord.payPerHour
    return hours * rate
}

function allWagesFor(employeeRecord) {
    const allTimeOutObjs = employeeRecord.timeOutEvents
    const allDates = allTimeOutObjs.map(obj => obj.date)
    const allWages = allDates.map(date => wagesEarnedOnDate(employeeRecord, date))
    const totalWage = allWages.reduce((total, currentWage) => total += currentWage, 0)
    return totalWage
}

function calculatePayroll(employeesArray) {
    const wagesArr = employeesArray.map(allWagesFor)
    const payRoll = wagesArr.reduce((total, currentWage) => total += currentWage, 0)
    return payRoll
}

//testing 
// const csvDataEmployees = [
//     ["Thor", "Odinsson", "Electrical Engineer", 45],
//     ["Loki", "Laufeysson-Odinsson", "HR Representative", 35],
//     ["Natalia", "Romanov", "CEO", 150],
//     ["Darcey", "Lewis", "Intern", 15],
//     ["Jarvis", "Stark", "CIO", 125],
//     ["Anthony", "Stark", "Angel Investor", 300]
// ]


// console.log(createEmployeeRecords(csvDataEmployees))
console.log(createTimeInEvent({
    firstName: 'Jarvis',
    familyName: 'Stark',
    title: 'CIO',
    payPerHour: 125,
    timeInEvents: [],
    timeOutEvents: []
}, "YYYY-MM-DD HHMM"))
