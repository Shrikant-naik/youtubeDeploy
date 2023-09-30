import React from "react";
import { Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage/Homepage";
import VideoStreamingPage from "./pages/VideoStremingPage/VideoStreamingPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import { useSelector } from "react-redux";
import SearchPage from "./pages/SearchPage/SearchPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function App() {
  const { currentUser } = useSelector((state) => state.user);

  const queryClient = new QueryClient();
  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route path="/">
            <Route index element={<Homepage type="random" />} />
            <Route path="trends" element={<Homepage type="trend" />} />
            <Route path="subscription" element={<Homepage type="sub" />} />
            <Route path="search" element={<SearchPage />} />

            <Route
              path="videostreamingpage/:id"
              element={<VideoStreamingPage />}
            />
            <Route
              path="login"
              element={currentUser ? <Homepage /> : <LoginPage />}
            />
          </Route>
        </Routes>
      </QueryClientProvider>
    </div>
  );
}

export default App;
