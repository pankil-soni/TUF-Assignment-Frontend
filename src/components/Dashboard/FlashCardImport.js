import React from "react";
import { Button } from "@nextui-org/react";
import { FaFileImport } from "react-icons/fa";
import * as XLSX from "xlsx";
import { useRef } from "react";
import toast from "react-hot-toast";
const FlashcardImport = ({ onImport }) => {
  const fileInputRef = useRef(null);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (evt) => {
      const binaryStr = evt.target.result;
      const workbook = XLSX.read(binaryStr, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const data = XLSX.utils.sheet_to_json(sheet);
      console.log(data);
      const oneRow = data[0];

      if (
        oneRow.hasOwnProperty("question") &&
        oneRow.hasOwnProperty("answer")
      ) {
        onImport(data);
      } else {
        toast.error(
          "Invalid file format. Please upload a valid flashcard file."
        );
      }
    };

    reader.readAsBinaryString(file);
  };

  return (
    <div>
      <input
        type="file"
        accept=".csv, .xlsx"
        onChange={handleFileUpload}
        style={{ display: "none" }}
        id="fileInput"
        ref={fileInputRef}
      />
      <label htmlFor="fileInput">
        <Button onClick={() => fileInputRef.current.click()} color="default">
          Import Flashcards {<FaFileImport />}
        </Button>
      </label>
    </div>
  );
};

export default FlashcardImport;
