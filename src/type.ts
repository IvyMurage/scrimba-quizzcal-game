export interface ResponseType {
    response_code: number,
    results: QuestionProps[]
}
export interface QuestionProps {
    type: string
    difficulty: string
    category: string
    question: string
    correct_answer: string[]
}