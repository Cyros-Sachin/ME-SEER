import React, { useContext, useState } from "react";
import { AiOutlineClose } from "react-icons/ai"; // Importing close icon
import { useSidebarTracing } from "../SidebarAdvanced/contexts/SidebarTracing";
import { ModalContext } from "../ModalComponent/context/ModalContext";
import axios from "axios";
import { toast } from "react-toastify";

const SubspaceEditModal = () => {
  const { spaceIdSelected, subspaces, setSubSpaces } = useSidebarTracing();
  const { setIsModalOpen } = useContext(ModalContext);
  const [isUpdateMode, setIsUpdateMode] = useState(false);
  const [selectedSubspaceIndex, setSelectedSubspaceIndex] = useState(null);
  const [subspaceName, setSubspaceName] = useState("");

  const handleSubspaceClick = (index) => {
    setIsUpdateMode(true);
    setSelectedSubspaceIndex(index);
    setSubspaceName(subspaces[index]?.name || "");
  };

  const handleReset = () => {
    setIsUpdateMode(false);
    setSelectedSubspaceIndex(null);
    setSubspaceName("");
  };

  const handleUpdate = async () => {
    if (
      !subspaceName ||
      !spaceIdSelected ||
      !localStorage.getItem("userId") ||
      selectedSubspaceIndex === null
    ) {
      return;
    }
    try {
      const payload = {
        space_id: spaceIdSelected,
        user_id: localStorage.getItem("userId"),
        name: subspaceName,
      };
      const subspaceId = subspaces[selectedSubspaceIndex].subspace_id;
      const response = await axios.put(
        `https://meseer.com/dog/subspaces/${subspaceId}`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      let updatedSubspaces = [...subspaces];
      updatedSubspaces[selectedSubspaceIndex] = {
        ...updatedSubspaces[selectedSubspaceIndex],
        name: subspaceName,
      };
      setSubSpaces(updatedSubspaces);
      toast(`Subspace Updated`);
    } catch (error) {
      console.error("Error updating subspace:", error);
    }
  };

  const handleDelete = async () => {
    if (selectedSubspaceIndex === null || !localStorage.getItem("userId")) {
      return;
    }
    try {
      const subspaceId = subspaces[selectedSubspaceIndex]?.subspace_id;
      const userId = localStorage.getItem("userId");

      await axios.delete(
        `https://meseer.com/dog/subspaces/${subspaceId}/${userId}`
      );

      const filteredSubspaces = subspaces.filter(
        (_, index) => index !== selectedSubspaceIndex
      );

      setSubSpaces(filteredSubspaces);
      toast(`Subspace Deleted`);
      handleReset();
    } catch (error) {
      console.error("Error deleting subspace:", error);
    }
  };

  const handleSubmit = async () => {
    if (!subspaceName || !spaceIdSelected || !localStorage.getItem("userId")) {
      return;
    }
    try {
      const payload = {
        space_id: spaceIdSelected,
        user_id: localStorage.getItem("userId"),
        name: subspaceName,
        icon: "asdas",
      };
      const response = await axios.post(
        "https://meseer.com/dog/subspaces",
        payload,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      let newObj = {
        icon: null,
        name: subspaceName,
        space_id: spaceIdSelected,
        subspace_id: response.data.subspace_id,
        user_id: localStorage.getItem("userId"),
      };
      setSubSpaces([...subspaces, newObj]);
      toast(`Subspace Added`);
    } catch (error) {
      console.error("Error adding subspace:", error);
    }
  };

  return (
    <div className="p-4 w-[700px] h-[400px] bg-[#2e2c2c] text-white rounded-lg shadow-lg relative border border-gray-700">
      <button
        onClick={() => setIsModalOpen(false)}
        className="absolute top-2 right-2 p-2 rounded-full hover:bg-gray-800 transition"
      >
        <AiOutlineClose className="w-5 h-5 text-gray-300 hover:text-white" />
      </button>
      <div className="flex h-full">
        <div className="w-2/4 p-2 flex flex-col border-r border-gray-600">
          <div className="pb-2 border-b border-gray-500 text-sm font-light">
            Subspaces
          </div>
          <div className="overflow-auto max-h-[320px] scrollbar">
            {subspaces?.map((subspace, index) => (
              <div
                key={index}
                onClick={() => handleSubspaceClick(index)}
                className={`text-xs ${
                  index !== 0 ? "mt-2" : "mt-4"
                } hover:bg-gray-700 p-1 pl-2 cursor-pointer rounded-md`}
              >
                {subspace.name}
              </div>
            ))}
          </div>
        </div>
        <div className="w-full ml-4 p-4 rounded-lg text-xs">
          <div className="text-sm font-semibold text-gray-300 mb-2">
            {isUpdateMode ? "Updating Subspace" : "Creating New Subspace"}
          </div>
          <label className="mt-4 block text-sm font-medium text-gray-400">
            Subspace
          </label>
          <input
            type="text"
            className="mt-1 p-2 border border-gray-600 bg-black text-white rounded w-full focus:outline-none focus:ring-1 focus:ring-gray-400"
            value={subspaceName}
            onChange={(e) => setSubspaceName(e.target.value)}
          />
          <div className="mt-4 flex justify-end space-x-2">
            <button
              onClick={handleReset}
              className="px-4 py-2 bg-gray-700 text-gray-300 rounded hover:bg-gray-600"
            >
              Reset
            </button>
            {isUpdateMode ? (
              <>
                <button
                  onClick={handleUpdate}
                  className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-400"
                >
                  Update
                </button>
                <button
                  onClick={handleDelete}
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-400"
                >
                  Delete
                </button>
              </>
            ) : (
              <button
                onClick={handleSubmit}
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-400"
              >
                Submit
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubspaceEditModal;
