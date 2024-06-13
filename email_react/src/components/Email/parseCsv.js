import Papa from "papaparse";
import { csvData } from "./csvData";

// export const parseCsv = (data) => {
//   return Papa.parse(data, {
//     header: true,
//     dynamicTyping: true,
//     skipEmptyLines: true,
//   }).data;
// };
export const parseCsv = (csvData) => {
  const result = Papa.parse(csvData, {
    header: true, // Ensures the first row is treated as headers
    dynamicTyping: true, // Automatically converts numeric values
    skipEmptyLines: true, // Skips empty lines
  });

  return result.data; // Returns parsed data
};
