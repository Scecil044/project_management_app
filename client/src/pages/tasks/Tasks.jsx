import { useState, useEffect } from "react";
import AppLoader from "../../components/common/AppLoader";
import CreateTask from "../../components/common/app/CreateTask";
import { Link } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import DeleteModal from "../../components/common/DeleteModal";
import { FaUsers } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";
import { useToast } from "@chakra-ui/react";

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [isError, setIsError] = useState(false);
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [openDropDown, setOpenDropDown] = useState(false);
  const [formData, setFormData] = useState({
    contributors: [],
  });
  const [selectedTask, setSelectedTask] = useState(null);
  const [openCreateTaslModal, setOpenTaskModal] = useState(false);
  const [toggleDeleteModal, settoggleDeleteModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  console.log(selectedUser);
  const handleRemoveUser = async () => {
    try {
      setIsLoading(true);
      setIsError(false);
      console.log(selectedUser.userId);
      const res = await fetch(
        `/api/v1/tasks/${selectedUser.userId}/${selectedUser.taskId}`,
        {
          method: "PUT",
          headers: { "content-type": "application/json" },
        }
      );
      const data = await res.json();
      if (data.success === false) {
        setIsLoading(false);
        setIsError(data.message);
        toast({
          title: "Oops! something went wrong.",
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
          title: "Contributor removed.",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "top-right",
        });
        setIsLoading(false);
        setIsError(false);
        setOpenDropDown(false);
      }
    } catch (error) {
      setIsLoading(false);
      setIsError(error.message);
      console.log(error);
    }
  };
  useEffect(() => {
    const getTasks = async () => {
      try {
        setIsLoading(true);
        setIsError(false);
        const res = await fetch("/api/v1/tasks");
        const data = await res.json();
        if (data.success === false) {
          setIsLoading(false);
          setIsError(data.message);
          return;
        }
        if (res.ok) {
          setIsLoading(false);
          setIsError(false);
          setTasks(data);
        }
      } catch (error) {
        console.log(error);
        setIsError(error.message);
      }
    };
    getTasks();
  }, [openCreateTaslModal, toggleDeleteModal, openDropDown]);

  return (
    <>
      <div>
        <h1 className="text-xl md:text-2xl text-neutral-4 font-semibold00">
          Tasks
        </h1>
      </div>
      <div className="bg-white w-full p-5 shadow-lg rounded-md">
        <button
          onClick={() => setOpenTaskModal(true)}
          className="flex items-center gap-1 py-2 px-4 hover:bg-appRed hover:text-white shadow-md transition-all duration-300 my-2"
        >
          Create new
        </button>
        <div>
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-300 p-3">
                <th className="text-left uppercase text-neutral-500 px-3 py-1">
                  No.
                </th>
                <th className="text-left uppercase text-neutral-500 px-3 py-1">
                  Title
                </th>
                <th className="text-left uppercase text-neutral-500 px-3 py-1">
                  Status
                </th>
                <th className="text-left uppercase text-neutral-500 px-3 py-1">
                  Date Created
                </th>
                <th className="text-left uppercase text-neutral-500 px-3 py-1">
                  Created By
                </th>
                <th className="text-left uppercase text-neutral-500 px-3 py-1">
                  creator email
                </th>
                <th className="text-left uppercase text-neutral-500 px-3 py-1">
                  Contributors
                </th>
                <th className="text-left uppercase text-neutral-500 px-3 py-1">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task, index) => (
                <tr key={index}>
                  <td className="px-2">{(index += 1)}</td>
                  <td className="px-2">{task?.title}</td>
                  <td className="px-2">{task?.status}</td>
                  <td className="px-2">
                    {new Date(task?.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-2">
                    {task?.createdBy?.firstName} {task?.createdBy?.lastName}
                  </td>
                  <td className="px-2">{task?.createdBy?.email}</td>
                  <td className="px-2">{task?.contributors.length}</td>
                  <td className="px-2 flex items-center gap-2 relative">
                    <Link
                      to={`/app/view/task/${task?._id}`}
                      className="flex items-center gap-0.5"
                    >
                      <FiEdit className="h-5 w-5 text-blue-600" />
                      Edit
                    </Link>
                    <button
                      onClick={() => {
                        settoggleDeleteModal(true);
                        setSelectedTask({ id: task?._id, title: task?.title });
                      }}
                      className="flex items-center gap-0.5"
                    >
                      <MdDelete className="h-5 w-5 text-appRed" />
                      Delete
                    </button>
                    <button
                      onClick={() => {
                        setOpenDropDown(!openDropDown);
                      }}
                      className="flex items-center gap-0.5"
                    >
                      <FaUsers className="h-5 w-5 text-appRed" />
                      Members
                    </button>
                    {openDropDown && task?.contributors?.length > 0 && (
                      <div className="absolute top-4 right-5 bg-white p-2 w-[180px] shadow-md flex flex-col gap-1">
                        {task?.contributors?.map((member, index) => (
                          <div
                            key={index}
                            className="bg-blue-50 shadow-md p-1 rounded-2xl flex items-center gap-0.5"
                          >
                            {member?.firstName} {member?.lastName}
                            <button
                              onClick={() => {
                                setSelectedUser({
                                  userId: member._id,
                                  taskId: task._id,
                                });
                                handleRemoveUser();
                              }}
                              type="button"
                            >
                              <IoMdClose />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {isLoading && <AppLoader />}
        {openCreateTaslModal && (
          <CreateTask
            formData={formData}
            setFormData={setFormData}
            openCreateTaslModal={openCreateTaslModal}
            setOpenTaskModal={setOpenTaskModal}
          />
        )}
      </div>
      {toggleDeleteModal && (
        <DeleteModal
          toggleDeleteModal={toggleDeleteModal}
          settoggleDeleteModal={settoggleDeleteModal}
          selectedTask={selectedTask}
          module="tasks"
        />
      )}
    </>
  );
}
