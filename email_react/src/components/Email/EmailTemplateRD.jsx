import React, { useState } from 'react';

// Sample data that you will replace in the template
const data = {
  records: {
    new: {
      email: "user@example.com",
      roleid: 1234
    }
  },
  emailconf: {
    email_type: "reset password"
  },
  outvals: {
    DATA: {
      roleid: 1234
    }
  },
  pxdb: {
    pr_utils: {
      tokens: {
        encode_jwt_for_roleid: (roleid, duration) => `${roleid}-${duration}`
      }
    }
  }
};

// Placeholder template
const outputValuesTemplate = `email_type: {emailconf.email_type}, email: {records.new.email}, link: https://ndwbcdev.z19.web.core.windows.net?rst={pxdb.pr_utils.tokens.encode_jwt_for_roleid(records.new.roleid, 86400)}`;

// // Function to replace placeholders
// const replacePlaceholders = (template, data) => {
//   return template.replace(/\{([^\}]+)\}/g, (_, key) => {
//     try {
//       const func = new Function("data", `with(data) { return ${key}; }`);
//       const value = func(data);
//       return value !== undefined ? value : `{${key}}`;
//     } catch (e) {
//       console.error(`Error evaluating expression: ${key}`, e);
//       return `{${key}}`;
//     }
//   });
// };

// Function to replace placeholders
const replacePlaceholders = (template, data) => {
  return template.replace(/\{([^\}]+)\}/g, (_, key) => {
    const keys = key.split('.');
    let value = data;
    for (const k of keys) {
      if (value[k] === undefined) {
        return `{${key}}`; // Placeholder not found in data, return as is
      }
      value = value[k];
    }
    return value;
  });
};


// React component
const EmailTemplateRD = () => {
  const [outputValues, setOutputValues] = useState('');

  const handleReplacePlaceholders = () => {
    const processedOutputValues = replacePlaceholders(outputValuesTemplate, data);
    setOutputValues(processedOutputValues);
  };

  return (
    <div>
      <button onClick={handleReplacePlaceholders}>Generate Email Content</button>
      <pre><strong>Output Values: </strong>{outputValues}</pre>
    </div>
  );
};

export default EmailTemplateRD;
