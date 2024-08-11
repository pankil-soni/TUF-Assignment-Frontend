import React from "react";
import {
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@nextui-org/react";
import { FaEdit, FaTrash } from "react-icons/fa";

const FlashcardActions = ({
  flashcard,
  openEditModal,
  handleDeleteFlashcard,
}) => {
  return (
    <div className="flex space-x-2">
      <Button
        color="primary"
        auto
        onPress={() => openEditModal(flashcard)}
        icon={<FaEdit />}
      >
        Edit
      </Button>
      <Popover placement="right">
        <PopoverTrigger>
          <Button color="danger">
            Delete <FaTrash />
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <div className="px-1 py-2">
            <p>Are you sure you want to delete this flashcard?</p>
            <div className="flex justify-end mt-2">
              <Button
                color="danger"
                onPress={() => handleDeleteFlashcard(flashcard.id)}
              >
                Yes, delete
              </Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default FlashcardActions;
