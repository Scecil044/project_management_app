import { useState, useEffect } from "react";
import { MdDelete } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useToast } from "@chakra-ui/react";

export default function AssignUsers({
  setFormData,
  formData,
  setOpenAssignUserModal,
  openAssignUserModal,
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedUser, setselectedUser] = useState(null);
  const [users, setUsers] = useState([]);
  const toast = useToast();

  console.log(formData);
  const filteredUsers = users?.filter(
    (user) =>
      user?.firstName.toLowerCase().includes(search.toLocaleLowerCase()) ||
      user?.lastName.toLowerCase().includes(search.toLocaleLowerCase()) ||
      user?.email.toLowerCase().includes(search.toLocaleLowerCase()) ||
      user?.department?.departmentName
        .toLowerCase()
        .includes(search.toLocaleLowerCase())
  );

  const handleCheckboxChange = (userId) => {
    setFormData((prevFormData) => {
      const isContributor = prevFormData.contributors.includes(userId);
      const newContributors = isContributor
        ? prevFormData.contributors.filter((id) => id !== userId)
        : [...prevFormData.contributors, userId];
      return { ...prevFormData, contributors: newContributors };
    });
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setIsLoading(true);
        setIsError(false);
        const res = await fetch(`/api/v1/users`);
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
        if (res.ok) {
          setIsLoading(false);
          setIsError(false);
          setUsers(data);
        }
      } catch (error) {
        console.log(error);
        setIsLoading(false);
        setIsError(error.message);
      }
    };
    fetchUsers();
  }, []);
  return (
    <div className="inset-0 fixed z-50 w-full h-full flex items-center justify-center bg-black/50">
      <div className="bg-white p-5 w-[80%] md:w-[60%] text-sm md:ml-20">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold text-neutral-400">
            Select Users to Assign
          </h1>
          <div>
            <input
              type="text"
              placeholder="Search"
              className="border border-gray-400 p-2 focus:ring-0 focus:outline-gray-400 focus:border-gray-400 italic"
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-300 p-3">
              <th className="text-left uppercase text-neutral-500 px-3 py-1">
                select
              </th>
              <th className="text-left uppercase text-neutral-500 px-3 py-1">
                No.
              </th>
              <th className="text-left uppercase text-neutral-500 px-3 py-1">
                Avatar
              </th>
              <th className="text-left uppercase text-neutral-500 px-3 py-1">
                first name
              </th>
              <th className="text-left uppercase text-neutral-500 px-3 py-1">
                last name
              </th>
              <th className="text-left uppercase text-neutral-500 px-3 py-1">
                email
              </th>
              <th className="text-left uppercase text-neutral-500 px-3 py-1">
                Phone
              </th>
              <th className="text-left uppercase text-neutral-500 px-3 py-1">
                Joined
              </th>
              <th className="text-left uppercase text-neutral-500 px-3 py-1">
                Created by
              </th>
              <th className="text-left uppercase text-neutral-500 px-3 py-1">
                Department
              </th>
            </tr>
          </thead>

          <tbody>
            {filteredUsers.map((user, index) => (
              <tr
                key={index}
                className={`${index % 2 === 1 ? "bg-gray-200" : ""}`}
              >
                <td className="px-1 text-center text-appRed">
                  <input
                    type="checkbox"
                    className="text-appRed"
                    checked={formData?.contributors?.includes(user._id)}
                    onChange={() => handleCheckboxChange(user._id)}
                  />
                </td>
                <td className="px-1">{(index += 1)}</td>
                <td className="px-1">
                  <img
                    src={
                      user?.profilePicture ||
                      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyCbJoUCRscGfzySEtqoR5HtHnEOE0ux4r-A&s"
                    }
                    alt="avatar"
                    className="rounded-full h-8 w-8 object-cover"
                  />
                </td>
                <td className="px-1">{user?.firstName}</td>
                <td className="px-1">{user?.lastName}</td>
                <td className="px-1">{user?.email}</td>
                <td className="px-1">
                  {user?.personal?.phone || "Not provided"}
                </td>
                <td className="px-1">
                  {new Date(user?.createdAt).toLocaleDateString()}
                </td>
                <td className="px-1">Admin</td>
                <td
                  className={`px-1 ${
                    user?.department?.departmentName?.toLowerCase() ===
                    "unassigned"
                      ? "text-red-500"
                      : ""
                  }`}
                >
                  {user?.department?.departmentName || "unassigned"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="my-1">
          <button
            type="button"
            onClick={() => setOpenAssignUserModal(false)}
            className="py-2 bg-appRed text-white shadow-md hover:shadow-none transition-all duration-500 px-8"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
