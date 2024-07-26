import { decode } from "html-entities"
import { useId } from "react"
import { QuizProp } from "../type"
import { nanoid } from "nanoid"

function QuizCard(
    { question, answers, handleChange, selectedAnswer, correct_answer, isChecked }: QuizProp) {
    const id = useId()


    function getColors(answer: string) {
        if (correct_answer === answer) {
            return { backgroundColor: '#94D7A2' }
        } else if (answer === selectedAnswer) {
            return { backgroundColor: '#F8BCBC' }
        }
    }


    const answerList = answers.map(answer => {

        return <div
            style={isChecked ? getColors(answer) : answer === selectedAnswer ?
                { backgroundColor: '#D6DBF5' } :
                { backgroundColor: 'transparent' }
            }
            key={nanoid()}
            className="border-1  border-gray-400 text-xs rounded-md px-3 py-1">
            <input
                id={`${answer}-${id}`}
                type='radio'
                onChange={(event) => handleChange(event, id)}
                className="border-none hidden"
                value={answer}
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