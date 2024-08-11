import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Input, Button, Spinner, Pagination } from "@nextui-org/react";
import { FaPlus, FaSearch } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";
import { ipAddress } from "../backendIp";
import FlashcardTable from "./Dashboard/FlashcardTable";
import FlashcardModal from "./Dashboard/FlashCardModal";
import FlashcardImport from "./Dashboard/FlashCardImport";
import FlashcardStats from "./Dashboard/FlashCardStats";

const AdminDashboard = () => {
  const [flashcards, setFlashcards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
  const [selectedFlashcard, setSelectedFlashcard] = useState(null);
  const [newFlashcard, setNewFlashcard] = useState({
    question: "",
    answer: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("add");
  const [stats, setStats] = useState({ total: 0, avgLength: 0, usefulStat: 0 });

  useEffect(() => {
    fetchFlashcards();
  }, []);

  const fetchFlashcards = async () => {
    try {
      const response = await axios.get(`${ipAddress}/api/flashcard`);
      setFlashcards(response.data);
      setStats(calculateStats(response.data));
      setLoading(false);
    } catch (error) {
      setError("Failed to load flashcards");
      setLoading(false);
    }
  };

  const calculateStats = (flashcards) => {
    const total = flashcards.length;
    const avgLength = (
      flashcards.reduce((sum, card) => sum + card.question.length, 0) / total
    ).toFixed(1);
    const usefulStat = "new calculation here"; // Replace with actual logic
    return { total, avgLength, usefulStat };
  };

  const handleSort = () => {
    const order = sortOrder === "asc" ? "desc" : "asc";
    setSortOrder(order);
    setFlashcards(
      [...flashcards].sort((a, b) =>
        order === "asc"
          ? a.question.localeCompare(b.question)
          : b.question.localeCompare(a.question)
      )
    );
  };

  const openEditModal = (flashcard) => {
    setSelectedFlashcard(flashcard);
    setNewFlashcard(flashcard);
    setModalMode("edit");
    setIsModalOpen(true);
  };

  const handleDeleteFlashcard = async (id) => {
    try {
      await axios.delete(`${ipAddress}/api/flashcard/${id}`);
      setFlashcards(flashcards.filter((card) => card.id !== id));
      toast.success("Flashcard deleted successfully");
    } catch (error) {
      toast.error("Failed to delete flashcard");
    }
  };

  const handleSaveFlashcard = async () => {
    try {
      if (modalMode === "add") {
        const response = await axios.post(
          `${ipAddress}/api/flashcard`,
          newFlashcard
        );
        setFlashcards([...flashcards, response.data]);
        toast.success("Flashcard added successfully");
      } else {
        await axios.put(
          `${ipAddress}/api/flashcard/${selectedFlashcard.id}`,
          newFlashcard
        );
        setFlashcards(
          flashcards.map((card) =>
            card.id === selectedFlashcard.id ? newFlashcard : card
          )
        );
        toast.success("Flashcard updated successfully");
      }
      setIsModalOpen(false);
      setNewFlashcard({ question: "", answer: "" });
    } catch (error) {
      toast.error("Failed to save flashcard");
    }
  };

  const handleInputChange = (field, value) => {
    setNewFlashcard({ ...newFlashcard, [field]: value });
  };

  const handleImport = (data) => {
    const importedFlashcards = data.map((row) => ({
      question: row.question,
      answer: row.answer,
    }));

    importedFlashcards.forEach(async (card) => {
      const response = await axios.post(`${ipAddress}/api/flashcard`, card);
      setFlashcards((prev) => [...prev, response.data]);
      toast.success("Flashcards imported successfully");
    });
  };

  const filteredFlashcards = flashcards.filter((flashcard) =>
    flashcard.question.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const currentItems = filteredFlashcards.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="p-6">
      <Toaster />
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <FlashcardStats stats={stats} />
        <div className="flex justify-between items-center mb-4">
          <Input
            label="Search Flashcards"
            placeholder="Search by question..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            contentRight={<FaSearch />}
          />
          <div className="mx-2 flex space-x-2">
            <Button
              color="primary"
              auto
              onPress={() => {
                setIsModalOpen(true);
                setModalMode("add");
              }}
              icon={<FaPlus />}
            >
              Add Flashcard
            </Button>
            <FlashcardImport onImport={handleImport} />
          </div>
        </div>
        {loading ? (
          <Spinner label="Loading..." />
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <FlashcardTable
            currentItems={currentItems}
            sortOrder={sortOrder}
            handleSort={handleSort}
            openEditModal={openEditModal}
            handleDeleteFlashcard={handleDeleteFlashcard}
          />
        )}
        <Pagination
          className="my-2"
          total={Math.ceil(filteredFlashcards.length / itemsPerPage)}
          initialPage={1}
          onChange={(page) => setCurrentPage(page)}
        />
        <FlashcardModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          modalMode={modalMode}
          flashcardData={newFlashcard}
          handleInputChange={handleInputChange}
          handleSaveFlashcard={handleSaveFlashcard}
        />
      </motion.div>
    </div>
  );
};

export default AdminDashboard;
