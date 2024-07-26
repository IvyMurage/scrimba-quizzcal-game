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

export type NewArrayQuestions = Omit<QuestionProps, 'incorrect_answers'> & {id :string, isChecked: boolean, answers: string[], selectedAnswer: string}

export type QuizProp = {
    id:string,
    handleChange: (event: React.ChangeEvent<HTMLInputElement>, id: string) => void
    question: string,
    answers: string[],
    selectedAnswer: string,
    correct_answer: string
    isChecked: boolean
}