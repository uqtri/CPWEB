import React from "react";
import DifficultyCard from "../../components/DifficultyCard/DifficultyCard";

export default function Challenge() {
  return (
    <div className="challenge-section mt-10 shadow-lg rounded-xl">
      <p className="text-4xl text-center font-bold">
        Thử thách theo mức độ khó
      </p>
      <div className="challenges grid grid-cols-1 gap-4 mt-4">
        <DifficultyCard
          color="green"
          title="Dễ"
          numberOfProblems={350}
          description="Bài tập cơ bản phù hợp cho người mới bắt đầu"
        />
        <DifficultyCard
          color="primary"
          title="Trung bình"
          numberOfProblems={350}
          description="Bài tập cơ bản phù hợp cho người mới bắt đầu"
        />
        <DifficultyCard
          color="yellow"
          title="Khó"
          numberOfProblems={350}
          description="Bài tập cơ bản phù hợp cho người mới bắt đầu"
        />
        <DifficultyCard
          color="red"
          title="Chuyên gia"
          numberOfProblems={350}
          description="Bài tập cơ bản phù hợp cho người mới bắt đầu"
        />
      </div>
    </div>
  );
}
