import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/Main";
import DashboardPage from "./pages/DashboardPage";
import MapPage from "./pages/MapPage";
import MapLayout from "./layouts/MapLayout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<DashboardPage />} />
          <Route element={<MapLayout />}>
            <Route path="/map" element={<MapPage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
