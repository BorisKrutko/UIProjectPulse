import React, { useState, useMemo } from "react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Board from "./components/Board";
import Inbox from "./components/Inbox";
import TaskModal from "./components/TaskModal";
import { INITIAL_TASKS } from "./data/tasks";

export default function App() {
  const [tasks, setTasks] = useState(INITIAL_TASKS);

  // Динамический стейт проектов
  const [projects, setProjects] = useState([
    { name: "NOXS" },
    { name: "Website" },
    { name: "Mobile" },
  ]);

  const [filter, setFilter] = useState("Все");
  const [activeProject, setActiveProject] = useState("NOXS");
  const [showInbox, setShowInbox] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  // 1. Создание нового проекта
  const handleAddProject = () => {
    const projectName = prompt("Введите название нового проекта:");
    if (!projectName) return;

    const trimmedName = projectName.trim();
    if (!trimmedName) return;

    const exists = projects.some(
      (p) => p.name.toLowerCase() === trimmedName.toLowerCase()
    );

    if (exists) {
      alert("Проект с таким именем уже существует!");
      return;
    }

    setProjects((prev) => [...prev, { name: trimmedName }]);
    setActiveProject(trimmedName);
    setShowInbox(false);
  };

  // 2. Удаление проекта и возвращение его задач в Inbox
  const handleDeleteProject = (projectName) => {
    const confirmDelete = window.confirm(
      `Вы уверены, что хотите удалить проект "${projectName}"? Все его задачи будут возвращены в Inbox.`
    );
    if (!confirmDelete) return;

    // Удаляем проект из стейта
    setProjects((prev) => prev.filter((p) => p.name !== projectName));

    // Возвращаем задачи в статус Inbox (project = null)
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.project === projectName ? { ...task, project: null } : task
      )
    );

    // Если удалили активный в данный момент проект, перекидываем в Inbox
    if (activeProject === projectName) {
      setShowInbox(true);
    }
  };

  // 3. Динамический подсчет количества задач для каждого проекта в сайдбаре
  const projectsWithCounts = useMemo(() => {
    return projects.map((project) => {
      const count = tasks.filter((t) => t.project === project.name).length;
      return {
        name: project.name,
        count: count,
      };
    });
  }, [projects, tasks]);

  // 4. Формирование списка проектов для кнопок-чипов в карточках Inbox
  const projectsListForInbox = useMemo(() => {
    return projects.map((p) => ({
      id: p.name,
      name: p.name,
    }));
  }, [projects]);

  // 5. Перенос задачи из Inbox в выбранный проект
  const handleConfirmTask = (taskId, selectedProjectId) => {
    updateTask(taskId, {
      project: selectedProjectId,
      status: "Todo", // Стартовая колонка для доски (Board)
    });
  };

  // 6. Отклонение/удаление задачи из Inbox
  const handleRejectTask = (taskId) => {
    setTasks((prev) => prev.filter((task) => task.id !== taskId));
  };

  // 7. Фильтрация отображаемых задач
  const visibleTasks = useMemo(() => {
    return tasks.filter((task) => {
      if (showInbox) {
        return task.project === null || task.project === undefined;
      }
      return (
        task.project === activeProject &&
        (filter === "Все" || task.source === filter)
      );
    });
  }, [tasks, activeProject, filter, showInbox]);

  const updateTask = (id, updates) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, ...updates } : task
      )
    );
    setSelectedTask((prev) =>
      prev && prev.id === id ? { ...prev, ...updates } : prev
    );
  };

  return (
    <div className="w-full h-screen overflow-hidden bg-gray-50 flex text-gray-900">
      <Sidebar
        activeProject={activeProject}
        setActiveProject={setActiveProject}
        showInbox={showInbox}
        setShowInbox={setShowInbox}
        inboxCount={tasks.filter((t) => !t.project).length}
        projects={projectsWithCounts}
        onAddProject={handleAddProject}
        onDeleteProject={handleDeleteProject}
      />

      <main className="flex-1 flex flex-col min-w-0 h-full overflow-hidden relative">
        <Header
          activeProject={showInbox ? "Inbox" : activeProject}
          filter={filter}
          setFilter={setFilter}
        />

        {showInbox ? (
          <Inbox
            tasks={visibleTasks}
            onOpen={setSelectedTask}
            onConfirm={handleConfirmTask}
            onReject={handleRejectTask}
            projects={projectsListForInbox}
          />
        ) : (
          <Board
            tasks={visibleTasks}
            onOpen={setSelectedTask}
          />
        )}
      </main>

      {selectedTask && (
        <TaskModal
          task={selectedTask}
          updateTask={updateTask}
          onClose={() => setSelectedTask(null)}
        />
      )}
    </div>
  );
}