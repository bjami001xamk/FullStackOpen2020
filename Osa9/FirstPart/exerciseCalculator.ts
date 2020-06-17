
interface resultInterface{
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    avarage: number
}


const parseArguments = (args : number[]) : resultInterface => {
    const arrayWithHours: number[] = [];
    let targetHours = 0;
    
    if(args.length < 2) {
        throw new Error('parameters missing');
    }

    for(let i=0; i<args.length; i++) {
        if(isNaN(Number(args[i]))){
            throw new Error('malformatted parameters'); 
        }
        
        if( i === 0 ) {
            targetHours = Number(args[i]);
        } else{
            arrayWithHours.push(Number(args[i]));
        }
    }
    console.log(targetHours);
    console.log(arrayWithHours);
    return(calculateExercises(targetHours, arrayWithHours));

};

const calculateExercises = (targethours: number, array : number[] ) => {
    const numberOfDays : number = array.length;
    const avarageHours : number = array.reduce((total: number, num: number) => {
        return total + num;
    }, 0) / numberOfDays;
    const success : boolean = targethours < avarageHours;
    const trainingDays = array.filter(hours => hours > 0).length;
    let rating = 0;
    let ratingString = '';

    if(avarageHours > 4) {
        rating = 3;
        ratingString = 'Excelent Job';
    } else if(avarageHours < 1 ) {
        rating = 1;
        ratingString = 'Step up';
    } else  {
        rating = 2;
        ratingString = 'Good job, but theres always room for improvement';
    }
    const result : resultInterface = {
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

export default parseArguments;

//const {targetHours, arrayWithHours} = parseArguments(process.argv);

