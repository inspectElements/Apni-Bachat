import { useAuth } from "@arcana/auth-react";
import { RouterProvider } from "react-router-dom";
import { routes } from "./routes";
import { CircularProgress } from "@mui/material";

function App() {
  const auth = useAuth();

  if (auth.loading)
    return (
      <div className="center-container">
        <CircularProgress />
      </div>
    );

  return (
    <>
      <RouterProvider router={routes} />
    </>
  );
}

export default App;
