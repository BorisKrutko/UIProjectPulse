import React, { useRef, useEffect } from "react"; 
import { ChevronDown, Check } from "lucide-react";
import { PROJECTS } from "../data/projects";
import { COLUMNS } from "../data/columns";

const PRIORITY_STYLES = {
  Low: "text-emerald-600",
  Medium: "text-amber-500",
  High: "text-red-500",
};

function FieldLabel({ children }) {
  return (
    <label className="block text-[13px] font-semibold tracking-widest text-gray-400 mb-2">
      {children}
    </label>
  );
}


function getSourceInitials(name) {
  if (!name) return "?";
  return name.trim().slice(0, 2).toUpperCase();
}

export default function TaskModal({ task, updateTask, onClose }) {
  const priorityValue = task.priority || "Medium";
  const priorityColor = PRIORITY_STYLES[priorityValue] || "text-gray-700";
  const textareaRef = useRef(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"; 
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; 
    }
  }, [task.description]);

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-[4px] border-[3px] border-gray-100 shadow-2xl w-[620px] max-h-[90vh] overflow-auto">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-black shrink-0" />
            <span className="text-sm font-bold tracking-widest text-gray-900">
              TASK
            </span>
            <span className="text-sm text-gray-400 font-mono">
              /{task.project ? task.project.toLowerCase() : "noxs"}/{task.id}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-2 bg-gray-900 text-white rounded-xl hover:bg-black transition-colors flex items-center justify-center"
          >
            <Check size={16} strokeWidth={3} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-5">
          {/* Name */}
          <div>
            <FieldLabel>Name</FieldLabel>
            <input
              className="w-full bg-gray-50 rounded-xl px-4 py-3 text-base font-medium text-gray-900 border border-transparent focus:border-gray-300 focus:bg-white focus:outline-none transition-colors"
              value={task.title}
              onChange={(e) =>
                updateTask(task.id, { title: e.target.value })
              }
            />
          </div>

          {/* Description */}
          <div>
            <FieldLabel>Description</FieldLabel>
            <textarea
              ref={textareaRef}
              rows={3}
              className="w-full bg-gray-50 rounded-xl px-4 py-3 text-sm text-gray-600 border border-transparent focus:border-gray-300 focus:bg-white focus:outline-none transition-all resize-none overflow-hidden"
              value={task.description || ""}
              onChange={(e) =>
                updateTask(task.id, { description: e.target.value })
              }
            />
          </div>

          {/* Project Selector */}
          <div>
            <FieldLabel>Project</FieldLabel>
            <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent">
              <button
                type="button"
                onClick={() => updateTask(task.id, { project: null })}
                className={`px-3 py-2 text-xs font-bold uppercase tracking-wider rounded-xl transition-all border shrink-0 ${
                  !task.project
                    ? "bg-gray-900 text-white border-transparent"
                    : "bg-gray-50 text-gray-500 border-transparent hover:bg-gray-100"
                }`}
              >
                No Project
              </button>

              {PROJECTS.map((project) => {
                const isSelected = task.project === project.name;
                return (
                  <button
                    key={project.name}
                    type="button"
                    onClick={() => updateTask(task.id, { project: project.name })}
                    className={`px-3 py-2 text-xs font-bold uppercase tracking-wider rounded-xl transition-all border shrink-0 ${
                      isSelected
                        ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                        : "bg-gray-50 text-gray-600 border-transparent hover:bg-gray-100"
                    }`}
                  >
                    {project.name}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            {/* Status */}
            <div>
              <FieldLabel>Status</FieldLabel>
              <div className="relative">
                <select
                  className="w-full appearance-none bg-gray-50 text-gray-900 font-semibold text-xs rounded-xl pl-3 pr-8 py-2.5 border border-transparent focus:border-gray-300 focus:outline-none cursor-pointer transition-colors"
                  value={task.column}
                  onChange={(e) =>
                    updateTask(task.id, { column: e.target.value })
                  }
                >
                  {COLUMNS.map((column) => (
                    <option key={column.key} value={column.key}>
                      {column.title}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  size={14}
                  className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400"
                />
              </div>
            </div>

            {/* Priority */}
            <div>
              <FieldLabel>Priority</FieldLabel>
              <div className="relative">
                <select
                  className={`w-full appearance-none bg-gray-50 uppercase text-xs font-semibold tracking-wide rounded-xl pl-3 pr-8 py-2.5 border border-transparent focus:border-gray-300 focus:outline-none cursor-pointer transition-colors ${priorityColor}`}
                  value={priorityValue}
                  onChange={(e) =>
                    updateTask(task.id, { priority: e.target.value })
                  }
                >
                  <option value="Low" className="text-emerald-600">
                    Low
                  </option>
                  <option value="Medium" className="text-amber-500">
                    Medium
                  </option>
                  <option value="High" className="text-red-500">
                    High
                  </option>
                </select>
                <ChevronDown
                  size={14}
                  className={`pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 ${priorityColor}`}
                />
              </div>
            </div>

            {/* Source */}
            <div>
              <FieldLabel>Source</FieldLabel>
              <div className="flex items-center gap-2 bg-gray-100/70 rounded-xl px-2.5 py-2 border border-transparent select-none cursor-not-allowed">
                <div className="w-5.5 h-5.5 rounded bg-gray-200 text-gray-600 flex items-center justify-center text-[10px] font-bold flex-shrink-0 aspect-square">
                  {getSourceInitials(task.source)}
                </div>
                <span className="text-xs font-semibold text-gray-500 truncate">
                  {task.source || "System"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-100 px-6 py-3 flex justify-end"></div>
      </div>
    </div>
  );
}