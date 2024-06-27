import React, { useEffect, useState } from "react";
import ellipsis from "../public/assets/icon-vertical-ellipsis.svg";
import Image from "next/image";
import { useHomeStateContext } from "../context/Home";
import { useBoardStateContext } from "../context/Board";
import { useRouter } from "next/router";

const Header = () => {
  const {
    boardSelectedId,
    setBoardSelectedId,
    boards,
    updateBoardModal,
    setUpdateBoardModal,
  } = useHomeStateContext();
  const { setDisplayAddEditBoard, setDisplayDeleteModal } =
    useBoardStateContext();

  const router = useRouter();

  let completeBoardSelected = boards.find(
    (board) => board.id === boardSelectedId
  );

  const [selectedBoardId, setSelectedBoardId] = useState<any>(
    router?.query?.id ? boardSelectedId : ""
  );

  return (
    <div className="flex flex-row items-center justify-start h-[9.5%]">
      <div className="w-[100%] h-full flex justify-between items-center py-5 px-8">
        <select
          className="block w-[30%] px-4 py-2 bg-transparent border-none text-hXL font-bold text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={selectedBoardId}
          onChange={(e) => {
            setSelectedBoardId(e.target.value);
            setBoardSelectedId(e.target.value);
            router.push(`/${e.target.value}`);
          }}
        >
          <option value="">Choose board</option>
          {boards.map((board) => (
            <option value={board.id} key={board.id}>
              {board.name}
            </option>
          ))}
        </select>
        <div className="w-[193px] flex justify-between items-center flex-row relative">
          <button
            onClick={() => {
              setDisplayAddEditBoard({ display: true, mode: "ADD" });
            }}
            className={`h-12 w-[164px] flex justify-center items-center rounded-[24px] font-bold bg-purple hover:bg-purpleHover text-white`}
          >
            + Add New Board
          </button>
          {boardSelectedId && (
            <Image
              src={ellipsis}
              alt="ellipsis"
              className="h-[20px] cursor-pointer closeModalUpdateBoardOff"
              onClick={() => setUpdateBoardModal(!updateBoardModal)}
            />
          )}
          {updateBoardModal && boardSelectedId && (
            <div className="w-[192px] h-[94px] bg-white dark:bg-darkBg flex flex-col justify-between p-4 absolute top-[62px] z-10 rounded-lg shadow-[0_10px_20px_rgba(54,78,126,0.25)] closeModalUpdateBoardOff">
              <p
                onClick={() => {
                  setDisplayAddEditBoard({ display: true, mode: "EDIT" });
                  setUpdateBoardModal(false);
                }}
                className="h-[24px] text-mediumGrey text-bL cursor-pointer hover:underline"
              >
                Edit Board
              </p>
              <p
                onClick={() => {
                  setDisplayDeleteModal({
                    display: true,
                    mode: "board",
                    id: boardSelectedId,
                  });
                  setUpdateBoardModal(false);
                  router.push("/");
                }}
                className="h-[24px] text-bL text-red cursor-pointer hover:underline"
              >
                Delete Board
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
