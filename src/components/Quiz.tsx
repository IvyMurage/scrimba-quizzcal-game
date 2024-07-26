import { useEffect, useState } from "react"
import QuizCard from "./QuizCard"
import { NewArrayQuestions, ResponseType } from "../type"
import { nanoid } from "nanoid"
import { decode } from "html-entities"

function Quiz() {

    const [questions, setQuestions] = useState<NewArrayQuestions[]>([])
    const [loading, setLoading] = useState(false)



    useEffect(() => {
        setLoading(true);
        let ignore = false;
        (async () => {
            try {
                const response = await fetch(`https://opentdb.com/api.php?amount=5&category=12`)
                if (!response.ok) {
                    throw new Error('Something went wrong')
                }
                const { results }: ResponseType = await response.json()
                if (!ignore) {
                    setQuestions(results.map(({ incorrect_answers, question, ...rest }) => ({
                        id: nanoid(),
                        question: decode(question),
                        ...rest,
                        answers: [...incorrect_answers, rest.correct_answer],
                        isChecked: false,
                        selectedAnswer: ''
                    })))
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

    function handleChange(
        event: React.ChangeEvent<HTMLInputElement>,
        id: string) {
        const { value } = event.target

        setQuestions(prevQuestions => prevQuestions.map(question => question.id === id ? ({ ...question, selectedAnswer: value }) : question))
    }
    const quizList = questions.map(question => {

        return <QuizCard
            selectedAnswer={question.selectedAnswer}
            id={question.id}
            handleChange={(event) => handleChange(event, question.id)}
            key={question.id}
            // isChecked={question.isChecked}
            question={question.question}
            answers={question.answers}
        />
    })
    return (
        <div className="max-w-lg mt-10 overflow-y-scroll h-[80vh] text-sm  m-auto">
            {loading ? <h1>Loading</h1> :
                <>
                    {quizList}
                    <button className="m-auto mt-2 rounded-lg bg-secondary text-primary px-3 py-2">
                        Check answers
                    </button>
                </>
            }
        </div>
    )
}

export default Quiz