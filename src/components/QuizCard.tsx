import { decode } from "html-entities"
import { useId } from "react"
import { QuizProp } from "../type"
import { nanoid } from "nanoid"

function QuizCard({ question, answers, handleChange, selectedAnswer }: QuizProp) {
    const id = useId()

    const answerList = answers.map(answer => {
        const styles = {
            backgroundColor: answer === selectedAnswer ? '#D6DBF5' : 'transparent'
        }
        return <div
            style={styles}
            key={nanoid()}
            className="border-1  border-gray-400 text-xs rounded-md px-3 py-1">
            <input
                id={`${answer}-${id}`}
                type='radio'
                onChange={(event) => handleChange(event, id)}
                className="border-none hidden"
                value={answer}
                checked={selectedAnswer === answer}
            />
            <label htmlFor={`${answer}-${id}`}>{decode(answer)}</label>
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