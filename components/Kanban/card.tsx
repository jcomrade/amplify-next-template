import DropIndicator from "./dropIndicator";
import { motion } from "framer-motion";
import card from "@/styles/subjectCard.module.scss";
import { DragEvent } from "react";

interface SubjectCardProps {
  courseDescription: string;
  id: string;
  column: number;
  courseCode: string;
  units: number;
  status: string;
  preRequisite: string[];
  handleDragStart: (
    e: DragEvent<HTMLDivElement>,
    subject: { courseDescription: string; id: string; column: number }
  ) => void;
  error?: string | JSX.Element;
}

export const SubjectCard: React.FC<SubjectCardProps> = ({
  courseDescription,
  id,
  column,
  courseCode,
  units,
  status,
  preRequisite,
  handleDragStart,
  error,
}) => {
  return (
    <div className={card.container}>
      <DropIndicator beforeId={id} column={column} />
      <motion.div
        layout
        layoutId={id}
        draggable="true"
        onDragStart={(e) =>
          handleDragStart(e, { courseDescription, id, column })
        }
        className={card.draggableItem}
      >
        <div className={card.header}>
          <div className={card.title}>{courseCode}</div>
          <div className={card.units}>{units} u</div>
        </div>
        <div className={card.content}>
          <p className={card.titleText}>{courseDescription}</p>
        </div>
        {error && <div className={card.error}>{error}</div>}
        <div className={card.footer}>
          <p className={card.icon}>Icon</p>
          <p className={card.status}>Status : {status}</p>
        </div>
      </motion.div>
    </div>
  );
};

export default SubjectCard;
