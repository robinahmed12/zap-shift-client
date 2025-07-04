// useAxiosSecure.js
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import useAuth from "./useAuth";
import axiosSecure from "./axiosSecure";

const useAxiosSecure = () => {
  const navigate = useNavigate();
  const { signOutUser, user } = useAuth();

  useEffect(() => {
    const requestInterceptor = axiosSecure.interceptors.request.use(
      async (config) => {
        if (user) {
          const token = await user.getIdToken();
          config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    const responseInterceptor = axiosSecure.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error.response) {
          const status = error.response.status;

          if (status === 401) {
            await signOutUser();
            navigate("/login");
          } else if (status === 403) {
            navigate("/forbidden");
          }
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosSecure.interceptors.request.eject(requestInterceptor);
      axiosSecure.interceptors.response.eject(responseInterceptor);
    };
  }, [navigate, signOutUser, user]);

  return axiosSecure;
};

export default useAxiosSecure;
