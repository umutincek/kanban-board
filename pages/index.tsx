import { GetServerSideProps } from "next";
import { useEffect } from "react";
import Layout from "../components/Layout";
import { useHomeStateContext } from "../context/Home";
import { useBoardStateContext } from "../context/Board";
import { IBoard } from "../interfaces";
import { getBoards } from "./api/board";

type Props = {
  boards: IBoard[];
};

const IndexPage = ({ boards }: Props) => {
  const { setBoards, setBoardSelectedId } = useHomeStateContext();
  const { setDisplayAddEditBoard } = useBoardStateContext();

  useEffect(() => {
    if (boards) {
      setBoards(boards);
    }
  }, [boards]);

  return (
    <Layout title="Kanban Home">
      <div className="width-full h-full flex items-center justify-center">
        <button
          onClick={() => {
            setDisplayAddEditBoard({ display: true, mode: "ADD" });
          }}
          className={`h-12 w-[164px] flex justify-center items-center rounded-[24px] font-bold bg-purple hover:bg-purpleHover text-white`}
        >
          + Add New Board
        </button>
      </div>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const boards = await getBoards();
  const updatedboards = JSON.parse(JSON.stringify(boards));
  return { props: { boards: updatedboards } };
};

export default IndexPage;
