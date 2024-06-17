import { useState } from "react";
import { useToast } from "@chakra-ui/react";

export default function DeleteModal({
  settoggleDeleteModal,
  toggleDeleteModal,
  selectedUser,
  module,
  selectedDepartment,
  selectedTask,
}) {
  const [isError, setisError] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const toast = useToast();

  const handleDelete = async () => {
    try {
      setisLoading(true);
      setisError(false);
      const userId = selectedUser?.id;
      const res = await fetch(`/api/v1/users/${userId}`, {
        method: "DELETE",
        headers: {
          "content-type": "application/json",
        },
      });
      const data = await res.json();
      if (data.success === false) {
        setisLoading(false);
        setisError(data.message);
        toast({
          title: "error",
          description: data?.message,
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top-right",
        });
        return;
      }
      if (res.ok) {
        toast({
          title: "successful.",
          description: "Record deleted",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "top-right",
        });
        setisLoading(false);
        setisError(false);
        settoggleDeleteModal(false);
      }
    } catch (error) {
      console.log(error);
      setisLoading(false);
      setisError(error.message);
    }
  };

  const departmentId = selectedDepartment?.id;
  console.log(departmentId);
  const handleDeleteDepartment = async () => {
    if (!departmentId) {
      console.error("Department ID is undefined");
      return;
    }
    try {
      setisLoading(true);
      setisError(false);

      const res = await fetch(`/api/v1/departments/${departmentId}`, {
        method: "DELETE",
        headers: {
          "content-type": "application/json",
        },
      });
      const data = await res.json();
      if (data.success === false) {
        setisLoading(false);
        setisError(data.message);
        toast({
          title: "error",
          description: data?.message,
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top-right",
        });
        return;
      }
      if (res.ok) {
        toast({
          title: "successful.",
          description: "Record deleted",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "top-right",
        });
        setisLoading(false);
        setisError(false);
        settoggleDeleteModal(false);
      }
    } catch (error) {
      console.log(error);
      setisLoading(false);
      setisError(error.message);
    }
  };

  const handleDeleteTask = async () => {
    try {
      setisLoading(true);
      setisError(false);
      const taskId = selectedTask?.id;
      const res = await fetch(`/api/v1/tasks/${taskId}`, {
        method: "DELETE",
        headers: {
          "content-type": "application/json",
        },
      });
      const data = await res.json();
      if (data.success === false) {
        setisLoading(false);
        setisError(data.message);
        toast({
          title: "error",
          description: data?.message,
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top-right",
        });
        return;
      }
      if (res.ok) {
        toast({
          title: "successful.",
          description: "Task deleted",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "top-right",
        });
        setisLoading(false);
        setisError(false);
        settoggleDeleteModal(false);
      }
    } catch (error) {
      console.log(error);
      setisLoading(false);
      setisError(error.message);
    }
  };
  return (
    <div className="fixed flex inset-0 items-center h-full w-full justify-center bg-black/50 text-sm">
      <div className="p-3 bg-white w-[80%] md:w-[25%] ml-8 md:ml-0 text-center">
        {module == "users" && (
          <>
            <h1>
              You are about to delete {selectedUser?.firstName}{" "}
              {selectedUser?.lastName} from the system
            </h1>
            <h2>Proceed anyway?</h2>
            <div className="my-3 flex items-center gap-5 justify-center">
              <button
                disabled={isLoading}
                onClick={() => settoggleDeleteModal(false)}
                type="button"
                className="py-2 px-6 hover:bg-appRed hover:text-white shadow-md disabled:cursor-not-allowed"
              >
                Cancel
              </button>
              <button
                disabled={isLoading}
                onClick={handleDelete}
                type="button"
                className="py-2 px-6 hover:bg-appRed hover:text-white shadow-md disabled:cursor-not-allowed"
              >
                Delete
              </button>
            </div>
          </>
        )}

        {module == "departments" && (
          <>
            <h1>
              You are about to delete {selectedDepartment?.departmentName} from
              the system
            </h1>
            <h2>Proceed anyway?</h2>
            <div className="my-3 flex items-center gap-5 justify-center">
              <button
                disabled={isLoading}
                onClick={() => settoggleDeleteModal(false)}
                type="button"
                className="py-2 px-6 hover:bg-appRed hover:text-white shadow-md disabled:cursor-not-allowed"
              >
                Cancel
              </button>
              <button
                disabled={isLoading}
                onClick={handleDeleteDepartment}
                type="button"
                className="py-2 px-6 hover:bg-appRed hover:text-white shadow-md disabled:cursor-not-allowed"
              >
                Delete
              </button>
            </div>
          </>
        )}

        {module == "tasks" && (
          <>
            <h1>
              You are about to delete {selectedTask?.title} from the system
            </h1>
            <h2>Proceed anyway?</h2>
            <div className="my-3 flex items-center gap-5 justify-center">
              <button
                disabled={isLoading}
                onClick={() => settoggleDeleteModal(false)}
                type="button"
                className="py-2 px-6 hover:bg-appRed hover:text-white shadow-md disabled:cursor-not-allowed"
              >
                Cancel
              </button>
              <button
                disabled={isLoading}
                onClick={handleDeleteTask}
                type="button"
                className="py-2 px-6 hover:bg-appRed hover:text-white shadow-md disabled:cursor-not-allowed"
              >
                Delete Task
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
