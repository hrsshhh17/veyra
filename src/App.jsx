import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Destination from "./pages/Destination";
import Explore from "./pages/Explore";
import NotFound from "./pages/NotFound";
import Place from "./pages/Place";
import Planner from "./pages/Planner";
import Journal from "./pages/Journal";
import Navbar from "./components/layout/Navbar";
import ScrollToTop from "./components/layout/ScrollToTop";

export default function App() {
  return <><ScrollToTop/><Navbar/><Routes><Route path="/" element={<Home/>}/><Route path="/explore" element={<Explore/>}/><Route path="/destinations/:slug" element={<Destination/>}/><Route path="/place" element={<Place/>}/><Route path="/planner" element={<Planner/>}/><Route path="/journal" element={<Journal/>}/><Route path="/home" element={<Navigate to="/" replace/>}/><Route path="*" element={<NotFound/>}/></Routes></>;
}
