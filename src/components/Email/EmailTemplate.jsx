import { Typography } from "@mui/material";
import { csvData } from "./csvData";
import EmailScreen from "./EmailScreen";

export default function EmailTemplate() {

  return (
    <div>
      <Typography variant="h4" sx={{ fontWeight: "bold" }}>Email Templates</Typography>
      <EmailScreen csvData={csvData} />
    </div>
  );
}
