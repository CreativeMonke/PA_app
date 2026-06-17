import { useEffect } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import TopBar from "@/components/layout/TopBar";
import LandingPage from "@/pages/LandingPage";
import LearnPage from "@/pages/LearnPage";
import PracticePage from "@/pages/PracticePage";
import OverviewPage from "@/pages/OverviewPage";
import { useProgressStore } from "@/store/useProgressStore";
import { useAppStore } from "@/store/useAppStore";

export default function App() {
  const location = useLocation();
  const { init } = useProgressStore();
  const { setMode } = useAppStore();

  useEffect(() => {
    init();
  }, [init]);

  useEffect(() => {
    if (location.pathname.startsWith("/learn")) setMode("learn");
    else if (location.pathname.startsWith("/practice")) setMode("practice");
    else if (location.pathname.startsWith("/overview")) setMode("overview");
  }, [location.pathname, setMode]);

  const showTopBar = location.pathname !== "/";

  return (
    <div className="main-shell">
      {/* Ambient background */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="bg-orb bg-orb--a" />
        <div className="bg-orb bg-orb--b" />
        <div className="bg-orb bg-orb--c" />
        <div className="animated-grid" />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 60% 45% at 0% 0%, rgba(251,191,36,0.04) 0%, transparent 60%)," +
              "radial-gradient(ellipse 55% 40% at 100% 100%, rgba(251,146,36,0.03) 0%, transparent 60%)",
          }}
        />
      </div>

      <div className="relative z-10 flex flex-col h-full">
        {showTopBar && <TopBar />}

        <div className="flex-1 overflow-hidden">
          <AnimatePresence mode="wait" initial={false}>
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<LandingPage />} />
              <Route path="/learn" element={<LearnPage />} />
              <Route path="/practice" element={<PracticePage />} />
              <Route path="/overview" element={<OverviewPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
