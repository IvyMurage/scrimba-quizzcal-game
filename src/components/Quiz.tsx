import { useEffect, useState } from "react"
import QuizCard from "./QuizCard"
import { QuestionProps, ResponseType } from "../type"
import { nanoid } from "nanoid"
import { decode } from "html-entities"

function Quiz() {

    const [questions, setQuestions] = useState<QuestionProps[]>([])
    const [loading, setLoading] = useState(false)
    const newQuestions = questions.map(({ incorrect_answers, question, ...rest }) => ({
        id: nanoid(),
        question: decode(question),
        ...rest,
        answers: [...incorrect_answers, rest.correct_answer]
    }))


    useEffect(() => {
        setLoading(true);
        let ignore = false;
        (async () => {
            try {
                const response = await fetch(`https://opentdb.com/api.php?amount=20&category=12`)
                if (!response.ok) {
                    throw new Error('Something went wrong')
                }
                const { results }: ResponseType = await response.json()
                if (!ignore) {
                    setQuestions(results)
                }
            }
            catch (error) {
                console.log(error)
            }
            finally {
                setLoading(false)
            }
        })()
        return () => {
            ignore = true
        }
    }, [])

    const quizList = newQuestions.map(question => <QuizCard
        key={question.id}
        question={question.question}
        answers={question.answers}
    />)
    return (
        <div>
            {loading && <h1>Loading</h1>}
            {quizList}
        </div>
    )
}

export default Quiz