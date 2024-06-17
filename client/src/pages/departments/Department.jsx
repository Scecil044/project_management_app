import React, { useEffect, useState } from "react";
import AppLoader from "../../components/common/AppLoader";
import CreateDepartmentModal from "../../components/common/CreateDepartmentModal";
import { MdDelete } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import DeleteModal from "../../components/common/DeleteModal";

export default function Department() {
  const [departments, setDepartments] = useState([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [toggleDepartmentModal, setDepartmentModal] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [toggleDeleteModal, settoggleDeleteModal] = useState(false);
  const toast = useToast();
  const [selectedAction, setSelectedAction] = useState(null);
  const [departmentData, setDepartmentData] = useState(null);

  useEffect(() => {
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
  }, [toggleDepartmentModal, toggleDeleteModal]);

  return (
    <div className="bg-white w-full p-5 shadow-lg rounded-md">
      <div className="w-full flex items-center justify-between">
        <div className="my-3">
          <button
            onClick={() => {
              setDepartmentModal(true);
              setSelectedAction("Create");
            }}
            className="p-2 bg-appRed text-white shadow-md"
          >
            Create New
          </button>
        </div>
        <div>
          <input type="text" placeholder="Search..." />
        </div>
      </div>
      <div>
        <table className="w-full table-auto">
          <thead>
            <tr>
              <th className="text-left p-2 bg-gray-100">No.</th>
              <th className="text-left p-2 bg-gray-100">Avatar</th>
              <th className="text-left p-2 bg-gray-100">Department Name</th>
              <th className="text-left p-2 bg-gray-100">Manager Name</th>
              <th className="text-left p-2 bg-gray-100">Manager Email</th>
              <th className="text-left p-2 bg-gray-100">Manager phone</th>
              <th className="text-left p-2 bg-gray-100">Joined</th>
              <th className="text-left p-2 bg-gray-100">Created by</th>
              <th className="text-left p-2 bg-gray-100">Action</th>
            </tr>
          </thead>
          <tbody>
            {departments.map((department, index) => (
              <tr key={index}>
                <td>{(index += 1)}</td>
                <td>
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyCbJoUCRscGfzySEtqoR5HtHnEOE0ux4r-A&s"
                    alt=""
                    className="h-7 w-7"
                  />
                </td>
                <td>{department?.departmentName}</td>
                <td>
                  {department?.manager?.firstName}{" "}
                  {department?.manager?.lastName}
                </td>
                <td>{department?.manager?.email}</td>
                <td>{department?.manager?.personal?.phone}</td>
                <td>
                  {new Date(
                    department?.manager?.createdAt
                  ).toLocaleDateString()}
                </td>
                <td>
                  {new Date(
                    department?.manager?.updatedAt
                  ).toLocaleDateString()}
                </td>
                <td className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setDepartmentModal(true);
                      setSelectedAction("Edit");
                      setDepartmentData(department);
                    }}
                    className="flex items-center gap-0.5"
                  >
                    <FiEdit className="h-5 w-5 text-blue-600" />
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      setSelectedDepartment({
                        id: department?._id,
                        departmentName: department?.departmentName,
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
        </table>
      </div>
      {isLoading && <AppLoader />}
      {toggleDepartmentModal && (
        <CreateDepartmentModal
          toggleDepartmentModal={toggleDepartmentModal}
          setDepartmentModal={setDepartmentModal}
          selectedAction={selectedAction}
          setSelectedAction={setSelectedAction}
          DepData={departmentData}
          setDepartmentData={setDepartmentData}
        />
      )}
      {toggleDeleteModal && (
        <DeleteModal
          module="departments"
          selectedDepartment={selectedDepartment}
          toggleDeleteModal={toggleDeleteModal}
          settoggleDeleteModal={settoggleDeleteModal}
        />
      )}
    </div>
  );
}
