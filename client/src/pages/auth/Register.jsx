import { useState } from "react";
import { LuAsterisk } from "react-icons/lu";
import { TiTick } from "react-icons/ti";
import { IoIosClose } from "react-icons/io";
import AppLoader from "../../components/common/AppLoader";
import { useToast } from "@chakra-ui/react";

export default function Register({ setOpenRegister }) {
  const [formData, setFormData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  console.log(formData);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);
  const [genderError, setGenderError] = useState(false);
  const [firstNameError, setFirstNameError] = useState(false);
  const [lastNameError, setLastNameError] = useState(false);
  const [passwordConfirmationError, setPasswordConfirmationError] =
    useState(false);

  const handlePhoneInput = (e) => {
    const inputValue = e.target.value;
    const isValid = /^\+\d{12}$/.test(inputValue);
    if (isValid) {
      setFormData({ ...formData, phone: inputValue });
    } else {
      setPhoneError("Invalid Phone Number");
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!formData.password) {
      setPasswordError("The password field is required");
    } else {
      setPasswordError(false);
    }
    if (!formData.email) {
      setEmailError("The email field is required");
    } else {
      setEmailError(false);
    }
    if (!formData.phone) {
      setPhoneError("The phone field is required");
    } else {
      setPhoneError(false);
    }
    if (!formData.gender) {
      setGenderError("The gender field is required");
    } else {
      setGenderError(false);
    }
    if (!formData.firstName) {
      setFirstNameError("The first name field is required");
    } else {
      setFirstNameError(false);
    }
    if (!formData.lastName) {
      setLastNameError("The last name field is required");
    } else {
      setLastNameError(false);
    }
    if (formData.password !== formData.passwordConfirmation) {
      setPasswordConfirmationError("Passwords did not match!");
      return;
    } else {
      setPasswordConfirmationError(false);
    }
    try {
      const res = await fetch("/api/v1/auth/register", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        setIsLoading(false);
        toast({
          title: "Oops! something broke down.",
          description: "Please provide all required fields",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top-right",
        });
        return;
      }
      if (res.ok) {
        setIsLoading(false);
        toast({
          title: "Registration successful.",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "top-right",
        });
        setOpenRegister(false);
      }
    } catch (error) {
      setIsLoading(false);
      toast({
        title: "Oops! something broke down.",
        description: error?.message,
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
    }
  };
  return (
    <div className="inset-0 fixed w-full h-full bg-black/50 flex items-center">
      <div className="bg-white p-5 absolute right-0 z-50 w-[80%] md:w-[30%] mr-2 md:mr-5">
        <form onSubmit={handleRegister} className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div className="font-semibold flex gap-2 text-lg md:text-xl">
              Welcome to{" "}
              <span className="flex items-center">
                <h1>Pro</h1> <h1 className="text-appYellow font-bold">ject</h1>
                <h1>pro</h1>
              </span>
            </div>
            <button type="button" onClick={() => setOpenRegister(false)}>
              <IoIosClose className="h-5 w-5" />
            </button>
          </div>
          <div>
            <h1 className="italic font-semibold">Lets Sign you up!</h1>
          </div>

          <div className="overflow-y-scroll max-h-[439px] no-scrollbar">
            <div className="flex flex-col gap-1">
              <div>
                <span className="flex">
                  <label>First Name</label>
                  <LuAsterisk className="h-2 w-2 text-red-600" />
                </span>
              </div>
              <input
                type="text"
                id="firstName"
                placeholder="First Name"
                onChange={(e) =>
                  setFormData({ ...formData, firstName: e.target.value })
                }
                className="py-1 px-2 focus:ring-0 focus:outline-none border border-gray-400"
              />
              {firstNameError && !formData.firstName && (
                <small className="text-red-600 font-semibold">
                  {firstNameError}
                </small>
              )}
            </div>

            <div className="flex flex-col gap-1">
              <div>
                <span className="flex">
                  <label>Last Name</label>
                  <LuAsterisk className="h-2 w-2 text-red-600" />
                </span>
              </div>
              <input
                type="text"
                id="lastName"
                placeholder="Last Name"
                onChange={(e) =>
                  setFormData({ ...formData, lastName: e.target.value })
                }
                className="py-1 px-2 focus:ring-0 focus:outline-none border border-gray-400"
              />
              {lastNameError && !formData.lastName && (
                <small className="text-red-600 font-semibold">
                  {lastNameError}
                </small>
              )}
            </div>

            <div className="flex flex-col gap-1">
              <div>
                <span className="flex">
                  <label>Email</label>
                  <LuAsterisk className="h-2 w-2 text-red-600" />
                </span>
              </div>
              <input
                type="email"
                id="email"
                placeholder="Email"
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="py-1 px-2 focus:ring-0 focus:outline-none border border-gray-400"
              />
              {emailError && !formData.email && (
                <small className="text-red-600 font-semibold">
                  {emailError}
                </small>
              )}
            </div>

            <div className="flex flex-col gap-1">
              <div>
                <span className="flex">
                  <label>Phone</label>
                  <LuAsterisk className="h-2 w-2 text-red-600" />
                </span>
              </div>
              <input
                type="text"
                id="phone"
                placeholder="e.g +247890989878"
                onChange={handlePhoneInput}
                className="py-1 px-2 focus:ring-0 focus:outline-none border border-gray-400"
              />
              {phoneError && !formData.phone && (
                <small className="text-red-600 font-semibold">
                  {phoneError}
                </small>
              )}
            </div>

            <div className="flex flex-col gap-1">
              <div>
                <span className="flex">
                  <label>Gender</label>
                  <LuAsterisk className="h-2 w-2 text-red-600" />
                </span>
              </div>
              <select
                id="gender"
                onChange={(e) =>
                  setFormData({ ...formData, gender: e.target.value })
                }
                className="py-1 px-2 focus:ring-0 focus:outline-none border border-gray-400 hover:bg-appRed/10 hover:text-black"
              >
                <option value="">Select</option>
                <option value="female">female</option>
                <option value="male">male</option>
              </select>
              {genderError && !formData.gender && (
                <small className="text-red-600 font-semibold">
                  {genderError}
                </small>
              )}
            </div>

            <div className="flex flex-col gap-1">
              <div>
                <span className="flex">
                  <label>Password</label>
                  <LuAsterisk className="h-2 w-2 text-red-600" />
                </span>
              </div>
              <input
                type="password"
                id="password"
                placeholder="Password"
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                className="py-1 px-2 focus:ring-0 focus:outline-none border border-gray-400"
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

            <div className="flex flex-col gap-1">
              <div>
                <span className="flex">
                  <label>Confirm Password</label>
                  <LuAsterisk className="h-2 w-2 text-red-600" />
                </span>
              </div>
              <input
                type="password"
                id="passwordConfirmation"
                placeholder="Confirm Password"
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    passwordConfirmation: e.target.value,
                  })
                }
                className="py-1 px-2 focus:ring-0 focus:outline-none border border-gray-400"
              />
            </div>
          </div>
          <div>
            <button className="w-full flex items-center justify-center py-1 bg-appRed text-white shadow-md">
              Register
            </button>
          </div>
        </form>
      </div>
      {isLoading && <AppLoader />}
    </div>
  );
}
