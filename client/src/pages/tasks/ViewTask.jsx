import { useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { LuAsterisk } from "react-icons/lu";
import AssignUsers from "../../components/common/AssignUsers";

export default function ViewTask() {
  const params = useParams();
  const [formData, setFormData] = useState({});
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [task, setTask] = useState(null);
  const [openAssignUserModal, setOpenAssignUserModal] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      setIsError(false);
      const res = await fetch(`/api/v1/tasks/${params.id}`, {
        method: "PUT",
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
  useEffect(() => {
    const getTask = async () => {
      try {
        const res = await fetch(`/api/v1/tasks/${params.id}`);
        const data = await res.json();
        if (data.success === false) {
          setIsLoading(false);
          setIsError(data?.message);
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
        if (data.success !== false) {
          setIsLoading(false);
          setIsError(false);
          setTask(data);
        }
      } catch (error) {
        console.log(error);
        setIsLoading(false);
        setIsError(false);
      }
    };
    getTask();
  }, [params.id]);
  console.log(formData);
  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-md p-5 w-full md:w-[60%]"
      >
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
              defaultValue={task?.title}
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
              <option value="">{task?.status}</option>
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
            data={task?.description || "Enter description text"}
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
        <button
          disabled={isLoading}
          className="bg-gradient-to-tr disabled:cursor-not-allowed from-appBlue to-appRed text-white py-2 px-10 flex items-center justify-center gap-2
        "
        >
          {isLoading && (
            <div className="rounded-full w-5 h-5 border-r-2 border-b-2 border-white animate-spin"></div>
          )}
          Update
        </button>
      </form>

      {openAssignUserModal && (
        <AssignUsers formData={formData} setFormData={setFormData} />
      )}
    </>
  );
}
