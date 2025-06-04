import React, { createContext, useState } from "react";

const ModalContext = createContext();

const ModalProvider = ({ children }) => {
  const [modalType, setModalType] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState({});

  const [isCalendarModal, setIsCalendarModal] = useState(false);
  const [modalPosition, setModalPosition] = useState({
    x: "",
    y: "",
  });

  return (
    <ModalContext.Provider
      value={{
        modalType,
        setModalType,
        isModalOpen,
        setIsModalOpen,
        selectedTemplate,
        setSelectedTemplate,
        isCalendarModal,
        setIsCalendarModal,
        modalPosition,
        setModalPosition,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export { ModalContext, ModalProvider };
