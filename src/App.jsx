import { Route, BrowserRouter  as Router, Routes} from "react-router-dom"
import "./App.css"
import { Home } from "./Components/Home"
import { Meetup } from "./Components/Meetup"



function App() {
  
  return (
    <>
      <h1>Meet Up</h1>
      <Router>
        <Routes>
          <Route path="/"  element={<Home/>}/>
          <Route path="/meetup/:meetID" element={<Meetup/>} />
        </Routes>
      </Router>
    </>
  )
}

export default App
