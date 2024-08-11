import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { Button, Card, CardBody, Progress, Spinner } from "@nextui-org/react";
import { FaArrowLeft, FaArrowRight, FaRedo } from "react-icons/fa";
import { ipAddress } from "../backendIp";

const FlashcardSet = () => {
  const [flashcards, setFlashcards] = useState([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchFlashcards();
  }, []);

  const fetchFlashcards = async () => {
    try {
      const response = await axios.get(`${ipAddress}/api/flashcard`);
      setFlashcards(response.data);
      setLoading(false);
    } catch (err) {
      setError("Failed to load flashcards. Please try again later.");
      setLoading(false);
    }
  };

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleNext = () => {
    setIsFlipped(false);
    setCurrentCardIndex((prevIndex) => (prevIndex + 1) % flashcards.length);
  };

  const handlePrevious = () => {
    setIsFlipped(false);
    setCurrentCardIndex(
      (prevIndex) => (prevIndex - 1 + flashcards.length) % flashcards.length
    );
  };

  const handleReset = () => {
    setIsFlipped(false);
    setCurrentCardIndex(0);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner size="lg" />
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  const currentCard = flashcards[currentCardIndex];

  if (!currentCard) {
    return (
      <div className="text-center text-red-500 mt-10">No flashcards found</div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Flashcard Set</h1>
      <div className="flex justify-center mb-8">
        <Progress
          value={((currentCardIndex + 1) / flashcards.length) * 100}
          className="max-w-md"
          color="primary"
          showValueLabel={true}
          label={`Question ${currentCardIndex + 1} of ${flashcards.length}`}
        />
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={currentCardIndex}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <Card
            className="min-w-[30vw] min-h-[30vh] max-w-md mx-auto cursor-pointer bg-gradient-to-br from-blue-600 to-blue-300"
            isPressable
            onPress={handleFlip}
          >
            <CardBody
              className="h-64 flex items-center justify-center overflow-hidden"
              style={{ perspective: 1000 }}
            >
              <motion.div
                className="relative w-full h-full flex items-center justify-center"
                animate={{
                  rotateY: isFlipped ? 180 : 0,
                }}
                transition={{
                  duration: 0.8,
                  ease: [0.68, -0.55, 0.27, 1.55],
                }}
                style={{
                  transformStyle: "preserve-3d",
                  backfaceVisibility: "hidden",
                }}
              >
                {!isFlipped ? (
                  <div
                    className="absolute w-full h-full flex items-center justify-center backface-hidden"
                    style={{ backfaceVisibility: "hidden" }}
                  >
                    <p className="text-xl font-semibold text-white">
                      {currentCard.question}
                    </p>
                  </div>
                ) : (
                  <div
                    className="absolute w-full h-full flex items-center justify-center backface-hidden"
                    style={{
                      backfaceVisibility: "hidden",
                      transform: "rotateY(180deg)",
                    }}
                  >
                    <p>Answer :</p>
                    <p className="mx-2 text-xl font-semibold text-white">
                      {currentCard.answer}
                    </p>
                  </div>
                )}
              </motion.div>
            </CardBody>
          </Card>
        </motion.div>
      </AnimatePresence>
      <div className="flex justify-center mt-8 space-x-4">
        <Button
          color="primary"
          startContent={<FaArrowLeft />}
          onClick={handlePrevious}
        >
          Previous
        </Button>
        <Button
          color="primary"
          endContent={<FaArrowRight />}
          onClick={handleNext}
        >
          Next
        </Button>
        <Button color="default" startContent={<FaRedo />} onClick={handleReset}>
          Reset
        </Button>
      </div>
    </div>
  );
};

export default FlashcardSet;
