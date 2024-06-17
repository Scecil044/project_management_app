import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import AppLoader from "../../components/common/AppLoader";
import { useToast } from "@chakra-ui/react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../../firebase";
import { useSelector } from "react-redux";

export default function ViewUser() {
  const { user: authenticatedUser } = useSelector((state) => state.auth);
  console.log(authenticatedUser);
  const fileRef = useRef();
  const [image, setImage] = useState(null);
  const [uploadPercentage, setUploadPercentage] = useState(0);
  const [uploadError, setUploadError] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const params = useParams();
  const toast = useToast();
  const [isLoading, setisLoading] = useState(false);
  const [isError, setisError] = useState(false);
  const [user, setuser] = useState(null);
  const [formData, setformData] = useState({});
  const [departments, setDepartments] = useState([]);

  const handleImage = (image) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + image.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, image);
    uploadTask.on(
      "stat_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadPercentage(Math.floor(progress));
        // console.log(uploadPercentage);
      },
      (error) => {
        setUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setformData({ ...formData, profilePicture: downloadURL });
        });
      }
    );
  };
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      setisLoading(true);
      setisError(false);
      const res = await fetch(`/api/v1/users/${params.id}`, {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        setisLoading(false);
        setisError(data.message);
        toast({
          title: "error.",
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
          description: "Record updated",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "top-right",
        });
        setisLoading(false);
        setisError(false);
      }
    } catch (error) {
      console.log(error);
      setisLoading(false);
      setisError(error.message);
    }
  };

  useEffect(() => {
    const getUser = async () => {
      try {
        setisLoading(true);
        setisError(false);
        const res = await fetch(`/api/v1/users/${params.id}`);
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
          setisLoading(false);
          setisError(false);
          setuser(data);
        }
      } catch (error) {
        setisError(error.message);
        setisLoading(false);
      }
    };
    getUser();

    const getDepartments = async () => {
      try {
        setisLoading(true);
        setisError(false);
        const res = await fetch("/api/v1/departments");
        const data = await res.json();
        if (data.success === false) {
          setisLoading(false);
          setisError(data.message);
          toast({
            title: "error.",
            description: data?.message,
            status: "error",
            duration: 5000,
            isClosable: true,
            position: "top-right",
          });
          return;
        }
        if (res.ok) {
          setisLoading(false);
          setisError(false);
          setDepartments(data);
        }
      } catch (error) {
        console.log(error);
        setisLoading(false);
        setisError(error.message);
      }
    };
    getDepartments();
    if (image) {
      handleImage(image);
    }
  }, [params.id, image]);
  console.log(formData);
  return (
    <div>
      <div className="md:h-40 h-32 bg-gradient-to-tr from-appBlue to-appRed relative">
        <div className="rounded-full h-20 w-20 absolute border-2 border-white flex items-center justify-center -bottom-10 left-2">
          <img
            src={
              formData.profilePicture ||
              user?.profilePicture ||
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyCbJoUCRscGfzySEtqoR5HtHnEOE0ux4r-A&s"
            }
            alt="profilePicture"
            className="rounded-full h-2- w-20 cursor-pointer"
            onClick={() => fileRef.current.click()}
          />
          <input
            type="file"
            className="hidden"
            ref={fileRef}
            id="image"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>
      </div>
      <div className="flex flex-col gap-5 md:flex-row md:gap-8 py-5 my-3">
        <form
          onSubmit={handleUpdate}
          className="flex-1 flex-col gap-3 bg-white p-5 shadow-md rounded-md"
        >
          <div className="flex flex-col gap-1">
            <label>First Name</label>
            <input
              type="text"
              placeholder="First Name"
              defaultValue={user?.firstName}
              id="firstName"
              className="w-full border border-gray-400 focus:outline-none focus:border-gray-400 p-2 "
              onChange={(e) =>
                setformData({ ...formData, firstName: e.target.value })
              }
            />
          </div>

          <div className="flex flex-col gap-1">
            <label>Last Name</label>
            <input
              type="text"
              placeholder="First Name"
              defaultValue={user?.lastName}
              id="lastName"
              className="w-full border border-gray-400 focus:outline-none focus:border-gray-400 p-2 "
              onChange={(e) =>
                setformData({ ...formData, lastName: e.target.value })
              }
            />
          </div>

          <div className="flex flex-col gap-1">
            <label>Email</label>
            <input
              type="email"
              id="email"
              placeholder="Email"
              defaultValue={user?.email}
              className="w-full border border-gray-400 focus:outline-none focus:border-gray-400 p-2 "
              onChange={(e) =>
                setformData({ ...formData, email: e.target.value })
              }
            />
          </div>

          <div className="flex flex-col gap-1">
            <label>Phone</label>
            <input
              type="text"
              placeholder="Phone"
              defaultValue={user?.personal.phone}
              id="phone"
              className="w-full border border-gray-400 focus:outline-none focus:border-gray-400 p-2 "
              onChange={(e) =>
                setformData({ ...formData, phone: e.target.value })
              }
            />
          </div>

          <div className="flex flex-col gap-1">
            <label>Age</label>
            <input
              type="number"
              min={18}
              max={130}
              placeholder="Age"
              id="age"
              defaultValue={user?.personal.age}
              className="w-full border border-gray-400 focus:outline-none focus:border-gray-400 p-2 "
              onChange={(e) =>
                setformData({ ...formData, age: e.target.value })
              }
            />
          </div>

          <div className="flex flex-col gap-1">
            <label>Gender</label>
            <select
              name="gender"
              id="gender"
              className="w-full border border-gray-400 focus:outline-none focus:border-gray-400 p-2 "
              onChange={(e) =>
                setformData({ ...formData, gender: e.target.value })
              }
            >
              <option value="">{user?.personal?.gender}</option>
              <option value="male">male</option>
              <option value="female">female</option>
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label>Change Password</label>
            <input
              type="password"
              placeholder="New Password"
              defaultValue="**************"
              id="password"
              className="w-full border border-gray-400 focus:outline-none focus:border-gray-400 p-2 "
              onChange={(e) =>
                setformData({ ...formData, password: e.target.value })
              }
            />
          </div>

          <div className="flex flex-col gap-1">
            <label>Confirm Password</label>
            <input
              type="password"
              placeholder="Confirm Password"
              id="password_confirmation"
              className="w-full border border-gray-400 focus:outline-none focus:border-gray-400 p-2 "
              onChange={(e) =>
                setformData({
                  ...formData,
                  password_confirmation: e.target.value,
                })
              }
            />
          </div>
          <button className="bg-gradient-to-tr from-appBlue to-appRed py-2 px-10 w-full flex items-center justify-center gap-2 shadow-md hover:opacity-85 transition-all duration-500 disabled:cursor-not-allowed text-white">
            Update
          </button>
        </form>

        <div className="flex-1 bg-white p-5 shadow-md rounded-md">
          <div className="flex flex-col gap-1">
            <label>Department</label>
            <select
              name="department"
              id="department"
              className="w-full border border-gray-400 focus:outline-none focus:border-gray-400 p-2 "
              onChange={(e) =>
                setformData({ ...formData, department: e.target.value })
              }
            >
              <option>{user?.department?.departmentName}</option>
              {departments.map((department, index) => (
                <option key={index} value={department?._id}>
                  {department?.departmentName}
                </option>
              ))}
            </select>
          </div>
          {authenticatedUser?.role?.roleName != "user" && (
            <>
              <h1 className="text-lg md:text-2xl text-neutral-400 my-3">
                More actions
              </h1>
              <div className="flex flex-col gap-3 md:grid md:grid-cols-3 md:gap-4">
                <button
                  disabled
                  className="disabled:cursor-not-allowed bg-gradient-to-tr from-appBlue to-appRed text-white py-2 px-4"
                >
                  Delete Account
                </button>
                <button
                  disabled
                  className="disabled:cursor-not-allowed bg-gradient-to-tr from-green-700 to-appRed text-white py-2 px-4"
                >
                  Suspend account
                </button>
                <button
                  disabled
                  className="disabled:cursor-not-allowed bg-gradient-to-tr from-green-700 to-appBlue text-white py-2 px-4"
                >
                  Activate account
                </button>
              </div>
            </>
          )}
        </div>
      </div>
      {isLoading && <AppLoader />}
    </div>
  );
}
