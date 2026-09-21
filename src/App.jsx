import { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import ScrollToTop from "./components/layout/ScrollToTop";

const Home = lazy(() => import("./pages/Home"));
const Destination = lazy(() => import("./pages/Destination"));
const Explore = lazy(() => import("./pages/Explore"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Place = lazy(() => import("./pages/Place"));
const Planner = lazy(() => import("./pages/Planner"));
const Journal = lazy(() => import("./pages/Journal"));

function RouteFallback() {
  return <div className="min-h-screen bg-[#080808]" aria-hidden="true" />;
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <Suspense fallback={<RouteFallback />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/destinations/:slug" element={<Destination />} />
          <Route path="/place" element={<Place />} />
          <Route path="/planner" element={<Planner />} />
          <Route path="/journal" element={<Journal />} />
          <Route path="/home" element={<Navigate to="/" replace />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </>
  );
}
