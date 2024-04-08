import AddToDo from "./components/AddToDo"
import Navbar from "./components/Navbar"
import Todos from "./components/Todos"
import "./App.css"

const App = () => {
  return (
    <main>
      <h1>TODO REACT + TYPESCRIPT</h1>
      <Navbar/>
      <AddToDo/>
      <Todos/>
      <h4>Yash ahlawat project stack</h4>
    </main>
  )
}

export default App
