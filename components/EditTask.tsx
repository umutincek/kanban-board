import React, { useEffect } from "react";
import { toast } from "react-hot-toast";
import { useHomeStateContext } from "../context/Home";
import { useTaskStateContext } from "../context/Task";
import { IColumn, Task } from "../interfaces";

const EditTask = () => {
  const {
    displayEditTask,
    setDisplayEditTask,
    editTaskInputs,
    setEditTaskInputs,
    editTaskErrors,
    displayEditTaskSelectColumn,
    setDisplayEditTaskSelectColumn,
    checkEditTaskFormErrors,
  } = useTaskStateContext();
  const { boards, setBoards, boardSelectedId } = useHomeStateContext();
  let completeBoardSelected = boards.find(
    (board) => board.id === boardSelectedId
  );

  useEffect(() => {
    if (displayEditTask.task) {
      setEditTaskInputs({
        title: displayEditTask.task.title,
        description: displayEditTask.task.description,
        status: {
          value: displayEditTask.task.status,
          columnId: displayEditTask.task.columnId,
        },
      });
    }
  }, []);

  const editTask = async (status: { value: string; columnId: string }) => {
    const task = {
      id: displayEditTask.task?.id,
      title: editTaskInputs.title,
      description: editTaskInputs.description,
      status: status.value,
      columnId: status.columnId,
    };

    let res = await fetch("api/task", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(task),
    });
    const newTask = await res.json();

    const newBoards = boards.map((board) => {
      if (board.id === boardSelectedId) {
        let newTasks: Task[] = [];
        const newColumns: IColumn[] = [];
        board.columns.forEach((col) => {
          newTasks = [];
          if (
            col.id === newTask[0].columnId &&
            col.id === displayEditTask.task?.columnId
          ) {
            col.tasks?.forEach((task) => {
              if (task.id === newTask[0].id) {
                newTasks.push(newTask[0]);
              } else {
                newTasks.push(task);
              }
            });
            newColumns.push({ ...col, tasks: newTasks });
          } else if (col.id === newTask[0].columnId) {
            col.tasks?.forEach((task) => newTasks.push(task));
            newTasks.push(newTask[0]);
            newColumns.push({ ...col, tasks: newTasks });
          } else if (col.id === displayEditTask.task?.columnId) {
            col.tasks?.forEach((task) => {
              if (task.id !== newTask[0].id) {
                newTasks.push(task);
              }
            });
            newColumns.push({ ...col, tasks: newTasks });
          } else newColumns.push({ ...col });
        });
        return { ...board, columns: newColumns };
      } else return { ...board };
    });
    setBoards(newBoards);
    setDisplayEditTask({ display: false, task: null });
    toast.success(`Task has been edited`);
  };
  return (
    <>
      <div
        onClick={() => setDisplayEditTask({ display: false, task: null })}
        className="w-screen h-screen absolute bg-black/50 z-20 top-0"
      />
      <div className="w-[480px] min-h-[585px] flex flex-col p-8 rounded-md bg-white dark:bg-darkGrey absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 z-20">
        <p className="text-hL font-bold dark:text-white">Edit Task</p>
        <div className="w-full h-[68px] flex flex-col justify-between my-6">
          <label
            htmlFor="title"
            className="flex items-center font-bold text-bL text-mediumGrey dark:text-white"
          >
            Title
            {editTaskErrors.title && (
              <span className="text-bL text-red ml-2">Required</span>
            )}
          </label>
          <input
            value={editTaskInputs.title}
            onChange={(e) =>
              setEditTaskInputs({ ...editTaskInputs, title: e.target.value })
            }
            className="w-full h-[40px] px-4 py-2 text-bL dark:bg-darkGrey dark:text-white border border-mediumGrey/25 focus:border-purple focus:border-2 focus:px-[15px] outline-0 rounded"
            id="task_title"
            name="title"
          />
        </div>
        <div className="w-full h-[142px] flex flex-col justify-between">
          <label
            htmlFor="description"
            className="flex items-center font-bold text-bL text-mediumGrey dark:text-white"
          >
            Description
            {editTaskErrors.description && (
              <span className="text-bL text-red ml-2">Required</span>
            )}
          </label>
          <textarea
            value={editTaskInputs.description}
            onChange={(e) =>
              setEditTaskInputs({
                ...editTaskInputs,
                description: e.target.value,
              })
            }
            className="w-full h-[112px] px-4 py-2 text-bL dark:bg-darkGrey dark:text-white border border-mediumGrey/25 focus:border-purple focus:border-2 focus:px-[15px] outline-0 rounded resize-none"
            id="task_description"
            name="description"
          />
        </div>

        <div className="w-full h-[68px] flex flex-col justify-between my-6 relative">
          <p className="font-bold text-bL text-mediumGrey dark:text-white">
            Status
          </p>
          <div
            onClick={() => setDisplayEditTaskSelectColumn(true)}
            className={`w-full h-10 flex items-center justify-between px-4 py-2 border border-mediumGrey/25 hover:border-purple ${
              false ? "border-purple" : ""
            } rounded cursor-pointer`}
          >
            <p className="text-bL dark:text-white">
              {editTaskInputs.status.value}
            </p>
            <svg
              className={`${displayEditTaskSelectColumn ? "rotate-180" : ""}`}
              width="10"
              height="7"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke="#635FC7"
                strokeWidth="2"
                fill="none"
                d="m1 1 4 4 4-4"
              />
            </svg>
          </div>
          {displayEditTaskSelectColumn && (
            <div className="w-[416px] bg-white dark:bg-darkBg flex flex-col absolute top-[75px] z-10 rounded-lg shadow-[0_10px_20px_rgba(54,78,126,0.25)] closeModalSelectColumnOff">
              {completeBoardSelected?.columns.map((col) => (
                <div
                  key={col.id}
                  onClick={() => {
                    setEditTaskInputs({
                      ...editTaskInputs,
                      status: { value: col.name, columnId: col.id },
                    });
                    setDisplayEditTaskSelectColumn(false);
                  }}
                  className="w-full h-[50px] flex items-center group hover:bg-purple cursor-pointer hover:first:rounded-t-lg hover:last:rounded-b-lg px-4"
                >
                  <p className="text-bL text-mediumGrey group-hover:text-white">
                    {col.name}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
        <button
          onClick={() => {
            let errors = checkEditTaskFormErrors();
            if (!errors) {
              editTask(editTaskInputs.status);
            }
          }}
          className="h-10 w-full rounded-[20px] font-bold bg-purple hover:bg-purpleHover text-white text-bL"
        >
          Edit Task
        </button>
      </div>
    </>
  );
};

export default EditTask;
