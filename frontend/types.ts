export interface quizprops  {
    quizid : number,
    quizname : string,
    quiztopic:string,
    buttontext : string
}
export interface quiztakingprops {
    quizid : number,
    questionid : number,
    questiontext : string,
    option1 : string,
    option2 : string,
    option3 : string,
    option1id: number,
    option2id : number,
    option3id : number,
    qtype:string
}
export interface userid{
    userid : number
}
export interface quiz_id {
    quizid : number,
}