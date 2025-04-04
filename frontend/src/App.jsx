import { Route, Router, Routes } from "react-router-dom"
import Register from "./components/Auth/Register"

function App() {
  
 return (
      <Routes>
        <Route path="/register" element={<Register />}/>
      </Routes>
  )
}

export default App
