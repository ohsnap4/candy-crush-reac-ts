interface ScoreType {
    score: number
}
const ScoreBoard = ({ score }: ScoreType) => {
    return (
        <div>ScoreBoard: {score}</div>
    )
}

export default ScoreBoard