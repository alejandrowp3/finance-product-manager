import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductList from "./components/ProductList";
import AddProductForm from "./components/AddProductForm";

const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<ProductList />} />
          <Route exact path="/add" element={<AddProductForm />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
