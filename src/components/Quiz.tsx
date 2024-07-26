import { useEffect, useState } from "react"
import QuizCard from "./QuizCard"
import { NewArrayQuestions, ResponseType } from "../type"
import { nanoid } from "nanoid"
import { decode } from "html-entities"
import ReactConfetti from "react-confetti"

function Quiz() {
    const [questions, setQuestions] = useState<NewArrayQuestions[]>([])
    const [loading, setLoading] = useState(false)
    const [score, setScore] = useState(0)
    const [showResult, setResult] = useState(false)
    const [reset, setReset] = useState(0)


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
                    })).sort(() => Math.random() - 0.5))
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
    }, [reset])

    function handleChange(
        event: React.ChangeEvent<HTMLInputElement>,
        id: string) {
        const { value } = event.target

        setQuestions(prevQuestions => prevQuestions.map(question => question.id === id ? ({ ...question, selectedAnswer: value }) : question))
    }

    function handleSubmit() {
        let correct = 0
        questions.forEach(question => {
            if (question.selectedAnswer === question.correct_answer) {
                correct = correct + 1
            }
        })
        setQuestions(prevQuestions => prevQuestions.map(question => ({ ...question, isChecked: true })))
        setScore(correct)
        setResult(true)
    }
    const quizList = questions.map(question => {
        return <QuizCard
            id={question.id}
            key={question.id}
            answers={question.answers}
            question={question.question}
            isChecked={question.isChecked}
            correct_answer={question.correct_answer}
            selectedAnswer={question.selectedAnswer}
            handleChange={(event) => handleChange(event, question.id)}
        />
    })

    function handleReset() {
        setResult(false)
        setScore(0)
        setReset(prev => prev + 1)
    }

    return (<>
        {score === 5 && <ReactConfetti />}
        <div className="max-w-lg  mt-10 overflow-y-scroll h-[80vh] text-sm  m-auto">
            {loading ? <h1>Loading</h1> :
                <>
                    {quizList}
                    <div className="w-full  space-y-2 flex items-center flex-col ">
                        {showResult && <h2 className="text-md text-ce font-bold">Your score is {score}</h2>}
                        {showResult ?
                            <button onClick={handleReset} className="m-auto mt-2 rounded-lg bg-secondary text-primary px-3 py-2">
                                Play Again
                            </button> :
                            <button onClick={handleSubmit} className="m-auto mt-2 rounded-lg bg-secondary text-primary px-3 py-2">
                                Check answers
                            </button>
                        }
                    </div>
                </>
            }
        </div>
    </>
    )
}

export default Quiz