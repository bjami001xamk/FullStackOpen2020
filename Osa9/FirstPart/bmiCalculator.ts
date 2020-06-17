

//if(process.argv.length !== 4) {
//   throw new Error('give two numbers')//}




//const height: number = Number(process.argv[2])
//const weight: number = Number(process.argv[3])

const calculateBmi = (height:number, weight:number): string => {
    if(isNaN(height) || isNaN(weight)) {
        return('malformatted parameters');
    }

    height = height / 100;

    const bmi:number = weight / height / height;
    if(bmi < 18.5) {
        return 'Underweight';
    } else if (bmi > 25) {
        return 'Overweight';
    } else {
        return 'Normal (healthy weight)';
    }
};

export default calculateBmi;
//console.log(calculateBmi(Number(process.argv[2]), Number(process.argv[3])))




//console.log(calculateBmi(180,74))