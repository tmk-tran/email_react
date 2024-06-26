import "./App.css";
// ~~~~~~~~~~ Theme Style, sets for App ~~~~~~~~~ //
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline, GlobalStyles } from "@mui/material";
import theme from "./theme";
// ~~~~~~~~~~~ Components ~~~~~~~~~~~ //
import EmailTemplate from "../Email/EmailTemplate";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline /> {/* Normalize CSS across browsers */}
      <GlobalStyles
        styles={{
          body: { backgroundColor: "#060A2D", color: "#F4F5FD" }, // Custom global styles
        }}
      />
      <div className="App">
        <EmailTemplate />
      </div>
    </ThemeProvider>
  );
}

export default App;
