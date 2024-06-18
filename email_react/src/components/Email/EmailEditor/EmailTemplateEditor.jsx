import React, { useRef, useState, useEffect } from "react";
import EmailEditor from "react-email-editor";
import Papa from "papaparse";

const EmailTemplateEditor = () => {
  let emailEditorRef = useRef(null);
  console.log(emailEditorRef);
  const [parsedEmailData, setParsedEmailData] = useState(null);
  console.log(parsedEmailData);
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
  };

  useEffect(() => {
    console.log(emailEditorRef);
    if (parsedEmailData && emailEditorRef.current) {
      emailEditorRef.current.editor.loadDesign({
        counters: {
          u_row: 1,
          u_column: 1,
          u_content_text: 1,
        },
        body: {
          rows: [
            {
              cells: [1],
              columns: [
                {
                  contents: [
                    {
                      type: "text",
                      values: {
                        containerPadding: "10px",
                        fontFamily: "Arial, Helvetica, sans-serif",
                        fontSize: "16px",
                        html: parsedEmailData.templateHtml,
                      },
                    },
                  ],
                },
              ],
            },
          ],
        },
      });
    }
  }, [parsedEmailData]);

  const exportHtml = () => {
    emailEditorRef.exportHtml((data) => {
      const { design, html } = data;
      console.log("Exported HTML", html);
      // Send the HTML to your email sending service
    });
  };

  // For loading a saved email design when the editor loads
  const loadDesign = () => {
    const design = {
      body: {
        rows: [
          // ... design JSON
        ],
      },
    };
    emailEditorRef.loadDesign(design);
  };

  // Save the currrent design as JSON
  const saveDesign = () => {
    console.log(emailEditorRef);
    if (emailEditorRef.current.editor) {
      emailEditorRef.current.editor.saveDesign((design) => {
        console.log("Saved Design", design);
        // Save the design to your server or database
      });
    }
  };

  // Add custom tools and blocks to the editor
  const customTools = {
    tools: {
      custom_tool: {
        title: "Custom Tool",
        icon: "<svg>...</svg>",
        data: {
          text: "Hello, world!",
        },
      },
    },
  };
  // Add this to EmailEditor props:
  // tools={customTools}

  const onLoad = () => {
    console.log("Editor Loaded");
    // Perform additional actions when the editor is loaded, if necessary.
  };

  const onDesignLoad = (data) => {
    console.log("Design Loaded", data);
    // Handle the design loaded event here.
  };

  const onExport = (data) => {
    const { design, html } = data;
    console.log("Exported HTML", html);
    // Handle the export event here.
  };

  const onError = (error) => {
    console.error("Editor Error", error);
  };

  const handleCSVUpload = (event) => {
    const file = event.target.files[0];
    console.log(file);
    Papa.parse(file, {
      header: true,
      complete: async (results) => {
        const data = results.data;
        console.log(data);
        try {
          const templates = [];
          for (const row of data) {
            const response = await fetch(row.template);
            const html = await response.text();
            // Replace with actual values, placeholders ATM
            const templateHtml = html
              .replace(/{first_name}/g, "Mark")
              .replace(/{reset_link}/g, "www.google.com")
              .replace(/{email}/g, "mark@example.com")
              .replace(/{amount}/g, "$100")
              .replace(/{date}/g, "07/17/2024")
              .replace(/{transaction_id}/g, "12345");
            templates.push(templateHtml);
          }
          console.log("Templates:", templates);
          setParsedEmailData(templates);
        } catch (error) {
          console.error("Error fetching email templates:", error);
        }
      },
    });
  };

  return (
    <div>
      <button onClick={saveDesign}>Save Design</button>
      <button onClick={exportHtml}>Export HTML</button>
      <input type="file" accept=".csv" onChange={handleCSVUpload} />
      <button onClick={() => setParsedEmailData(null)}>View Editor</button>
      <button onClick={toggleTheme}>Toggle Theme</button>
      {!parsedEmailData && (
        // Props here are necessary for react email-editor to function
        <EmailEditor
          ref={(editor) => (emailEditorRef.current = editor)}
          onLoad={onLoad}
          onDesignLoad={onDesignLoad}
          onExport={onExport}
          onError={onError}
          minHeight={600}
          options={{
            // Additional options here
            customCSS: `
      body {
              background-color: ${
                theme === "light" ? "#ffffff" : "#333333"
              } !important;
              color: ${theme === "light" ? "#333333" : "#ffffff"} !important;
      }
      .custom-class {
        font-size: 20px;
      }
    `,
            tools: {
              // Customize tools
              heading: {
                properties: {
                  text: {
                    value: "Custom Heading",
                  },
                },
              },
            },
            appearance: {
              theme: theme, // Change theme light <--> dark
              // panels: {
              //   tools: {
              //     dock: "left", // Dock tools panel to the left
              //   },
              // },
            },
          }}
        />
      )}
      {parsedEmailData && (
        <div>
          <h1>Preview Templates:</h1>
          {/* <div
            dangerouslySetInnerHTML={{ __html: parsedEmailData.templateHtml }}
          /> */}
          {parsedEmailData.map((template, index) => (
            <>
            <div key={index} dangerouslySetInnerHTML={{ __html: template }} />
            <br />
            </>
          ))}
        </div>
      )}
    </div>
  );
};

export default EmailTemplateEditor;
