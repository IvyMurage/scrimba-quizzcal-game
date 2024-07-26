import { decode } from "html-entities"
import { useId } from "react"
import { QuizProp } from "../type"
import { nanoid } from "nanoid"

function QuizCard(
    { question, answers, handleChange, selectedAnswer, correct_answer, isChecked }: QuizProp) {
    const id = useId()
    const decodedCorrectAnswer = decode(correct_answer)
    const decodedSelectedAnswer = decode(selectedAnswer)

    function getColors(answer: string) {
        if (isChecked) {
            if (decodedCorrectAnswer === answer) {
                return { backgroundColor: '#94D7A2' }
            } else if (answer === decodedSelectedAnswer) {
                return { backgroundColor: '#F8BCBC' }
            }
        } else if (answer === decodedSelectedAnswer) {
            return { backgroundColor: '#D6DBF5' }
        } else {
            return { backgroundColor: 'transparent' }
        }
    }

    const answerList = answers.map(answer => {
        const decodedAnswer = decode(answer)
        return <div
            style={getColors(decodedAnswer)}
            key={nanoid()}
            className="border-1  border-gray-400 text-xs rounded-md px-3 py-1">
            <input
                id={`${answer}-${id}`}
                type='radio'
                onChange={(event) => handleChange(event, id)}
                className="border-none hidden"
                value={decodedAnswer}
                checked={decodedSelectedAnswer === decodedAnswer}
            />
            <label htmlFor={`${answer}-${id}`}>{decodedAnswer}</label>
        </div>
    })

    return (
        <div className="flex p-2 flex-col">
            <h3>{decode(question)}</h3>
            <div className="flex py-2 flex-wrap gap-5">
                {answerList}
            </div>
        </div>
    )
}

export default QuizCard