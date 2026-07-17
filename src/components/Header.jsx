import React from "react";

const FILTERS = [
  "Все",
  "Telegram",
  "Google Chat",
  "Gmail",
  "Bluedot",
];

export default function Header({
  activeProject,
  filter,
  setFilter,
}) {
  return (
    <header className="sticky top-0 z-10 h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">

      <div>
        <h1 className="text-lg font-semibold">
          {activeProject}
        </h1>
      </div>

      <div className="flex gap-2">

        {FILTERS.map((item) => (
          <button
            key={item}
            onClick={() => setFilter(item)}
            className={`px-3 py-1.5 rounded-md text-sm transition
            ${
              filter === item
                ? "bg-black text-white"
                : "bg-white border hover:bg-gray-50"
            }`}
          >
            {item}
          </button>
        ))}

      </div>

    </header>
  );
}