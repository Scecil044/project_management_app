import { useEffect, useState } from "react";
import AppLoader from "../../components/common/AppLoader";
import { Link } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import DeleteModal from "../../components/common/DeleteModal";
import CreateUserModal from "../../components/common/CreateUserModal";
import { RiUserShared2Line } from "react-icons/ri";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [toggleDeleteModal, settoggleDeleteModal] = useState(false);
  const [selectedUser, setselectedUser] = useState(null);
  const [toggleUserCreationModal, setToggleUserCreationModal] = useState(false);
  const [search, setSearch] = useState("");

  const filteredUsers = users.filter(
    (user) =>
      user.firstName.toLowerCase().includes(search.toLowerCase()) ||
      user.lastName.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase())
  );

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
        }
      } catch (error) {
        console.log(error);
        setIsError(error.message);
      }
    };
    getUsers();
  }, [toggleDeleteModal, toggleUserCreationModal]);

  return (
    <>
      <div>
        <h1 className="text-xl md:text-2xl text-neutral-4 font-semibold00">
          Users
        </h1>
      </div>
      <div className="bg-white w-full p-5 shadow-lg rounded-md">
        <div className="w-full flex items-center justify-between">
          <div>
            <button
              onClick={() => setToggleUserCreationModal(true)}
              className="flex items-center gap-1 py-2 px-4 hover:bg-appRed hover:text-white shadow-md transition-all duration-300"
            >
              Create
              <RiUserShared2Line className="h-5 w-5" />
            </button>
          </div>
          <div>
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border border-gray-400 p-2 focus:ring-0 focus:outline-gray-400 focus:border-gray-400 italic"
            />
          </div>
        </div>
        <div className="my-3">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-300 p-3">
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
                  Action
                </th>
              </tr>
            </thead>
            {isLoading ? (
              <tbody></tbody>
            ) : (
              <tbody>
                {filteredUsers.map((user, index) => (
                  <tr
                    key={index}
                    className={`${index % 2 === 1 ? "bg-gray-200" : ""}`}
                  >
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
                    <td className="flex items-center gap-1 px-1">
                      <Link
                        to={`/app/view/user/${user?._id}`}
                        className="flex items-center gap-0.5"
                      >
                        <FiEdit className="h-5 w-5 text-blue-600" />
                        Edit
                      </Link>
                      <button
                        onClick={() => {
                          setselectedUser({
                            id: user?._id,
                            firstName: user?.firstName,
                            lastName: user?.lastName,
                          });
                          settoggleDeleteModal(true);
                        }}
                        className="flex items-center gap-0.5"
                      >
                        <MdDelete className="h-5 w-5 text-appRed" />
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            )}
          </table>
        </div>
        {toggleDeleteModal && (
          <DeleteModal
            toggleDeleteModal={toggleDeleteModal}
            settoggleDeleteModal={settoggleDeleteModal}
            selectedUser={selectedUser}
            module="users"
          />
        )}
        {isLoading && <AppLoader />}
        {toggleUserCreationModal && (
          <CreateUserModal
            setToggleUserCreationModal={setToggleUserCreationModal}
            toggleUserCreationModal={toggleUserCreationModal}
          />
        )}
      </div>
    </>
  );
}
