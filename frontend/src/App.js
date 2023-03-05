import { useAuth } from "@arcana/auth-react";
import { RouterProvider } from "react-router-dom";
import { routes } from "./routes";
import { CircularProgress, CssBaseline } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const darkTheme = createTheme({
  palette: {
    primary: { main: "#4b0086" },
  },
  typography: {
    fontFamily: ["Poppins", "Nunito", "Roboto", "Arial", "sans-serif"].join(
      ","
    ),
  },
});

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
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <RouterProvider router={routes} />
      </ThemeProvider>
    </>
  );
}

export default App;
