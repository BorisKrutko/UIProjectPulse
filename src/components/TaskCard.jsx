import React, { useState } from "react";
import { SOURCE_STYLES } from "../data/sourceStyles";
import SourceBadge from "./SourceBadge";

export default function TaskCard({ 
  task, 
  onOpen, 
  onConfirm, 
  onReject, 
  projects = [], 
  isInboxView = false 
}) {
  const s = SOURCE_STYLES[task.source] || { bar: "border-l-gray-300" };
  const [selectedProject, setSelectedProject] = useState("");

  return (
    <div
      onClick={() => onOpen?.(task)}
      className={`cursor-pointer w-full bg-white border border-gray-200 border-l-[3px] ${s.bar}
      rounded-2xl p-3 hover:shadow-md transition-all flex flex-col justify-between`}
    >
      <div>
        <div className="flex items-center justify-between">
          <SourceBadge source={task.source} />

          <span className="text-xs text-gray-400 font-medium">
            {task.date || task.meta}
          </span>
        </div>

        <h3 className="text-[12px] font-bold text-gray-900 mt-2 leading-snug">
          {task.title}
        </h3>

        {task.description && (
          <p className="text-xs text-gray-500 mt-1.5 leading-relaxed line-clamp-2">
            {task.description}
          </p>
        )}
      </div>

      {isInboxView ? (
        <div className="mt-3 pt-2 border-t border-gray-100 flex flex-col gap-2">
          <div className="flex items-center justify-between gap-2">
            <div 
              className="flex flex-wrap gap-1 items-center" 
              onClick={(e) => e.stopPropagation()}
            >
              {projects.map((proj) => {
                const isSelected = selectedProject === proj.id;
                return (
                  <button
                    key={proj.id}
                    onClick={() => setSelectedProject(proj.id)}
                    className={`text-[10px] font-semibold px-2 py-0.5 rounded-lg border transition-all
                      ${isSelected 
                        ? "bg-blue-50 border-blue-200 text-blue-600 shadow-sm" 
                        : "bg-gray-50 border-gray-200 text-gray-500 hover:bg-gray-100"}`}
                  >
                    {proj.name}
                  </button>
                );
              })}
            </div>

            <div 
              className="flex items-center gap-1 shrink-0" 
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => onReject?.(task.id)}
                title="Отклонить"
                className="w-6 h-6 rounded-lg flex items-center justify-center text-xs text-rose-500 bg-rose-50 hover:bg-rose-100 border border-rose-100/50 transition-colors"
              >
                ✕
              </button>
              <button
                onClick={() => onConfirm?.(task.id, selectedProject)}
                disabled={!selectedProject}
                title="Добавить на доску"
                className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold transition-all
                  ${selectedProject 
                    ? "bg-emerald-500 text-white hover:bg-emerald-600 shadow-sm" 
                    : "bg-gray-100 text-gray-400 cursor-not-allowed"}`}
              >
                ✓
              </button>
            </div>

          </div>
        </div>
      ) : (
        <div className="mt-2 pt-2 border-t border-gray-100 flex items-center justify-between">
          {task.assignee ? (
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-gray-200 text-gray-600 flex items-center justify-center text-[9px] font-semibold flex-shrink-0">
                {task.assignee.slice(0, 2).toUpperCase()}
              </div>
              
              <div className="text-xs truncate max-w-[120px]">
                <span className="text-gray-700 font-medium">
                  {task.assignee}
                </span>
              </div>
            </div>
          ) : null}
          
          {task.priority && (
            <span
              className={`text-[11px] font-semibold ${
                task.priority === "High"
                  ? "text-rose-400"
                  : task.priority === "Medium"
                  ? "text-amber-400"
                  : "text-gray-400"
              }`}
            >
              {task.priority}
            </span>
          )}
        </div>
      )}
    </div>
  );
}