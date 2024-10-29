import { useNavigate} from "react-router-dom";


export default function HomePage() {
  const navigate = useNavigate()
  const startSession = () => {
    navigate("/set-up")
  }

  return <>
    <h1>Home</h1>
    <p>A new  interactive way to learn personal finance!</p>
    <button onClick={startSession}>Start Session</button>
    
  </>
}
