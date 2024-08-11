import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Button,
} from "@nextui-org/react";

const FlashcardModal = ({
  isOpen,
  onClose,
  modalMode,
  flashcardData,
  handleInputChange,
  handleSaveFlashcard,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <ModalHeader>
          {modalMode === "add" ? "Add New Flashcard" : "Edit Flashcard"}
        </ModalHeader>
        <ModalBody>
          <Input
            label="Question"
            value={flashcardData.question}
            onChange={(e) => handleInputChange("question", e.target.value)}
          />
          <Input
            label="Answer"
            value={flashcardData.answer}
            onChange={(e) => handleInputChange("answer", e.target.value)}
          />
        </ModalBody>
        <ModalFooter>
          <Button auto flat color="error" onPress={onClose}>
            Close
          </Button>
          <Button auto onPress={handleSaveFlashcard}>
            {modalMode === "add" ? "Add" : "Save"}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default FlashcardModal;
