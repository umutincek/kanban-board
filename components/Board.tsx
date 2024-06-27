import React from "react";
import { useBoardStateContext } from "../context/Board";
import { useHomeStateContext } from "../context/Home";
import { useTaskStateContext } from "../context/Task";
import {
  DragDropContext,
  Draggable,
  DraggableLocation,
  Droppable,
} from "react-beautiful-dnd";
import { IColumn } from "../interfaces";

const reorderColumnList = (
  sourceCol: IColumn,
  startIndex: number,
  endIndex: number
) => {
  const newTasks = sourceCol.tasks?.map((task) => task);
  if (newTasks) {
    const [removed] = newTasks.splice(startIndex, 1);
    newTasks.splice(endIndex, 0, removed);

    const newColumn = {
      ...sourceCol,
      tasks: newTasks,
    };

    return newColumn;
  }
};

const Board = () => {
  const { boardSelectedId, boards, setBoards } = useHomeStateContext();
  const { setViewTask, setDisplayAddTask } = useTaskStateContext();

  let completeBoardSelected = boards.find(
    (board) => board.id === boardSelectedId
  );

  const onDragEnd = async (
    source: { droppableId: string; index: number },
    destination: { droppableId: string; index: number },
    draggableId: string
  ) => {
    // If user tries to drop in an unknown destination
    if (!destination) return;

    // if the user drags and drops back in the same position
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    // If the user drops within the same column but in a different position
    const sourceCol = completeBoardSelected?.columns.find(
      (col) => col.id === source.droppableId
    );
    const destinationCol = completeBoardSelected?.columns.find(
      (col) => col.id === destination.droppableId
    );

    if (sourceCol && destinationCol) {
      if (sourceCol.id === destinationCol.id) {
        const newColumn = reorderColumnList(
          sourceCol,
          source.index,
          destination.index
        );

        const newBoards = boards.map((board) => {
          if (board.id === completeBoardSelected?.id) {
            const newColumns: IColumn[] = [];
            board.columns.forEach((col) => {
              if (col.id === newColumn?.id) {
                newColumns.push(newColumn);
              } else newColumns.push(col);
            });
            return { ...board, columns: newColumns };
          } else return board;
        });
        setBoards(newBoards);

        return;
      }
    } else return;

    // If the user moves from one column to another
    const startTask = sourceCol.tasks?.map((task) => task);
    const endTask = destinationCol.tasks?.map((task) => task);
    if (startTask && endTask) {
      const [removed] = startTask.splice(source.index, 1);
      const newStartCol = {
        ...sourceCol,
        tasks: startTask,
      };

      endTask.splice(destination.index, 0, removed);
      const newEndCol = {
        ...destinationCol,
        tasks: endTask,
      };

      const newBoards = boards.map((board) => {
        if (board.id === completeBoardSelected?.id) {
          const newColumns: IColumn[] = [];
          board.columns.forEach((col) => {
            if (col.id === newStartCol.id) {
              newColumns.push(newStartCol);
            } else if (col.id === newEndCol.id) {
              newColumns.push(newEndCol);
            } else newColumns.push(col);
          });
          return { ...board, columns: newColumns };
        } else return board;
      });
      setBoards(newBoards);

      let task = endTask.find((task) => task.id === draggableId);
      if (task) {
        task.status = destinationCol.name;
        task.columnId = destinationCol.id;
      }

      let res = await fetch("api/task", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...task }),
      });
      const newTask = await res.json();
    }
  };

  return (
    <div className="flex flex-col">
      <div className="ml-6 mt-3">
        <button
          onClick={() => {
            setDisplayAddTask(true);
          }}
          className={`h-12 w-[164px] flex justify-center items-center rounded-[24px] font-bold ${
            completeBoardSelected?.columns.length === 0
              ? "cursor-not-allowed bg-purple/30"
              : "bg-pink hover:bg-pinkHover"
          } text-white`}
        >
          + Add New Task
        </button>
      </div>
      <div className=" h-full flex p-6 overflow-x-scroll scrollbar">
        <DragDropContext
          onDragEnd={(e: any) =>
            onDragEnd(e.source, e.destination, e.draggableId)
          }
        >
          {completeBoardSelected?.columns.map((col, index) => (
            <div
              key={col.id}
              className="min-w-[320px] w-[320px] bg-darkGrey rounded-xl p-5 flex flex-col mr-6"
            >
              <div className="h-[15px] flex items-center mb-6">
                <p className="font-bold text-white tracking-S text-hXL">
                  {col.name} ({col.tasks?.length})
                </p>
              </div>
              <Droppable droppableId={col.id} type={"COLUMN"}>
                {(droppableProvided, droppableSnapshot) => (
                  <div
                    className="w-full flex flex-col"
                    ref={droppableProvided.innerRef}
                    {...droppableProvided.droppableProps}
                  >
                    {col.tasks?.map((task, index) => {
                      return (
                        <Draggable
                          key={task.id}
                          draggableId={`${task.id}`}
                          index={index}
                        >
                          {(draggableProvided, draggableSnapshot) => (
                            <div
                              ref={draggableProvided.innerRef}
                              {...draggableProvided.draggableProps}
                              {...draggableProvided.dragHandleProps}
                              onClick={() =>
                                setViewTask({ display: true, task: task })
                              }
                              className={`w-full flex flex-col bg-${task.color} group px-4 py-6 cursor-pointer mb-5 last:mb-0 rounded-lg`}
                            >
                              <p className="text-hM font-semibold text-white mb-2">
                                {task.title}
                              </p>
                              <p className="w-full font-normal text-bL text-white leading-L mb-2">
                                {task.description}
                              </p>
                            </div>
                          )}
                        </Draggable>
                      );
                    })}
                    <div className="w-full h-[20px] bg-transparent" />
                    {droppableProvided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          ))}
        </DragDropContext>
      </div>
    </div>
  );
};

export default Board;
