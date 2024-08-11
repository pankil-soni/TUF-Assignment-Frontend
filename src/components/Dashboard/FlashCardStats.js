import React from "react";
import { Card, CardBody } from "@nextui-org/react";

const FlashcardStats = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      <Card>
        <CardBody>
          <h2 className="text-xl font-semibold mb-2">Total Flashcards</h2>
          <p className="text-3xl font-bold">{stats.total}</p>
        </CardBody>
      </Card>
      <Card>
        <CardBody>
          <h2 className="text-xl font-semibold mb-2">Avg. Card Length</h2>
          <p className="text-3xl font-bold">{stats.avgLength} chars</p>
        </CardBody>
      </Card>
      <Card>
        <CardBody>
          <h2 className="text-xl font-semibold mb-2">Another Stat</h2>
          <p className="text-3xl font-bold">2</p>
        </CardBody>
      </Card>
    </div>
  );
};

export default FlashcardStats;
