import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
} from "@nextui-org/react";
import { FaSortAlphaDown, FaSortAlphaUp } from "react-icons/fa";
import FlashcardActions from "./FlashCardActions";

const FlashcardTable = ({
  currentItems,
  sortOrder,
  handleSort,
  openEditModal,
  handleDeleteFlashcard,
}) => {
  return (
    <Table aria-label="Flashcards table">
      <TableHeader>
        <TableColumn onClick={handleSort} className="p-2">
          <Button onPress={handleSort} className="bg-transparent">
            {sortOrder === "asc" ? <FaSortAlphaDown /> : <FaSortAlphaUp />}
            Question
          </Button>
        </TableColumn>
        <TableColumn className="p-2">Answer</TableColumn>
        <TableColumn className="p-2">Actions</TableColumn>
      </TableHeader>
      <TableBody>
        {currentItems.map((flashcard) => (
          <TableRow key={flashcard.id}>
            <TableCell>{flashcard.question}</TableCell>
            <TableCell>{flashcard.answer}</TableCell>
            <TableCell>
              <FlashcardActions
                flashcard={flashcard}
                openEditModal={openEditModal}
                handleDeleteFlashcard={handleDeleteFlashcard}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default FlashcardTable;
