import React, { useState } from "react";
import { useUserInformation } from "../../../Login/context/UserInformationContext";

const ChangePassword = () => {
  const { userInformation, setUserInformation } = useUserInformation();

  // States to hold the old, new, and confirm passwords
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Handle input changes
  const handleOldPasswordChange = (e) => setOldPassword(e.target.value);
  const handleNewPasswordChange = (e) => setNewPassword(e.target.value);
  const handleConfirmPasswordChange = (e) => setConfirmPassword(e.target.value);

  // Password validation function
  const validatePassword = (password) => {
    // Check if password meets basic security requirements (minimum length, etc.)
    const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return regex.test(password);
  };

  // Handle form submission (change password)
  const handleSubmit = () => {
    if (newPassword !== confirmPassword) {
      setErrorMessage("New password and confirmation do not match.");
      return;
    }

    // Check if the old password is correct
    if (oldPassword !== userInformation.password) {
      setErrorMessage("The old password is incorrect.");
      return;
    }

    // Check if new password meets the validation criteria
    if (!validatePassword(newPassword)) {
      setErrorMessage(
        "New password must be at least 8 characters long and contain both letters and numbers."
      );
      return;
    }

    // Check if the new password is the same as the old password
    if (newPassword === oldPassword) {
      setErrorMessage("New password cannot be the same as the old password.");
      return;
    }

    // Update the password
    setUserInformation({ ...userInformation, password: newPassword });
    setErrorMessage(""); // Clear any previous error messages
    alert("Password updated successfully!");
  };

  // Disable submit button if there are errors or fields are empty
  const isSubmitDisabled =
    !oldPassword || !newPassword || !confirmPassword || errorMessage;

  return (
    <div className="w-full mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
        Change Your Password
      </h2>

      {/* Error message */}
      {errorMessage && (
        <p className="text-red-500 text-center mb-4">{errorMessage}</p>
      )}

      {/* Old password input */}
      <div className="mb-4">
        <input
          type="password"
          value={oldPassword}
          onChange={handleOldPasswordChange}
          placeholder="Enter your old password"
          className="w-full px-4 py-2 text-lg border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300"
        />
      </div>

      {/* New password input */}
      <div className="mb-4">
        <input
          type="password"
          value={newPassword}
          onChange={handleNewPasswordChange}
          placeholder="Enter your new password"
          className="w-full px-4 py-2 text-lg border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300"
        />
      </div>

      {/* Confirm password input */}
      <div className="mb-4">
        <input
          type="password"
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
          placeholder="Confirm your new password"
          className="w-full px-4 py-2 text-lg border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300"
        />
      </div>

      {/* Submit button */}
      <button
        onClick={handleSubmit}
        disabled={isSubmitDisabled}
        className={`w-full py-2 text-lg font-semibold text-white rounded-md transition duration-200 ${
          isSubmitDisabled
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        }`}
      >
        Submit
      </button>
    </div>
  );
};

export default ChangePassword;
