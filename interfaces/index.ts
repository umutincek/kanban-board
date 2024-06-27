// You can include shared interfaces/types in a separate file
// and then use them in any component by importing them. For
// example, to import the interface below do:
//
// import { User } from 'path/to/interfaces';

  
  export type Task = {
    id: string
    title: string
    description: string
    status: string
    color: string
    columnId: string
  }
  
  export type IColumn = {
    id: string
    name: string
    tasks?: Task[]
    boardId: string | null
  }
  
  export type IBoard = {
    id: string
    name: string
    columns: IColumn[]
  }
  
  export type HomeContextType = {
    updateBoardModal: boolean;
    boards: IBoard[];
    boardSelectedId: string;
    setUpdateBoardModal: React.Dispatch<React.SetStateAction<boolean>>;
    setBoards: React.Dispatch<React.SetStateAction<IBoard[]>>;
    setBoardSelectedId: React.Dispatch<React.SetStateAction<string>>;
  };
  
  export type BoardContextType = {
    displayAddEditBoard: { display: boolean, mode: string }
    addBoardInputs: {
      name: string;
      columns: {
        id: string;
        name: string;
      }[];
    }
    editBoardInputs: {
      name: string;
      columns: {
        id: string;
        name: string;
      }[];
    }
    displayDeleteModal: { display: boolean, mode: string, id: string };
    setDisplayAddEditBoard: React.Dispatch<React.SetStateAction<{
      display: boolean;
      mode: string;
    }>>
    setAddBoardInputs: React.Dispatch<React.SetStateAction<{
      name: string;
      columns: {
        id: string;
        name: string;
      }[];
    }>>
    setEditBoardInputs: React.Dispatch<React.SetStateAction<{
      name: string;
      columns: {
        id: string;
        name: string;
      }[];
    }>>
    setDisplayDeleteModal: React.Dispatch<React.SetStateAction<{
      display: boolean;
      mode: string;
      id: string;
    }>>
    onChangeAddBoards: (columnId: string, columnName: string, deleting: string) => void;
    onChangeEditBoards: (columnId: string, columnName: string, mode: string) => void;
  };
  
  export type TaskContextType = {
    displayAddTask: boolean;
    displayAddTaskSelectColumn: boolean;
    addTaskInputs: { title: string, description: string, status: { value: string, columnId: string }, color: string };
    addTaskErrors: { title: boolean, description: boolean }
    viewTask: { display: boolean, task: Task | null }
    displayViewTaskChangeColumn: boolean
    displayModalEditDeleteTask: boolean
    displayEditTask: { display: boolean, task: Task | null }
    displayEditTaskSelectColumn: boolean;
    editTaskInputs: { title: string, description: string, status: { value: string, columnId: string } };
    editTaskErrors: { title: boolean, description: boolean }
    setDisplayAddTask: React.Dispatch<React.SetStateAction<boolean>>
    setDisplayAddTaskSelectColumn: React.Dispatch<React.SetStateAction<boolean>>
    setAddTaskInputs: React.Dispatch<React.SetStateAction<{
      title: string;
      description: string;
      status: { value: string, columnId: string };
      color: string;
    }>>
    setAddTaskErrors: React.Dispatch<React.SetStateAction<{ title: boolean, description: boolean, }>>
    setViewTask: React.Dispatch<React.SetStateAction<{
      display: boolean;
      task: Task | null;
    }>>
    setDisplayViewTaskChangeColumn: React.Dispatch<React.SetStateAction<boolean>>
    setDisplayModalEditDeleteTask: React.Dispatch<React.SetStateAction<boolean>>
    setDisplayEditTask: React.Dispatch<React.SetStateAction<{
      display: boolean;
      task: Task | null;
    }>>
    setDisplayEditTaskSelectColumn: React.Dispatch<React.SetStateAction<boolean>>
    setEditTaskInputs: React.Dispatch<React.SetStateAction<{
      title: string;
      description: string;
      status: {
        value: string;
        columnId: string;
      };
    }>>
    setEditTaskErrors: React.Dispatch<React.SetStateAction<{ title: boolean, description: boolean }>>
    checkAddTaskFormErrors: () => boolean
    checkEditTaskFormErrors: () => boolean
  };