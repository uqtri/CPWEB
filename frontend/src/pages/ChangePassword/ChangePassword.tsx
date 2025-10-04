import { handleChangePassword } from "@/api/auth.api";
import { useMutation } from "@tanstack/react-query";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";

export default function ChangePassword() {
  const [params] = useSearchParams();
  const email = params.get("email");
  const token = params.get("token");
  const navigate = useNavigate();
  const handleChangePasswordMutation = useMutation({
    mutationFn: async ({
      email,
      token,
      newPassword,
    }: {
      email: string;
      token: string;
      newPassword: string;
    }) => {
      return handleChangePassword({ email, token, newPassword });
    },
    onSuccess: () => {
      toast.success("Đổi mật khẩu thành công");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Đổi mật khẩu thất bại");
    },
  });
  return (
    <div>
      <form
        className="flex flex-col gap-4 p-5 w-fit border border-gray-300 rounded mx-auto mt-20"
        onSubmit={(e) => {
          e.preventDefault();

          console.log({ email, token }, "KK");
          if (!email || !token) {
            toast.error("Liên kết không hợp lệ");
            navigate("/login");
            return;
          }
          const newPassword = document.getElementsByName(
            "newPassword"
          )[0] as HTMLInputElement;
          const confirmPassword = document.getElementsByName(
            "confirmPassword"
          )[0] as HTMLInputElement;
          if (newPassword.value !== confirmPassword.value) {
            toast.error("Mật khẩu xác nhận không khớp");
            return;
          }

          handleChangePasswordMutation.mutate({
            email: email!,
            token: token!,
            newPassword: newPassword.value,
          });
          navigate("/login");
        }}
      >
        <input
          name="newPassword"
          type="password"
          placeholder="Mật khẩu mới"
          required
          minLength={8}
          className="p-2 border border-gray-300 rounded"
        />
        <input
          name="confirmPassword"
          type="password"
          placeholder="Xác nhận mật khẩu mới"
          minLength={8}
          className="p-2 border border-gray-300 rounded"
          required
        />
        <button
          type="submit"
          className="cursor-pointer bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Đổi mật khẩu
        </button>
      </form>
    </div>
  );
}
