import React, { useState } from "react";

const EmailForm = ({ email, onSave, onCancel }) => {
  const [formData, setFormData] = useState(email || {});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div style={{ display: "flex", flexDirection: "column" }}>
      <label>
        Subject:
        <input
          type="text"
          name="subject"
          value={formData.subject || ""}
          onChange={handleChange}
        />
      </label>
      <label>
        Type:
        <input
          type="text"
          name="email_type"
          value={formData.email_type || ""}
          onChange={handleChange}
        />
      </label>
      <label>
        Template:
        <input
          type="text"
          name="template"
          value={formData.template || ""}
          onChange={handleChange}
        />
      </label>
      <label>
        Recipients:
        <input
          type="text"
          name="recipients"
          value={formData.recipients || ""}
          onChange={handleChange}
        />
      </label>
      <label>
        Sender:
        <input
          type="text"
          name="sender"
          value={formData.sender || ""}
          onChange={handleChange}
        />
      </label>
      <label>
        Output Values:
        <textarea
          name="output_values"
          value={formData.output_values || ""}
          onChange={handleChange}
        />
      </label>
      <label>
        Queries:
        <textarea
          name="queries"
          value={formData.queries || ""}
          onChange={handleChange}
        />
      </label>
      <label>
        Options:
        <textarea
          name="options"
          value={formData.options || ""}
          onChange={handleChange}
        />
      </label>
      <button type="submit">Save</button>
      <button type="button" onClick={onCancel}>
        Cancel
      </button>
      </div>
    </form>
  );
};

export default EmailForm;
