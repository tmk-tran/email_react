import React, { useRef, useState, useEffect } from "react";
import EmailEditor from "react-email-editor";
import Papa from "papaparse";

const EmailTemplateEditor = () => {
  let emailEditorRef = useRef(null);
  console.log(emailEditorRef);
  const [parsedEmailData, setParsedEmailData] = useState(null);
  console.log(parsedEmailData);
  const [theme, setTheme] = useState("dark");

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
    emailEditorRef.current.editor.exportHtml((data) => {
      const { design, html } = data;
      // Send the HTML to your email sending service
      console.log("Exported HTML", html);
      // Create a blob with the HTML content
      const blob = new Blob([html], { type: "text/html" });

      // Create a link element
      const link = document.createElement("a");

      // Set the download attribute with a filename
      link.download = "exported_email.html";

      // Create a URL for the blob and set it as the href attribute
      link.href = window.URL.createObjectURL(blob);

      // Append the link to the body
      document.body.appendChild(link);

      // Programmatically click the link to trigger the download
      link.click();

      // Remove the link from the document
      document.body.removeChild(link);
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
        // Log the design JSON to the console
        console.log(JSON.stringify(design, null, 2));
        // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //
        // ~~~~~~~~~~~ This will be for sending to backend ~~~~~~~~~~~ //
        // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //
        // Make a POST request to your backend to save the design
        // fetch('https://your-api-endpoint.com/save-design', {
        //   method: 'POST',
        //   headers: {
        //     'Content-Type': 'application/json',
        //   },
        //   body: JSON.stringify(design),
        // })
        //   .then(response => {
        //     if (response.ok) {
        //       console.log('Design saved successfully!');
        //     } else {
        //       console.error('Failed to save design:', response.statusText);
        //     }
        //   })
        //   .catch(error => {
        //     console.error('Error saving design:', error);
        //   });
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
    // const file = event.target.files[0];
    const fileInput = event.target;
    const file = fileInput.files[0];
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
        } finally {
          // Clear the file input value to allow the user to upload another file
          fileInput.value = null;
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
      <button onClick={toggleTheme}>
        {theme === "dark" ? "Light Mode" : "Dark Mode"}
      </button>
      {!parsedEmailData && (
        // Props here are necessary for react email-editor to function
        <EmailEditor
          ref={(editor) => (emailEditorRef.current = editor)}
          onLoad={onLoad}
          onDesignLoad={onDesignLoad}
          onExport={onExport}
          onError={onError}
          minHeight={700}
          options={{
            // Additional options here
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
              loader: {
                html: '<div class="custom-spinner"><div class="spinner"></div></div>',
                css: ".custom-spinner { display: flex; justify-content: center; align-items: center; height: 100%; } .spinner { border: 4px solid rgba(0, 0, 0, 0.1); border-left-color: #00A79D; border-radius: 50%; width: 40px; height: 40px; animation: spin 1s linear infinite; } @keyframes spin { to { transform: rotate(360deg); } }",
              },
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
