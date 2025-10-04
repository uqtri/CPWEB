import { handleActivation } from "@/api/auth.api";
import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";

export default function ActivatePage() {
  const [params] = useSearchParams();
  const email = params.get("email");
  const token = params.get("token");
  const navigate = useNavigate();
  const handleActivationMuation = useMutation({
    mutationFn: async ({ email, token }: { email: string; token: string }) => {
      return handleActivation({ email: email!, token: token! });
    },
    onSuccess: () => {
      toast.success("Kích hoạt tài khoản thành công");
    },
    onError: (error: any) => {
      console.log(error);
      toast.error(
        error?.response?.data?.message || "Kích hoạt tài khoản thất bại"
      );
    },
  });

  useEffect(() => {
    if (email && token) {
      handleActivationMuation.mutate({ email, token });
      navigate("/login");
    }
  }, [email, token]);
  return null;
}
