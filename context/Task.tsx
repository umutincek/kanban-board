import React, { createContext, useContext, useState } from "react";
import { Task, TaskContextType } from "../interfaces";

type TaskContextProviderProps = {
  children: React.ReactNode;
};

export const TaskContext = createContext({} as TaskContextType);

export const TaskContextProvider = ({ children }: TaskContextProviderProps) => {
  const [displayAddTask, setDisplayAddTask] = useState(false);
  const [displayAddTaskSelectColumn, setDisplayAddTaskSelectColumn] =
    useState(false);

  const [addTaskInputs, setAddTaskInputs] = useState({
    title: "",
    description: "",
    status: { value: "", columnId: "" },
    color: "",
  });
  const [addTaskErrors, setAddTaskErrors] = useState({
    title: false,
    description: false,
  });

  const [viewTask, setViewTask] = useState<{
    display: boolean;
    task: Task | null;
  }>({ display: false, task: null });
  const [displayViewTaskChangeColumn, setDisplayViewTaskChangeColumn] =
    useState(false);
  const [displayModalEditDeleteTask, setDisplayModalEditDeleteTask] =
    useState(false);

  const [displayEditTask, setDisplayEditTask] = useState<{
    display: boolean;
    task: Task | null;
  }>({ display: false, task: null });
  const [displayEditTaskSelectColumn, setDisplayEditTaskSelectColumn] =
    useState(false);
  const [editTaskInputs, setEditTaskInputs] = useState<{
    title: string;
    description: string;
    status: { value: string; columnId: string };
  }>({
    title: "",
    description: "",
    status: { value: "", columnId: "" },
  });
  const [editTaskErrors, setEditTaskErrors] = useState({
    title: false,
    description: false,
  });

  const checkEditTaskFormErrors = () => {
    let errors = false;
    let newErrors: { title: boolean; description: boolean } = {
      title: false,
      description: false,
    };

    if (editTaskInputs.title === "") {
      errors = true;
      newErrors.title = true;
    }
    if (editTaskInputs.description === "") {
      errors = true;
      newErrors.description = true;
    }

    setEditTaskErrors(newErrors);
    return errors;
  };

  const checkAddTaskFormErrors = () => {
    let errors = false;
    let newErrors: { title: boolean; description: boolean } = {
      title: false,
      description: false,
    };

    if (addTaskInputs.title === "") {
      errors = true;
      newErrors.title = true;
    }
    if (addTaskInputs.description === "") {
      errors = true;
      newErrors.description = true;
    }

    setAddTaskErrors(newErrors);
    return errors;
  };

  return (
    <TaskContext.Provider
      value={{
        displayAddTask,
        setDisplayAddTask,
        displayAddTaskSelectColumn,
        setDisplayAddTaskSelectColumn,
        addTaskInputs,
        setAddTaskInputs,
        checkAddTaskFormErrors,
        addTaskErrors,
        setAddTaskErrors,
        viewTask,
        setViewTask,
        displayViewTaskChangeColumn,
        setDisplayViewTaskChangeColumn,
        displayModalEditDeleteTask,
        setDisplayModalEditDeleteTask,
        displayEditTask,
        setDisplayEditTask,
        editTaskInputs,
        setEditTaskInputs,
        editTaskErrors,
        setEditTaskErrors,
        displayEditTaskSelectColumn,
        setDisplayEditTaskSelectColumn,
        checkEditTaskFormErrors,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTaskStateContext = () => useContext(TaskContext);
