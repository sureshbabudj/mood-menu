import { useAtom } from "jotai";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { googleUserAtom } from "@/lib/store";

const useAuth = () => {
  const [googleUser] = useAtom(googleUserAtom);
  const navigate = useNavigate();

  useEffect(() => {
    if (!googleUser) {
      navigate("/login");
    }
  }, [googleUser, navigate]);

  return googleUser;
};

export default useAuth;
