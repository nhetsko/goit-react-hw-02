export default function Feedback({value, children}) {
    return (
        <div>
        <p>{children}: {value} </p>
        </div>
    )
}