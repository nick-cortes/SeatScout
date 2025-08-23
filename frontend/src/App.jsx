import { Route, Routes } from "react-router";

import HomePage from "./pages/HomePage";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />}/>
      </Routes>
    </div>
  );
};

export default App;