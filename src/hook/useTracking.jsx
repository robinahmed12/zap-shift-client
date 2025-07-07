import { useMutation } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useTracking = () => {
  const axiosSecure = useAxiosSecure();

  // ✅ Use mutateAsync instead of mutate
  const { mutateAsync: saveTracking, isPending } = useMutation({
    mutationFn: async (trackingData) => {
      const res = await axiosSecure.post("/tracking", trackingData);
      return res.data;
    },
  });

  return { saveTracking, isPending };
};

export default useTracking;
