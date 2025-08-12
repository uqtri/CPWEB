import { CodeIcon, ArrowRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import WaitingScreen from "../../components/WaitingScreen/WaitingScreen";
import { useAppStore } from "../../store/index";
import Google from "@/assets/google.png";

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const login = useAppStore((state) => state.login);
  const user = useAppStore((state) => state.user);
  const fields = [
    {
      name: "username",
      type: "text",
      placeholder: "Username or Email",
      label: "Username",
    },
    {
      name: "password",
      type: "password",
      placeholder: "Password",
      label: "Password",
    },
  ];

  console.log("user", user);

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  });
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    const username = data.username as string;
    const password = data.password as string;

    await login({ email: username, password });
    setIsLoading(false);
  };
  return (
    <div className="mt-[62px]">
      {isLoading && <WaitingScreen />}

      <div className="my-10 mx-7 border border-gray-300 rounded-md py-5 px-5 shadow-xl relative ">
        <CodeIcon className="h-10 w-10 text-primary text-center mx-auto" />
        <h1 className="text-2xl font-bold text-center">Đăng nhập</h1>
        <p className="text-lg text-center mt-2 text-gray-500">
          Nhập thông tin đăng nhập của bạn để tiếp tục
        </p>
        <form onSubmit={handleSubmit}>
          {fields &&
            fields.map((field) => {
              return (
                <div>
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
                    required
                    className="border border-gray-300 rounded-md p-2 w-full"
                  />
                </div>
              );
            })}
          <Link to="/">
            <p className="text-sm text-primary mt-3 underline  font-semibold">
              Quên mật khẩu
            </p>
          </Link>

          <button
            type="submit"
            className="mt-3 cursor-pointer md:w-[50%] lg:w-[20%] mx-auto bg-primary w-full text-white rounded-md flex items-center p-3 justify-center"
          >
            <span>Đăng nhập</span>
            <ArrowRight className="ml-2" />
          </button>
          <div className="mt-3">
            <span>
              Chưa có tài khoản?{" "}
              <Link to="/register">
                <span className="text-primary underline"> Đăng ký </span>
              </Link>
            </span>
          </div>
          <div className="flex items-center gap-3">
            <p className="flex-1 h-[1px] bg-gray-300"></p>
            <p>Hoặc đăng nhập bằng</p>
            <p className="flex-1 h-[1px] bg-gray-300"></p>
          </div>
          <div className="auth grid grid-cols-1 lg:grid-cols-3 gap-3 mt-3">
            <a href={import.meta.env.VITE_BACKEND_URL + "/auth/google"}>
              <div className="flex cursor-pointer gap-3 items-center font-semibold border-1 rounded-full justify-center py-1">
                <img
                  src={Google}
                  alt="Google logo"
                  className="w-[40px] h-[40px]"
                />
                <p>Đăng nhập bằng Google</p>
              </div>
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}
