import React, { useState } from "react";
import {
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
} from "@mui/material";

const EmailForm = () => {
  const [emailType, setEmailType] = useState("");
  const [recipients, setRecipients] = useState("");
  const [sender, setSender] = useState("");
  const [firstName, setFirstName] = useState("");
  const [subject, setSubject] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic here
    console.log({
      emailType,
      recipients,
      sender,
      firstName,
      subject,
    });
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ display: "flex", flexDirection: "column", gap: 2, width: 400 }}
    >
      <FormControl fullWidth>
        <InputLabel id="email-type-label">Email Type</InputLabel>
        <Select
          labelId="email-type-label"
          value={emailType}
          onChange={(e) => setEmailType(e.target.value)}
          label="Email Type"
        >
          <MenuItem value="email1">Email 1</MenuItem>
          <MenuItem value="email2">Email 2</MenuItem>
          <MenuItem value="email3">Email 3</MenuItem>
        </Select>
      </FormControl>

      <TextField
        label="Recipients"
        variant="outlined"
        fullWidth
        value={recipients}
        onChange={(e) => setRecipients(e.target.value)}
        placeholder="Enter email addresses separated by commas"
      />

      <TextField
        label="Sender"
        variant="outlined"
        fullWidth
        value={sender}
        onChange={(e) => setSender(e.target.value)}
      />

      <TextField
        label="First Name"
        variant="outlined"
        fullWidth
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
      />

      <TextField
        label="Subject"
        variant="outlined"
        fullWidth
        multiline
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
      />

      <Button type="submit" variant="contained" color="primary">
        Send Email
      </Button>
    </Box>
  );
};

export default EmailForm;
