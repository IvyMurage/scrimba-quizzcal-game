import { useEffect, useState } from "react"
import QuizCard from "./QuizCard"
import { QuestionProps, ResponseType } from "../type"

function Quiz() {

    const [questions, setQuestions] = useState<QuestionProps[]>([])
    const [loading, setLoading] = useState(false)

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
    console.log(questions)
    console.log('loading:', loading)
    return (
        <div>
            <QuizCard
                question={'How many teeth does a person have?'}
                answers={['1', '2', '3', '4', '5', '6']}
            />
            <QuizCard
                question={'How many teeth does a person have?'}
                answers={['1', '2', '3', '4', '5', '6']}
            />
            <QuizCard
                question={'How many teeth does a person have?'}
                answers={['1', '2', '3', '4', '5', '6']}
            />
            <QuizCard
                question={'How many teeth does a person have?'}
                answers={['1', '2', '3', '4', '5', '6']}
            />
        </div>
    )
}

export default Quiz