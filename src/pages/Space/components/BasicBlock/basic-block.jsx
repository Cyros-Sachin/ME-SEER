import React, { useContext } from "react";

// css
import "./basic-block.css";

// controllers
import eventController from "./event-controller";
import contextController from "./context-controller/index";

/**
 * @file BasicBlock.jsx
 * @description This component renders a list of options for the user to select from. Each option can be clicked to trigger a corresponding event handler that performs specific actions based on the user's selection.
 *
 * @component
 * @param {Object} props - The properties passed to the component.
 * @param {number} props.todoIndex - Index of the current todo item for which the basic block options are being displayed.
 * @param {Function} props.setBasicBlocks - State setter function to manage the visibility of the basic block options.
 * @param {Function} props.setShowBasicBlock - State setter function to control whether the basic block options should be shown or hidden.
 *
 * @requires React
 * @requires useContext from React
 * @requires basic-block.css - Component-specific CSS for styling.
 * @requires eventController - Handles events triggered by user interactions with the basic block options.
 * @requires contextController - Provides access to the application-wide context, such as `BasicBlockContext` and `TodoContext`.
 *
 * @example
 * // Example usage of BasicBlock component
 * <BasicBlock
 *   todoIndex={0}
 *   setBasicBlocks={setBasicBlocks}
 *   setShowBasicBlock={setShowBasicBlock}
 * />
 *
 * @returns {JSX.Element} The rendered BasicBlock component.
 */

const BasicBlock = ({ todoIndex, setBasicBlocks, setShowBasicBlock }) => {
  const { todos, setTodos } = useContext(contextController.TodoContext);
  const { blockOptions } = useContext(contextController.NotepadContext);

  return (
    <div id="basic-block-id" className="basic-block-container">
      <div className="basic-block-main">
        {blockOptions.map((option) => (
          <div
            key={option.id}
            onClick={(e) =>
              eventController.handleNewItem(
                e,
                option,
                todos,
                setTodos,
                todoIndex,
                setBasicBlocks,
                setShowBasicBlock
              )
            }
            className="basic-block-options-container"
          >
            <img src={option.img} alt={option.alt} />
            <div>{option.option}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BasicBlock;
