export type LessonStatus = "completed" | "current" | "locked";

export interface LessonNodeProps {
  title: string;
  icon: React.ReactNode;
  status: LessonStatus;
  side?: "left" | "right" | "center";
  showStar?: boolean;
  isBigExam?: boolean;
}

export interface UnitCardProps {
  unit: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  shadow: string;
  muted?: boolean;
}
