export interface ResponseType {
    response_code: number,
    results: QuestionProps[]
}
export interface QuestionProps {
    type: string
    difficulty: string
    category: string
    question: string
    correct_answer: string
    incorrect_answers:string[]
}

export type NewArrayQuestions = Omit<QuestionProps, 'incorrect_answers'> & {id :string}

export type QuizProp = {
    question: string,
    answers: string[]
}