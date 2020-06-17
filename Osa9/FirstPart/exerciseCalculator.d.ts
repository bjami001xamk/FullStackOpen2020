interface resultInterface {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    avarage: number;
}
declare const parseArguments: (args: number[]) => resultInterface;
export default parseArguments;
