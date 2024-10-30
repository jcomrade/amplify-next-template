import DropIndicator from "./dropIndicator";
import { motion } from "framer-motion";
import card from "@/styles/subjectCard.module.scss";
import { DragEvent } from "react";

interface SubjectCardProps {
  cardDetails: {
    courseDescription: string;
    id: string;
    column: number;
    courseCode: string;
    units: number;
    status: string;
    preRequisite: string[],
    coRequisite: string[],
    error?: string | JSX.Element;
  }
  handleDragStart: (
    e: DragEvent<HTMLDivElement>,
    card: {
      courseDescription: string;
      id: string;
      column: number;
      courseCode: string;
      units: number;
      status: string;
      preRequisite: string[],
      coRequisite: string[],
    }
  ) => void;
}

export const SubjectCard: React.FC<SubjectCardProps> = ({
  cardDetails,
  handleDragStart,
}) => {
  return (
    <div className={card.container}>
      <DropIndicator beforeId={cardDetails.id} column={cardDetails.column} />
      <motion.div
        layout
        layoutId={cardDetails.id}
        draggable="true"
        onDragStart={(e) =>
          handleDragStart(e as unknown as DragEvent<HTMLDivElement>, cardDetails)
        }
        className={card.draggableItem}
      >
        <div className={card.header}>
          <div className={card.title}>{cardDetails.courseCode}</div>
          <div className={card.units}>{cardDetails.units} u</div>
        </div>
        <div className={card.content}>
          <p className={card.titleText}>{cardDetails.courseDescription}</p>
        </div>
        {cardDetails.error && <div className={card.error}>{cardDetails.error}</div>}
        <div className={card.footer}>
          <p className={card.icon}>Icon</p>
          <p className={card.status}>Status : {cardDetails.status}</p>
        </div>
      </motion.div>
    </div>
  );
};

export default SubjectCard;
