import React from "react";
import Column from "./Column";
import { COLUMNS } from "../data/columns";

export default function Board({
  tasks,
  onOpen,
}) {
  return (
    <div className="flex-1 min-h-0 overflow-hidden relative">
      <div className="h-full overflow-x-auto overflow-y-hidden px-6 py-3 scrollbar-hidden">
        <div className="flex gap-3 h-full w-full">
          {COLUMNS.map((column) => (
            <Column
              key={column.key}
              column={column}
              tasks={tasks.filter(
                (task) => task.column === column.key
              )}
              onOpen={onOpen}
            />
          ))}
        </div>
      </div>
    </div>
  );
}