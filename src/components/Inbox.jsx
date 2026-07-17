import React from "react";
import TaskCard from "./TaskCard";

export default function Inbox({
  tasks,
  onOpen,
  onConfirm,
  onReject, 
  projects = [],
}) {
  return (
    <div className="flex-1 overflow-y-auto px-6 py-6">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

          {tasks.length === 0 && (
            <div className="bg-white rounded-xl border border-gray-200 p-10 text-center text-gray-400 md:col-span-3">
              Inbox пуст
            </div>
          )}

          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onOpen={onOpen}
              onConfirm={onConfirm}
              onReject={onReject}
              projects={projects}
              isInboxView={true}
            />
          ))}
        </div>
      </div>
    </div>
  );
}