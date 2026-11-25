import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Shell } from "./components/Shell";
import { MoviesList } from "./pages/MoviesList";
import { MovieDetail } from "./pages/MovieDetail";

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Shell />}>
          <Route index element={<MoviesList />} />
          <Route path="movies/:id" element={<MovieDetail />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
