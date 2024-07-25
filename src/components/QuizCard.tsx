import { decode } from "html-entities"
import { nanoid } from "nanoid"
import { useId } from "react"
function QuizCard({ question, answers }: { question: string, answers: string[] }) {

    const id = useId()
    const answerList = answers.map(answer =>
        <div key={nanoid()} className="border-1 border-gray-400 text-xs rounded-md px-3 py-1  ">
            <input
                onChange={() => console.log(answer)}
                type='radio'
                id={`${answer}-${id}`}
                key={nanoid()}
                className="border-none hidden"
                value={answer} />
            <label htmlFor={`${answer}-${id}`}>{decode(answer)}</label>
        </div>)
    return (
        <div className="flex p-2 flex-col">
            <h3>{question}</h3>
            <div className="flex py-2 flex-wrap gap-5">
                {answerList}

            </div>
        </div>
    )
}

export default QuizCard