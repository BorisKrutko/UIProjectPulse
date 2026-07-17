import React from "react";
import {
  Activity,
  Inbox as InboxIcon,
  FolderKanban,
  Plus,
  Trash2,
} from "lucide-react";

export default function Sidebar({
  activeProject,
  setActiveProject,
  showInbox,
  setShowInbox,
  inboxCount,
  projects = [],
  onAddProject,
  onDeleteProject,
}) {
  return (
    <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
      <div className="h-16 border-b flex items-center px-5 gap-3 shrink-0">
        <Activity size={20} className="text-cyan-500" />
        <div>
          <div className="font-semibold text-sm text-gray-900 leading-tight">
            Project Pulse
          </div>
          <div className="text-[10px] text-gray-400 mt-0.5">
            Messenger → Projects
          </div>
        </div>
      </div>
      
      <div className="p-3 shrink-0">
        <button
          onClick={() => setShowInbox(true)}
          className={`w-full flex items-center justify-between rounded-lg px-3 py-2 transition
          ${
            showInbox
              ? "bg-cyan-50 border border-cyan-300 text-cyan-700 font-medium"
              : "hover:bg-gray-50 text-gray-600"
          }`}
        >
          <span className="flex items-center gap-2 text-xs font-semibold">
            <InboxIcon size={15} />
            Inbox
          </span>
          <span className="text-[10px] bg-gray-100 rounded-full px-2 py-0.5 font-bold">
            {inboxCount}
          </span>
        </button>
      </div>

      <div className="px-4 mt-2 mb-2 text-[10px] uppercase text-gray-400 font-bold tracking-wider shrink-0">
        Projects
      </div>

      <div className="flex-1 px-2 space-y-1 overflow-y-auto">
        {projects.map((project) => (
          <button
            key={project.name}
            onClick={() => {
              setShowInbox(false);
              setActiveProject(project.name);
            }}
            className={`w-full flex items-center justify-between rounded-lg px-3 py-2 transition group
            ${
              !showInbox && activeProject === project.name
                ? "bg-cyan-50 border border-cyan-300 text-cyan-700 font-medium"
                : "hover:bg-gray-50 text-gray-600"
            }`}
          >
            <span className="flex items-center gap-2 text-xs">
              <FolderKanban size={14} className="text-gray-400" />
              {project.name}
            </span>

            <div className="flex items-center gap-1.5 shrink-0">
              <span className="text-[10px] text-gray-400 font-medium group-hover:hidden">
                {project.count}
              </span>

              <span
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteProject?.(project.name);
                }}
                className="hidden group-hover:flex items-center justify-center p-1 rounded hover:bg-rose-50 hover:text-rose-600 transition-colors"
                title="Удалить проект"
              >
                <Trash2 size={12} />
              </span>
            </div>
          </button>
        ))}
      </div>

      <div className="border-t p-3 bg-white shrink-0">
        <button
          onClick={onAddProject}
          className="w-full flex items-center justify-center gap-2 py-2 px-4 rounded-xl border border-dashed border-gray-200 text-xs font-semibold text-gray-500 hover:text-cyan-600 hover:border-cyan-200 hover:bg-cyan-50/50 transition-all active:scale-98"
        >
          <Plus size={14} />
          <span>New project</span>
        </button>
      </div>
    </aside>
  );
}