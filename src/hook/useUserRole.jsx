import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import axiosSecure from "./axiosSecure";

const useUserRole = () => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ["userRole", user?.email],
    queryFn: async () => {
      if (!user?.email) return "user"; // or null/default role
      const res = await axiosSecure.get(`/user-role?email=${user.email}`);
      return res.data.role;
    },
    enabled: !!user?.email,
  });
};

export default useUserRole;
