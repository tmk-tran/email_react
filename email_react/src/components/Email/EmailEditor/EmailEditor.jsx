import React, { useRef, useState, useEffect } from "react";
import EmailEditor from "react-email-editor";
import Papa from "papaparse";

const EmailTemplateEditor = () => {
  let emailEditorRef = useRef(null);
  console.log(emailEditorRef);
  const [parsedEmailData, setParsedEmailData] = useState(null);
  console.log(parsedEmailData);

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

  const onDesignSave = (data) => {
    console.log("Design Saved", data);
    // Handle the design save event here.
  };

  const onExport = (data) => {
    const { design, html } = data;
    console.log("Exported HTML", html);
    // Handle the export event here.
  };

  const onSaveTemplate = (data) => {
    console.log("Template Saved", data);
  };

  const onLoadTemplate = (data) => {
    console.log("Template Loaded", data);
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
          const response = await fetch("/resetPasswordEmailTemplate.html");
          const html = await response.text();
          data.forEach((row) => {
            const templateHtml = html
              .replace(/{first_name}/g, "Mark")
              .replace(/{reset_link}/g, "www.google.com");
            console.log("Template HTML:", templateHtml);
            setParsedEmailData({ templateHtml });
            console.log("Parsed Email Data:", parsedEmailData);
          });
        } catch (error) {
          console.error("Error fetching email template:", error);
        }
      },
    });
  };

  return (
    <div>
      <button onClick={saveDesign}>Save Design</button>
      <button onClick={exportHtml}>Export HTML</button>
      <input type="file" accept=".csv" onChange={handleCSVUpload} />
      {!parsedEmailData && (
        <EmailEditor
          ref={(editor) => (emailEditorRef.current = editor)}
          onLoad={onLoad}
          onDesignLoad={onDesignLoad}
          onDesignSave={onDesignSave}
          onSaveTemplate={onSaveTemplate}
          onLoadTemplate={onLoadTemplate}
          onError={onError}
          minHeight={600}
          options={
            {
              // Additional options here
            }
          }
        />
      )}
      {parsedEmailData && (
        <div>
          <h2>Preview Template</h2>
          <div
            dangerouslySetInnerHTML={{ __html: parsedEmailData.templateHtml }}
          />
        </div>
      )}
    </div>
  );
};

export default EmailTemplateEditor;
