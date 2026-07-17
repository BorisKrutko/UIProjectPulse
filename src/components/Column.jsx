import React from "react";
import { Circle, Plus } from "lucide-react";
import TaskCard from "./TaskCard";

export default function Column({ column, tasks, onOpen }) {
  return (
    <div className="flex flex-col h-full max-h-full flex-1 min-w-[280px] max-w-[400px] bg-gray-50 rounded-xl p-0">
      <div className="flex items-center justify-between mb-3 shrink-0">
        <h3 className="font-semibold text-gray-700 flex items-center gap-2">
          {column.title}
          <span className="text-xs bg-gray-200/60 text-gray-500 rounded-full px-2 py-0.5 font-bold">
            {tasks.length}
          </span>
        </h3>
      </div>

      <div className="flex-1 overflow-y-auto pr-1 scrollbar-hidden">
        {tasks.length > 0 ? (
          <div className="space-y-3">
            {tasks.map((task) => (
              <TaskCard 
                key={task.id} 
                task={task} 
                onOpen={onOpen} 
              />
            ))}
          </div>
        ) : (
      <div className="w-full bg-white border border-gray-100 border-l-[3px] border-l-gray-200 rounded-2xl p-3 flex flex-col items-center justify-center min-h-[140px] gap-2 text-gray-400 select-none">
        <Circle size={16} className="stroke-[1.5] text-gray-300" />
        <span className="text-[10px] font-semibold uppercase tracking-wider text-gray-400">
        </span>
      </div>
        )}
      </div>
    </div>
  );
}