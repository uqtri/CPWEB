import { CodeIcon, ArrowRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
// import WaitingScreen from "../../components/WaitingScreen/WaitingScreen";

import { toast } from "react-toastify";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export default function Register() {
  const [, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const fields = [
    {
      name: "email",
      type: "email",
      placeholder: "Email",
      label: "Email",
      pattern: "^[a-zA-Z0-9]{5,}@+.+.+$",
      message: "Email không hợp lệ",
    },
    {
      name: "username",
      type: "text",
      placeholder: "Username",
      label: "Username",
      pattern: "^[a-zA-Z0-9]{8,}$|^[a-zA-Z0-9]{5,}@+.+.+$",
      message: "Username phải có ít nhất 8 kí tự",
    },
    {
      name: "password",
      type: "password",
      placeholder: "Password",
      label: "Password",
      pattern: "[a-zA-Z0-9]{8,}",
      message: "Mật khẩu phải có ít nhất 8 ký tự",
    },
    {
      name: "confirmPassword",
      type: "password",
      placeholder: "",
      label: "Xác nhận mật khẩu",
      message: "",
    },
  ];
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    const username = data.username as string;
    const password = data.password as string;
    const email = data.email as string;
    const confirmPassword = data.confirmPassword as string;

    // openNotification("error");
    if (password !== confirmPassword) {
      toast.error("Mật khẩu không khớp");
      // openNotification("error", "Mật khẩu không khớp");
      return;
    }
    const register = async (username: string, password: string) => {
      setIsLoading(true);
      console.log("Registering user...");
      const response = await fetch(BACKEND_URL + "/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          username,
          password,
        }),
      }).then((res) => {
        return res.json();
      });
      console.log("Response: ", response);
      if (response.success === true) {
        toast.success("Đăng ký thành công");
        navigate("/login");
      } else {
        toast.error(response.message);
      }
      setIsLoading(false);
    };
    await register(username, password);
  };
  return (
    <div className="my-10 mx-7 border border-gray-300 rounded-md py-10 px-5 shadow-xl">
      <CodeIcon className="h-10 w-10 text-primary text-center mx-auto" />
      <h1 className="text-2xl font-bold text-center">Đăng ký tài khoản</h1>
      <p className="text-lg text-center mt-2 text-gray-500">
        Tạo tài khoản để tham gia các cuộc thi lập trình
      </p>
      <form onSubmit={handleSubmit}>
        {fields &&
          fields.map((field) => {
            return (
              <div className="mt-3" key={field.name}>
                <label
                  className="font-normal"
                  key={field.name}
                  htmlFor={field.name}
                >
                  {field.label}
                </label>
                <input
                  type={field.type}
                  name={field.name}
                  placeholder={field.placeholder}
                  pattern={field.pattern}
                  title={field.message}
                  required
                  className="border border-gray-300 rounded-md p-2 w-full"
                />
              </div>
            );
          })}
        <button
          type="submit"
          className="mt-3 bg-primary w-full md:w-[50%] lg:w-[20%] mx-auto text-white rounded-md flex items-center p-3 justify-center cursor-pointer"
        >
          <span>Đăng ký</span>
          <ArrowRight className="ml-2" />
        </button>
        <div className="mt-3">
          <span>
            Đã có tài khoản?{" "}
            <Link to="/login">
              <span className="text-primary underline"> Đăng nhập </span>
            </Link>
          </span>
        </div>
      </form>
    </div>
  );
}
