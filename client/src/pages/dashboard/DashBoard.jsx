import { useEffect, useState } from "react";
import AppLoader from "../../components/common/AppLoader";
import { FaUsers } from "react-icons/fa";
import { SiTask } from "react-icons/si";
import { SiHiveBlockchain } from "react-icons/si";
import { useToast } from "@chakra-ui/react";

export default function DashBoard() {
  const [users, setUsers] = useState([]);
  const toast = useToast();
  const [departments, setDepartments] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [tasksCount, setTasksCount] = useState(0);
  const [usersCount, setUsersCount] = useState(0);
  const [departmentsCount, setDepartmentsCount] = useState(0);
  const actualUsersCount = users?.length;

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
          return;
        }
        if (res.ok) {
          setIsLoading(false);
          setIsError(false);
          setUsers(data);
          incrementUsersCount(data.length);
        }
      } catch (error) {
        console.log(error);
        setIsError(error.message);
      }
    };
    getUsers();

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
          incrementTaskssCount(data.length);
        }
      } catch (error) {
        console.log(error);
        setIsError(error.message);
      }
    };
    getTasks();

    const getDepartments = async () => {
      try {
        setIsLoading(true);
        setIsError(false);
        const res = await fetch("/api/v1/departments");
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
          setDepartments(data);
          incrementDepartmentssCount(data.length);
        }
      } catch (error) {
        console.log(error);
        toast({
          title: "Oops! something went wrong.",
          description: error?.message,
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top-right",
        });
        setIsError(error.message);
      }
    };
    getDepartments();
  }, []);
  const incrementUsersCount = (actualCount) => {
    let count = 0;
    const interval = setInterval(() => {
      count += 1;
      if (count >= actualCount) {
        count = actualCount;
        clearInterval(interval);
      }
      setUsersCount(count);
    }, 100); // Adjust the speed of the increment as needed
  };

  const incrementTaskssCount = (actualCount) => {
    let count = 0;
    const interval = setInterval(() => {
      count += 1;
      if (count >= actualCount) {
        count = actualCount;
        clearInterval(interval);
      }
      setTasksCount(count);
    }, 50); // Adjust the speed of the increment as needed
  };

  const incrementDepartmentssCount = (actualCount) => {
    let count = 0;
    const interval = setInterval(() => {
      count += 1;
      if (count >= actualCount) {
        count = actualCount;
        clearInterval(interval);
      }
      setDepartments(count);
    }, 50); // Adjust the speed of the increment as needed
  };
  return (
    <div className="bg-white w-full p-5 shadow-lg rounded-md">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="shadow-lg shadow-gray-300 h-[100px] p-2 flex gap-2">
          <div className="flex-1">
            <FaUsers className="h-14 w-14 ml-3" />
          </div>
          <div className="flex-1">
            <h1 className="text-center">Users</h1>
            <h1 className="text-3xl font-semibold text-center">{usersCount}</h1>
          </div>
        </div>
        <div className="shadow-lg shadow-gray-300 h-[100px] p-2 flex gap-2">
          <div className="flex-1">
            <SiTask className="h-14 w-14 ml-3" />
          </div>
          <div className="flex-1">
            <h1 className="text-center">Departments</h1>
            <h1 className="text-3xl font-semibold text-center">
              {departmentsCount}
            </h1>
          </div>
        </div>
        <div className="shadow-lg shadow-gray-300 h-[100px] p-2 flex gap-2">
          <div className="flex-1">
            <SiHiveBlockchain className="h-14 w-14 ml-3" />
          </div>
          <div className="flex-1">
            <h1 className="text-center">Tasks</h1>
            <h1 className="text-3xl font-semibold text-center">{tasksCount}</h1>
          </div>
        </div>
      </div>
      {isLoading && <AppLoader />}
    </div>
  );
}
