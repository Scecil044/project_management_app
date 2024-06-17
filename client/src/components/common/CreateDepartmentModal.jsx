import { useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { LuAsterisk } from "react-icons/lu";
import InfiniteScroll from "react-infinite-scroll-component";

export default function CreateDepartmentModal({
  setDepartmentModal,
  toggleDepartmentModal,
  selectedAction,
  setSelectedAction,
  DepData,
  setDepartmentData,
}) {
  const [departmentNameError, setDepartmentNameError] = useState(false);
  const [formData, setFormData] = useState({});
  const [users, setUsers] = useState([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      setIsError(false);
      const res = await fetch("/api/v1/departments", {
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
        setIsLoading(false);
        setIsError(data.message);
        return;
      }
      if (res.ok) {
        toast({
          title: "Department created.",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "top-right",
        });
        setIsLoading(true);
        setIsError(false);
        setDepartmentModal(false);
      }
    } catch (error) {
      setIsLoading(false);
      setIsError(error.message);
      console.log(error.message);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      setIsError(false);
      const res = await fetch(`/api/v1/departments/${DepData._id}`, {
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
        setIsLoading(false);
        setIsError(data.message);
        return;
      }
      if (res.ok) {
        toast({
          title: "Department Updated.",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "top-right",
        });
        setIsLoading(true);
        setIsError(false);
        setDepartmentModal(false);
      }
    } catch (error) {
      setIsLoading(false);
      setIsError(error.message);
      console.log(error.message);
    }
  };
  useEffect(() => {
    const getUsers = async () => {
      try {
        setIsLoading(true);
        setIsError(false);
        const res = await fetch("/api/v1/users");
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
          setIsLoading(false);
          setIsError(false);
          setUsers(data);
        }
      } catch (error) {
        console.log(error);
        setIsError(error.message);
      }
    };
    getUsers();
  }, []);
  return (
    <div className="inset-0 fixed bg-black/50 w-full h-full flex items-center justify-center">
      <form
        onSubmit={
          selectedAction == "Create"
            ? handleSubmit
            : selectedAction == "Edit"
            ? handleUpdate
            : ""
        }
        className="bg-white p-5 w-[80%] md:w-[50%] text-sm md:ml-20"
      >
        <div className="my-2">
          <button className="font-semibold text-neutral-400 text-xl md:text-2xl">
            {selectedAction} Department
          </button>
        </div>
        {selectedAction == "Create" && (
          <div className="grid grid-cols-2 gap-5">
            <div className="flex flex-col gap-2">
              <div>
                <span className="flex">
                  <label>Department Name</label>
                  <LuAsterisk className="h-2 w-2 text-red-600" />
                </span>
              </div>
              <input
                type="text"
                placeholder="Department Name"
                id="departmentName"
                className={`border border-gray-400 p-2 focus:outline-none focus:border-gray-400 ${
                  departmentNameError ? "border border-red-700" : ""
                } `}
                onChange={(e) =>
                  setFormData({ ...formData, departmentName: e.target.value })
                }
              />
              {departmentNameError && !formData.departmentName && (
                <small className="text-red-600 font-semibold">
                  departmentNameError{" "}
                </small>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <div>
                <span className="flex">
                  <label>Department Manager</label>
                  <LuAsterisk className="h-2 w-2 text-red-600" />
                </span>
              </div>
              <select
                id="manager"
                onChange={(e) =>
                  setFormData({ ...formData, manager: e.target.value })
                }
                className={`border border-gray-400 p-2 focus:outline-none focus:border-gray-400`}
              >
                <option value="">select</option>
                {users?.map((user, index) => (
                  <option key={index} value={user?._id}>
                    {user?.firstName} {user?.lastName}
                  </option>
                ))}
              </select>

              {departmentNameError && !formData.departmentName && (
                <small className="text-red-600 font-semibold">
                  departmentNameError{" "}
                </small>
              )}
            </div>
          </div>
        )}

        {selectedAction == "Edit" && (
          <div className="grid grid-cols-2 gap-5">
            <div className="flex flex-col gap-2">
              <div>
                <span className="flex">
                  <label>Department Name</label>
                  <LuAsterisk className="h-2 w-2 text-red-600" />
                </span>
              </div>
              <input
                type="text"
                placeholder="Department Name"
                id="departmentName"
                defaultValue={DepData?.departmentName}
                className={`border border-gray-400 p-2 focus:outline-none focus:border-gray-400 ${
                  departmentNameError ? "border border-red-700" : ""
                } `}
                onChange={(e) =>
                  setFormData({ ...formData, departmentName: e.target.value })
                }
              />
            </div>

            <div className="flex flex-col gap-2">
              <div>
                <span className="flex">
                  <label>Department Manager</label>
                  <LuAsterisk className="h-2 w-2 text-red-600" />
                </span>
              </div>
              <select
                id="manager"
                onChange={(e) =>
                  setFormData({ ...formData, manager: e.target.value })
                }
                className={`border border-gray-400 p-2 focus:outline-none focus:border-gray-400`}
              >
                <option value="">
                  {DepData?.manager?.firstName} {DepData?.manager?.lastName}
                </option>
                {users?.map((user, index) => (
                  <option key={index} value={user?._id}>
                    {user?.firstName} {user?.lastName}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}

        {/* <div>
          <div name="" id="" className="w-full">
            <InfiniteScroll
              dataLength={users.length}
              next={getUsers}
              hasMore={true}
              loader={<h4>Loading...</h4>}
            >
              {users.map((user, index) => (
                <div className="h-[30px]" key={index}>
                  <div className="flex gap-1">
                    <input type="checkbox" />
                    <h1>{user?.firstName}</h1>
                  </div>
                </div>
              ))}
            </InfiniteScroll>
          </div>
        </div> */}

        <div className="flex items-center float-end gap-3 my-3">
          <button
            onClick={() => setDepartmentModal(false)}
            type="button"
            // onClick={() => setToggleUserCreationModal(false)}
            className="bg-gradient-to-tr from-appBlue to-appRed py-2 text-white px-20"
          >
            Cancel
          </button>
          <button
            disabled={isLoading}
            className=" bg-appRed py-2 text-white px-20 flex items-center gap-1 justify-center"
          >
            {isLoading && (
              <div className="rounded-full h-5 w-5 border-r-2 border-b-2 animate-spin disabled:cursor-not-allowed"></div>
            )}
            Update
          </button>
        </div>
      </form>
    </div>
  );
}
