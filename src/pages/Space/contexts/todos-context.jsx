import React, { createContext, useContext, useEffect, useState } from "react";
import { nanoid } from "nanoid";
import axios from "axios";
import { UserClickTracingContext } from "../../../common-components/sidebar/contexts/user-click-tracing-context";
import useUserId from "../../../global-custom-hooks/useUserId";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";
import eventController from "./controllers";
import { todosWordpds } from "./todo-wordpad-sampleData";
import { useSidebarTracing } from "../../../common-components/SidebarAdvanced/contexts/SidebarTracing";

const TodoContext = createContext();

const TodoProvider = ({ children }) => {
  const pathname = useLocation().pathname;
  const userId = useUserId() || localStorage.getItem("userId");
  // const [todos, setTodos] = useState(todosWordpds);
  const [todos, setTodos] = useState([]);
  // const { spaceIdSelected, subSpaceIdSelected, subSpaceClicked } = useContext(
  //   UserClickTracingContext
  // );

  const {
    spaceSelected,
    setSpaceSelected,
    spaceIdSelected,
    setSpaceIdSelected,
    subSpaceIdSelected,
    setSubSpaceIdSelected,

    userSpaceSelected,
    setUserSpaceSelected,
    userSubSpaceSelected,
    setUserSubspaceSelected,
    spaces,
    setSpaces,
    subspaces,
    setSubSpaces,
    spaceOptions,
    setSpaceOptions,
  } = useSidebarTracing();

  // asdasa
  // useEffect(() => {
  //   eventController.fetchTodos(
  //     axios,
  //     userId,
  //     subSpaceClicked,
  //     pathname,
  //     setTodos
  //   );
  // }, [subSpaceClicked]);

  useEffect(() => {
    eventController.fetchTodos(
      axios,
      userId,
      subSpaceIdSelected,
      pathname,
      setTodos
    );

    // console.log(subSpaceIdSelected);
  }, [subSpaceIdSelected]);

  useEffect(() => {
    console.log(todos);
  }, [todos]);

  return (
    <TodoContext.Provider value={{ todos, setTodos }}>
      {children}
    </TodoContext.Provider>
  );
};

export { TodoContext, TodoProvider };
