import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";
import { editColumnViaBoard } from "./column";

export const getBoardById = async (id: string) => {
  const board = await prisma.board.findMany({
    where: {
      id,
    },
    include: {
      columns: {
        include: {
          tasks: true,
        }
      },
    },
  });
  return board;
}

export const getBoards = async () => {
  const boards = await prisma.board.findMany({
    include: {
      columns: {
        include: {
          tasks: true,
        }
      },
    }
  });
  return boards;
}

export const createBoard = async (reqBody: any) => {
  const newBoard = await prisma.board.create({
    data: {
      name: reqBody.name,
      columns: {
        create: reqBody.columns.map((column: any) => ({
          name: column.name,
        })),
      },
    },
  });
  const board = await getBoardById(newBoard.id);
  return board;
}

export const editBoard = async (reqBody: any) => {
  const updateBoard = await prisma.board.update({
    where: {
      id: reqBody.id,
    },
    data: {
      name: reqBody.name,
    }
  });
  const board = await getBoardById(reqBody.id);
  return board;
}

export const deleteBoard = async (boardId: string) => {
  const deleteBoard = await prisma.board.delete({
    where: {
      id: boardId,
    },
  });
  return deleteBoard;
}

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  try {
    switch (req.method) {
      case 'POST':
        const newBoard = await createBoard(req.body);
        return res.json(newBoard);
      case 'PUT':
        const updateBoard = await editBoard(req.body);
        const updateColumns = await editColumnViaBoard(req.body);
        return res.json({updateBoard, updateColumns});
      case 'DELETE':
        const deletedBoard = await deleteBoard(req.body.boardId);
        return res.json(deletedBoard);
      default:
        break;
    }
  } catch (error: any) {
    return res.status(500).json({ message: error.message })
  }
}