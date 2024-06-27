import { GetServerSideProps } from "next";
import { useEffect } from "react";
import Layout from "../components/Layout";
import Board from "../components/Board";
import { useHomeStateContext } from "../context/Home";
import { IBoard } from "../interfaces";
import { getBoards } from "./api/board";
import { useRouter } from "next/router";

type Props = {
  boards: IBoard[];
};

const BoardPage = ({ boards }: Props) => {
  const { setBoards, setBoardSelectedId, boardSelectedId } =
    useHomeStateContext();

  const router = useRouter();
  const selectedId = router.query.id;

  const now = new Date();

  useEffect(() => {
    if (selectedId) {
      setBoards(boards);
    }
  }, []);

  return (
    <Layout title="Kanban Home">
      <div className="width-full h-auto flex flex-row bg-lightBg">
        <Board />
      </div>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const boards = await getBoards();
  const updatedboards = JSON.parse(JSON.stringify(boards));
  return { props: { boards: updatedboards } };
};

export default BoardPage;
