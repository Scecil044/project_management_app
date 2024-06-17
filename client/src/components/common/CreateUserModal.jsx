import { useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { LuAsterisk } from "react-icons/lu";

export default function CreateUserModal({
  setToggleUserCreationModal,
  toggleUserCreationModal,
}) {
  const [formData, setFormData] = useState({});
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);
  const [roleError, setRoleError] = useState(false);
  const [genderError, setGenderError] = useState(false);
  const [firstNameError, setFirstNameError] = useState(false);
  const [lastNameError, setLastNameError] = useState(false);
  const [ageError, setAgeError] = useState(false);
  const [passwordConfirmationError, setPasswordConfirmationError] =
    useState(false);
  const [roles, setRoles] = useState([]);
  const handlePhoneInput = (e) => {
    const inputValue = e.target.value;
    const isValid = /^\+\d{12}$/.test(inputValue);
    if (isValid) {
      setFormData({ ...formData, phone: inputValue });
    } else {
      setPhoneError("Invalid Phone Number");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email) {
      setEmailError("The email field is required!");
    } else {
      setEmailError(false);
    }
    if (!formData.firstName) {
      setFirstNameError("The first name field is required!");
    } else {
      setFirstNameError(false);
    }
    if (!formData.lastName) {
      setLastNameError("The last name field is required!");
    } else {
      setLastNameError(false);
    }
    if (!formData.age) {
      setAgeError("The Age field is required!");
    } else {
      setAgeError(false);
    }
    if (!formData.gender) {
      setGenderError("The gender field is required!");
    } else {
      setGenderError(false);
    }
    if (!formData.phone) {
      setPhoneError("The phone field is required!");
    } else {
      setPhoneError(false);
    }
    if (!formData.role) {
      setRoleError("The role field is required!");
    } else {
      setRoleError(false);
    }
    if (!formData.password) {
      setPasswordError("The password field is required!");
    } else {
      setPasswordError(false);
    }
    if (formData.password !== formData.password_confirmation) {
      setPasswordConfirmationError("Passwords did not match!!");
      return;
    } else {
      setPasswordConfirmationError(false);
    }
    try {
      setIsLoading(true);
      setIsError(false);
      const res = await fetch("/api/v1/auth/register", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(formData),
      });
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
        toast({
          title: "User creation successful.",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "top-right",
        });
        setToggleUserCreationModal(false);
      }
    } catch (error) {
      setIsLoading(false);
      setIsError(false);
      console.log(error.message);
    }
  };

  useEffect(() => {
    const getRoles = async () => {
      try {
        setIsLoading(true);
        setIsError(false);
        const res = await fetch("/api/v1/roles");
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
          setRoles(data);
        }
      } catch (error) {
        setIsLoading(false);
        setIsError(false);
        console.log(error.message);
      }
    };
    getRoles();
  }, []);
  return (
    <div className="inset-0 fixed bg-black/50 w-full h-full flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-5 w-[80%] md:w-[60%] text-sm md:ml-20"
      >
        <div className="my-2">
          <h1 className="font-semibold text-neutral-400 text-xl md:text-2xl">
            Create User
          </h1>
        </div>
        <div className="grid grid-cols-2 gap-5">
          <div className="flex flex-col gap-2">
            <div>
              <span className="flex">
                <label>First Name</label>
                {firstNameError && (
                  <LuAsterisk className="h-2 w-2 text-red-600" />
                )}
              </span>
            </div>
            <input
              type="text"
              placeholder="First Name"
              id="firstName"
              className={`border border-gray-400 p-2 focus:outline-none focus:border-gray-400 ${
                firstNameError ? "border border-red-700" : ""
              }`}
              onChange={(e) =>
                setFormData({ ...formData, firstName: e.target.value })
              }
            />
            {firstNameError && !formData.firstName && (
              <small className="text-red-600 font-semibold">
                {firstNameError}
              </small>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <div>
              <span className="flex">
                <label>Last Name</label>
                {lastNameError && (
                  <LuAsterisk className="h-2 w-2 text-red-600" />
                )}
              </span>
            </div>
            <input
              type="text"
              placeholder="Last Name"
              id="lastName"
              className={`border border-gray-400 p-2 focus:outline-none focus:border-gray-400 ${
                lastNameError ? "border border-red-700" : ""
              }`}
              onChange={(e) =>
                setFormData({ ...formData, lastName: e.target.value })
              }
            />
            {lastNameError && !formData.lastName && (
              <small className="text-red-600 font-semibold">
                {lastNameError}
              </small>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <div>
              <span className="flex">
                <label>Email</label>
                {emailError && <LuAsterisk className="h-2 w-2 text-red-600" />}
              </span>
            </div>
            <input
              type="email"
              placeholder="Email"
              id="email"
              className={`border border-gray-400 p-2 focus:outline-none focus:border-gray-400 ${
                emailError ? "border border-red-700" : ""
              }`}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
            {emailError && !formData.email && (
              <small className="text-red-600 font-semibold">{emailError}</small>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <div>
              <span className="flex">
                <label>Phone</label>
                {phoneError && <LuAsterisk className="h-2 w-2 text-red-600" />}
              </span>
            </div>
            <input
              type="text"
              placeholder="Phone"
              id="phone"
              className={`border border-gray-400 p-2 focus:outline-none focus:border-gray-400 ${
                phoneError ? "border border-red-700" : ""
              }`}
              onChange={handlePhoneInput}
            />
            {phoneError && !formData.phone && (
              <small className="text-red-600 font-semibold">{phoneError}</small>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <div>
              <span className="flex">
                <label>Age</label>
                {ageError && <LuAsterisk className="h-2 w-2 text-red-600" />}
              </span>
            </div>
            <input
              type="number"
              placeholder="Age"
              id="age"
              className={`border border-gray-400 p-2 focus:outline-none focus:border-gray-400 ${
                ageError ? "border border-red-700" : ""
              }`}
              onChange={(e) =>
                setFormData({ ...formData, age: e.target.value })
              }
            />
            {ageError && !formData.age && (
              <small className="text-red-600 font-semibold">{ageError}</small>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <div>
              <span className="flex">
                <label>Gender</label>
                {genderError && <LuAsterisk className="h-2 w-2 text-red-600" />}
              </span>
            </div>
            <select
              name="gender"
              id="gender"
              className={`border border-gray-400 p-2 focus:outline-none focus:border-gray-400 ${
                genderError ? "border border-red-700" : ""
              }`}
              onChange={(e) =>
                setFormData({ ...formData, gender: e.target.value })
              }
            >
              <option>Select</option>
              <option value="male">male</option>
              <option value="female">female</option>
            </select>
            {genderError && !formData.gender && (
              <small className="text-red-600 font-semibold">
                {genderError}
              </small>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <div>
              <span className="flex">
                <label>Role</label>
                {roleError && <LuAsterisk className="h-2 w-2 text-red-600" />}
              </span>
            </div>
            <select
              name="role"
              id="role"
              className={`border border-gray-400 p-2 focus:outline-none focus:border-gray-400 ${
                roleError ? "border border-red-700" : ""
              }`}
              onChange={(e) =>
                setFormData({ ...formData, role: e.target.value })
              }
            >
              <option>Select</option>
              {roles.map((role, index) => (
                <option key={index} value={role?._id}>
                  {role?.roleName}
                </option>
              ))}
            </select>
            {roleError && !formData.role && (
              <small className="text-red-600 font-semibold">{roleError}</small>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <div>
              <span className="flex">
                <label>Password</label>
                {passwordConfirmationError && (
                  <LuAsterisk className="h-2 w-2 text-red-600" />
                )}
              </span>
            </div>
            <input
              type="password"
              placeholder="Password"
              id="password"
              className={`border border-gray-400 p-2 focus:outline-none focus:border-gray-400 ${
                passwordError ? "border border-red-700" : ""
              }`}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
            {passwordError && !formData.password && (
              <small className="text-red-600 font-semibold">
                {passwordError}
              </small>
            )}
            {passwordConfirmationError && (
              <small className="text-red-600 font-semibold">
                {passwordConfirmationError}
              </small>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <div>
              <span className="flex">
                <label>Confirm Password</label>
                <LuAsterisk className="h-2 w-2 text-red-600" />
              </span>
            </div>
            <input
              type="password"
              placeholder="Confirm Password"
              id="password_confirmation"
              className="border border-gray-400 p-2 focus:outline-none focus:border-gray-400"
              onChange={(e) =>
                setFormData({
                  ...formData,
                  password_confirmation: e.target.value,
                })
              }
            />
          </div>
        </div>
        <div className="flex items-center float-end gap-3">
          <button
            type="button"
            onClick={() => setToggleUserCreationModal(false)}
            className="bg-gradient-to-tr from-appBlue to-appRed py-2 text-white px-20"
          >
            Cancel
          </button>
          <button className=" bg-appRed py-2 text-white px-20">Create</button>
        </div>
      </form>
    </div>
  );
}
