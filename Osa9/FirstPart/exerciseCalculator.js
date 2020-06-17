"use strict";
exports.__esModule = true;
var parseArguments = function (args) {
    var arrayWithHours = [];
    var targetHours = 0;
    if (args.length < 2) {
        throw new Error('parameters missing');
    }
    for (var i = 0; i < args.length; i++) {
        if (isNaN(Number(args[i]))) {
            throw new Error('malformatted parameters');
        }
        if (i === 0) {
            targetHours = Number(args[i]);
        }
        else {
            arrayWithHours.push(Number(args[i]));
        }
    }
    console.log(targetHours);
    console.log(arrayWithHours);
    return (calculateExercises(targetHours, arrayWithHours));
};
var calculateExercises = function (targethours, array) {
    var numberOfDays = array.length;
    var avarageHours = array.reduce(function (total, num) {
        return total + num;
    }, 0) / numberOfDays;
    var success = targethours < avarageHours;
    var trainingDays = array.filter(function (hours) { return hours > 0; }).length;
    var rating = 0;
    var ratingString = '';
    if (avarageHours > 4) {
        rating = 3;
        ratingString = 'Excelent Job';
    }
    else if (avarageHours < 1) {
        rating = 1;
        ratingString = 'Step up';
    }
    else {
        rating = 2;
        ratingString = 'Good job, but theres always room for improvement';
    }
    var result = {
        periodLength: numberOfDays,
        trainingDays: trainingDays,
        success: success,
        rating: rating,
        ratingDescription: ratingString,
        target: targethours,
        avarage: avarageHours
    };
    return result;
};
exports["default"] = parseArguments;
//const {targetHours, arrayWithHours} = parseArguments(process.argv);
