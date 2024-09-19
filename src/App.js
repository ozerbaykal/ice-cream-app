import Form from "./coponents/Form"
import Scoops from "./coponents/Scoops"
import Toppings from "./coponents/Toppings"


const App = () => {
  return (
    <div className="d-flex flex-column gap-5 px-3 py-5 
    min-vh-100 bg-dark text-light">
      <Scoops/>
      <Toppings/>
      <Form/>
    </div>
  )
}

export default App