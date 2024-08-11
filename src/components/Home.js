import React from "react";
import { Link } from "react-router-dom";
import { Button, Card, CardBody, CardFooter } from "@nextui-org/react";
import { motion } from "framer-motion";

const cardsInfo = [
  {
    title: "Study React JS",
    description: "start learning React with our interactive flashcard learning",
    imageUrl: "https://shethink.in/wp-content/uploads/2021/07/react.js-img.png",
  },
  {
    title: "Study Next JS",
    description: "start learning Next with our interactive flashcard learning",
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvXXirYMi8cB7ilga5d2dyFtLjC5rJQDDDoA&s",
  },
  {
    title: "Study Node JS",
    description: "start learning Node with our interactive flashcard learning",
    imageUrl: "https://logowik.com/content/uploads/images/nodejs.jpg",
  },
];

const Home = () => {
  return (
    <div className="bg-background container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold text-center mb-8">
          Welcome to FlashMaster
        </h1>
        <p className="text-xl text-center mb-12">
          Master any subject with our interactive flashcard learning tool
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {cardsInfo.map((card, index) => (
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Card>
              <CardBody>
                <h2 className="text-2xl font-semibold">{card.title}</h2>
                <p className="text-gray-400">{card.description}</p>
                <img
                  alt="Card background"
                  className="my-4 object-cover rounded-xl max-w-96 max-h-36"
                  src={card.imageUrl}
                  width={270}
                  height={200}
                />
              </CardBody>
              <CardFooter>
                <Button as={Link} to="/flashcards">
                  Get Started
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Home;
