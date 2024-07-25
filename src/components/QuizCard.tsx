import { nanoid } from "nanoid"
import { useId } from "react"
function QuizCard({ question, answers }: { question: string, answers: string[] }) {
    const id = useId()
    const answerList = answers.map(answer =>
        <div className="border-1 border-gray-400 rounded-md px-3  ">
            <input
                onChange={() => console.log(answer)}
                type='radio'
                id={`${answer}-${id}`}
                key={nanoid()}
                className="border-none hidden"
                value={answer} />
            <label htmlFor={`${answer}-${id}`}>{answer}</label>
        </div>)
    return (
        <div className="flex flex-col">
            <h3>{question}</h3>
            <div className="flex flex-wrap gap-5">
                {answerList}

            </div>
        </div>
    )
}

export default QuizCard