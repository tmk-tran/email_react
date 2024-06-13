import Papa from "papaparse";
import { csvData } from "./csvData";

export const parseCsv = (data) => {
  return Papa.parse(data, {
    header: true,
    dynamicTyping: true,
    skipEmptyLines: true,
  }).data;
};

// export const emailData = parseCsv(csvData);
