import React, { useState, useEffect } from "react";
import { parseCsv } from "./parseCsv"; // Import the parseCsv function
import { v4 as uuidv4 } from "uuid"; // Import uuidv4 from uuid
// ~~~~~~~~~~~ Components ~~~~~~~~~~~ //
import EmailForm from "./AddEditTemplate";
import "./EmailScreen.css";
import EmailTemplateEditor from "./EmailEditor/EmailTemplateEditor";

const EmailScreen = ({ csvData }) => {
  const [emails, setEmails] = useState([]);
  console.log(emails);
  const [editingEmailIndex, setEditingEmailIndex] = useState(null);
  const [isAdding, setIsAdding] = useState(false); // New state variable
  const [emailTemplates, setEmailTemplates] = useState([]);

    // useEffect(() => {
    //   const parsedData = parseCsv(csvData); // Your function to parse CSV data
    //   const emailData = parsedData.slice(1).map((row, index) => ({
    //     id: uuidv4(), // Generate a unique identifier for each email
    //     email_type: row["email_type_fields_NDWBC_example.csv"],
    //     template: row.__parsed_extra[0],
    //     subject: row.__parsed_extra[1],
    //     recipients: row.__parsed_extra[2],
    //     sender: row.__parsed_extra[3],
    //     output_values: row.__parsed_extra[4],
    //     queries: row.__parsed_extra[5],
    //     options: row.__parsed_extra[6],
    //   }));
    //   setEmails(emailData);
    // }, []);

  useEffect(() => {
    const parsedData = parseCsv(csvData); // Parse the CSV data
    console.log(parsedData); // Debugging line to inspect the parsed data structure

    const emailData = parsedData.map((row, index) => {
    //   // Parse the recipients string into an array
    //   const recipients = JSON.parse(row["recipients"]);
    //   console.log(recipients);

    //   // Replace placeholders for recipients
    //   const processedRecipients = recipients.map((recipient) => {
    //     return recipient.replace(
    //       "{records['new']['email']}",
    //       "testuser@example.com"
    //     );
    //   });

    //   console.log(processedRecipients);

      return {
        id: uuidv4(),
        email_type: row["email_type"],
        template: row["template"],
        subject: row["subject"],
        recipients: row["recipients"],
        sender: row["sender"],
        output_values: row["output_values"],
        queries: row["queries"],
        options: row["options"],
      };
    });

    setEmails(emailData);
  }, []);

  const handleSave = (email) => {
    if (isAdding) {
      setEmails((prevEmails) => [...prevEmails, email]);
    } else if (editingEmailIndex !== null) {
      setEmails((prevEmails) =>
        prevEmails.map((e, i) => (i === editingEmailIndex ? email : e))
      );
    }
    setEditingEmailIndex(null);
    setIsAdding(false); // Reset the isAdding state
  };

  const handleEdit = (index) => {
    setEditingEmailIndex(index);
    setIsAdding(false); // Ensure isAdding is false
  };

  const handleDelete = (index) => {
    setEmails((prevEmails) => prevEmails.filter((_, i) => i !== index));
  };

  const handleAdd = () => {
    setEditingEmailIndex(null);
    setIsAdding(true); // Set the isAdding state to true
  };

  return (
    <div>
      <button onClick={handleAdd}>Add New Template</button>
      {isAdding && (
        <EmailForm
          email={null}
          onSave={handleSave}
          onCancel={() => setIsAdding(false)}
        />
      )}
      {emails.map((email, index) => (
        <div key={email.id} className="email-card">
          <h2>{email.subject}</h2>
          <p>
            <strong>Type:</strong> {email.email_type}
          </p>
          <p>
            <strong>Template:</strong>{" "}
            <a href={email.template} target="_blank" rel="noopener noreferrer">
              View Template
            </a>
          </p>
          <p>
            <strong>Recipients:</strong> {email.recipients}
          </p>
          <p>
            <strong>Sender:</strong> {email.sender}
          </p>
          <p>
            <strong>Output Values:</strong> {email.output_values}
          </p>
          <p>
            <strong>Queries:</strong> {email.queries}
          </p>
          <p>
            <strong>Options:</strong> {email.options}
          </p>
          <button onClick={() => handleEdit(index)}>Edit</button>
          <button onClick={() => handleDelete(index)}>Delete</button>
          {editingEmailIndex === index && !isAdding && (
            <EmailForm
              email={emails[editingEmailIndex]}
              onSave={handleSave}
              onCancel={() => setEditingEmailIndex(null)}
            />
          )}
        </div>
      ))}
      <EmailTemplateEditor />
    </div>
  );
};

export default EmailScreen;
