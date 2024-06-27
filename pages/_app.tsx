import "../styles/globals.css";
import type { AppProps } from "next/app";
import { HomeContextProvider } from "../context/Home";
import { BoardContextProvider } from "../context/Board";
import { TaskContextProvider } from "../context/Task";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <HomeContextProvider>
      <BoardContextProvider>
        <TaskContextProvider>
          <Component {...pageProps} />
        </TaskContextProvider>
      </BoardContextProvider>
    </HomeContextProvider>
  );
}

export default MyApp;
