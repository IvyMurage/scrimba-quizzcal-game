import { Link } from "react-router-dom"

function Home() {
    return (
        <div className="space-y-3 overflow-hidden flex flex-col items-center justify-center h-screen bg-primary">
            <h1 className="font-bold text-xl">Quizzcal</h1>
            <p className="text-sm">Some description if needed</p>
            <Link to='/quiz'><button className=" text-sm font-semibold rounded-lg px-5 py-2 text-primary bg-secondary">
                Start Quiz
            </button>
            </Link>
        </div>
    )
}

export default Home