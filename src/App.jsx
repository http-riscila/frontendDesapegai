import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Register from "./pages/Register";
import Login from "./pages/Login";
import UserProfile from "./pages/UserProfile";
import "./styles/App.css";
import "./styles/toastStyles.css";
import { UserProvider } from "./contexts/UserContext";
import PrivateRoutes from "./components/PrivateRoutes";
import Home from "./pages/Home";
import Community from "./pages/Community";
import Communities from "./pages/Communities";
import HowItWorks from "./pages/HowItWorks";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient()

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          pauseOnHover
          theme={undefined}
        />
        <Routes>
          {/* Rotas públicas */}
          <Route path="/" element={<Login />} />
          <Route path="/cadastro" element={<Register />} />
        </Routes>

        <UserProvider>
          <Routes>
            {/* Rotas privadas */}
            <Route
              path="/home"
              element={
                <PrivateRoutes>
                  <Home />
                </PrivateRoutes>
              }
            />
            <Route
              path="/comunidades/:communityId"
              element={
                <PrivateRoutes>
                  <Community />
                </PrivateRoutes>
              }
            />
            <Route
              path="/comunidades"
              element={
                <PrivateRoutes>
                  <Communities />
                </PrivateRoutes>
              }
            />
            <Route
              path="/como-funciona"
              element={
                <PrivateRoutes>
                  <HowItWorks />
                </PrivateRoutes>
              }
            />
            <Route
              path="/perfil"
              element={
                <PrivateRoutes>
                  <UserProfile />
                </PrivateRoutes>
              }
            />
          </Routes>
        </UserProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  );
}

export default App;
