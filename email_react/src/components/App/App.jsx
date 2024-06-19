import "./App.css";
// ~~~~~~~~~~ Theme Style, sets for App ~~~~~~~~~ //
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline, GlobalStyles } from '@mui/material';
import theme from "./theme";
// ~~~~~~~~~~~ Components ~~~~~~~~~~~ //
import EmailTemplate from "../Email/EmailTemplate";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline /> {/* Normalize CSS across browsers */}
      <GlobalStyles
        styles={{
          body: { backgroundColor: '#f0f0f0' }, // Custom global styles
        }}
      />
      <div className="App">
        <EmailTemplate />
      </div>
    </ThemeProvider>
  );
}

export default App;
