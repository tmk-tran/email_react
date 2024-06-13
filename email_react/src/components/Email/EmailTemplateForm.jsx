import React from "react";

const EmailTemplateForm = ({ email, formValues, onChange }) => {
  const handleInputChange = (fieldName, event) => {
    const value = event.target.value;
    onChange(email.id, fieldName, value);
  };

  return (
    <div>
      <h2>{email.subject}</h2>
      <div>
        <label>
          <strong>Type:</strong>
          <input
            type="text"
            value={formValues?.email_type || email.email_type}
            onChange={(e) => handleInputChange("email_type", e)}
          />
        </label>
      </div>
      <div>
        <label>
          <strong>Template:</strong>
          <input
            type="text"
            value={formValues?.template || email.template}
            onChange={(e) => handleInputChange("template", e)}
          />
        </label>
      </div>
      <div>
        <label>
          <strong>Recipients:</strong>
          <input
            type="text"
            value={formValues?.recipients || email.recipients}
            onChange={(e) => handleInputChange("template", e)}
          />
        </label>
      </div>
    </div>
  );
};

export default EmailTemplateForm;
