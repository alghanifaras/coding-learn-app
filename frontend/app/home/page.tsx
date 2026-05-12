import {
  Terminal,
  Laptop,
  Braces,
  Code2,
  Lock,
  Database,
  Medal,
  FunctionSquare,
} from "lucide-react";

import TopStats from "@/components/learning-path/TopStats";
import Sidebar from "@/components/learning-path/Sidebar";
import UnitCard from "@/components/learning-path/UnitCard";
import LessonNode from "@/components/learning-path/LessonNode";
import MascotBubble from "@/components/learning-path/MascotBubble";
import FloatingContinueButton from "@/components/learning-path/FloatingContinueButton";

export default function LearningPathPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <TopStats />
      <Sidebar />

      <main className="pb-32 pt-28 lg:ml-72">
        <div className="mx-auto max-w-4xl px-6">
          <UnitCard
            unit="Unit 1"
            title="The Basics of Logic"
            description="Variables, Strings, and simple arithmetic."
            color="bg-blue-500"
            shadow="#1D4ED8"
            icon={<Terminal className="h-16 w-16 text-white" />}
          />

          <div className="relative mt-12 flex flex-col items-center gap-14 py-8">
            <div className="absolute left-1/2 top-0 h-full w-2 -translate-x-1/2 rounded-full bg-slate-200" />

            <LessonNode
              title="Variables & Constants"
              icon={<Laptop className="h-10 w-10" />}
              status="completed"
              side="left"
              showStar
            />

            <LessonNode
              title="Primitive Types"
              icon={<Braces className="h-10 w-10" />}
              status="completed"
              side="right"
              showStar
            />

            <div className="relative my-4">
              <LessonNode
                title="Intro to Functions"
                icon={<Code2 className="h-12 w-12" />}
                status="current"
              />
            </div>

            <UnitCard
              unit="Unit 2"
              title="Function Mastery"
              description="Parameters, return values, and scope."
              color="bg-purple-500"
              shadow="#7C3AED"
              icon={<FunctionSquare className="h-16 w-16 text-white" />}
            />

            <LessonNode
              title="Returning Values"
              icon={<Lock className="h-10 w-10" />}
              status="locked"
              side="right"
            />

            <LessonNode
              title="Scope & Hoisting"
              icon={<Braces className="h-10 w-10" />}
              status="locked"
              side="left"
            />
          </div>
        </div>
      </main>

      <FloatingContinueButton />
    </div>
  );
}
