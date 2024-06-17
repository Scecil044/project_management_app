import { useEffect, useState } from "react";
import { useToast } from "@chakra-ui/react";
import { LuAsterisk } from "react-icons/lu";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import AssignUsers from "../AssignUsers";

export default function CreateTask({
  setFormData,
  formData,
  setOpenTaskModal,
  openCreateTaslModal,
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const toast = useToast();
  const [openAssignUserModal, setOpenAssignUserModal] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      setIsError(false);
      const res = await fetch("/api/v1/tasks", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
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
        setIsLoading(false);
        setIsError(false);
        toast({
          title: "Registration successful.",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "top-right",
        });
        setOpenTaskModal(false);
      }
    } catch (error) {
      setIsLoading(false);
      setIsError(error.message);
      console.log(error);
    }
  };

  const handleEditor = (e, editor) => {
    const data = editor.getData();
    setFormData({
      ...formData,
      description: data,
    });
  };

  console.log(formData);
  return (
    <div className="inset-0 fixed bg-black/50 w-full h-full flex items-center justify-center z-40">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-5 w-[80%] md:w-[50%] text-sm md:ml-20 flex flex-col gap-3"
      >
        <div className="my-2">
          <h1 className="font-semibold text-neutral-400 text-xl md:text-2xl">
            Create Task
          </h1>
        </div>
        <div className="grid grid-cols-2 gap-5">
          <div className="flex flex-col gap-1">
            <div>
              <span className="flex">
                <label>Title</label>
                <LuAsterisk className="h-2 w-2 text-red-600" />
              </span>
            </div>
            <input
              type="text"
              placeholder="Title"
              id="title"
              className={`border border-gray-400 p-2 focus:outline-none focus:border-gray-400 `}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
            />
          </div>

          <div className="flex flex-col gap-1">
            <div>
              <span className="flex">
                <label>Status</label>
                <LuAsterisk className="h-2 w-2 text-red-600" />
              </span>
            </div>
            <select
              id="status"
              className={`border border-gray-400 p-2 focus:outline-none focus:border-gray-400 `}
              onChange={(e) =>
                setFormData({ ...formData, status: e.target.value })
              }
            >
              <option value="">Select</option>
              <option value="pending">pending</option>
              <option value="started">started</option>
              <option value="completed">completed</option>
            </select>
          </div>

          <div>
            <button
              type="button"
              onClick={() => {
                setOpenAssignUserModal(true);
              }}
              className="text-blue-600 font-semibold"
            >
              Assign users?
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-0">
          <div>
            <span className="flex">
              <label>Description</label>
              <LuAsterisk className="h-2 w-2 text-red-600" />
            </span>
          </div>
          <CKEditor
            editor={ClassicEditor}
            id="text"
            data={formData?.description || "Enter description text"}
            onReady={(editor) => {}}
            onChange={(event, editor) => {
              handleEditor(event, editor);
            }}
            onBlur={(event, editor) => {
              console.log("Blur.", editor);
            }}
            onFocus={(event, editor) => {
              console.log("Focus.", editor);
            }}
          />
        </div>

        <div className="flex items-center float-end gap-3">
          <button
            type="button"
            onClick={() => setOpenTaskModal(false)}
            className="bg-gradient-to-tr from-appBlue to-appRed py-2 text-white px-20"
          >
            Cancel
          </button>
          <button className=" bg-appRed py-2 text-white px-20">Create</button>
        </div>
      </form>

      {openAssignUserModal && (
        <AssignUsers
          setFormData={setFormData}
          formData={setFormData}
          openAssignUserModal={openAssignUserModal}
          setOpenAssignUserModal={setOpenAssignUserModal}
        />
      )}
    </div>
  );
}
