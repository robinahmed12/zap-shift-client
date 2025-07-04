import { Link, useNavigate } from "react-router-dom";
import deliveryImage from "../assets/authImage.png";
import logo from "../Component/Header/logo.png";
import { useForm } from "react-hook-form";
import useAuth from "../hook/useAuth";
import toast from "react-hot-toast";
import useAxios from "../hook/useAxios";

const LoginPage = () => {
  const { register, handleSubmit } = useForm();
  const { signInUser, setUser, googleSignIn } = useAuth();
  const navigate = useNavigate();
  const axiosInstance = useAxios();

  const onSubmit = async (data, e) => {
    e.preventDefault();
    const { email, password } = data;

    signInUser(email, password)
      .then(async (result) => {
        const user = result.user;

        // ✅ Fetch user profile from backend
        try {
          const res = await axiosInstance.get(`/user?email=${user.email}`);
          console.log(res.data);

          if (res.data) {
            // ✅ Update Auth Context with full user data
            setUser({ ...user, ...res.data });

            toast.success("Login successful!");
            navigate("/");
          } else {
            toast.error("User not found in database.");
          }
        } catch (error) {
          console.error("Error fetching user profile:", error);
          toast.error("Error fetching user profile.");
        }
      })
      .catch((err) => {
        console.log(err.message);
        toast.error("Login failed. Please try again.");
      });
  };

  const handleGoogle = () => {
    googleSignIn()
      .then(async (result) => {
        const user = result.user;

        // ✅ Save or update Google user in database
        try {
          const userData = {
            name: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
            role: "user",
          };

          const res = await axiosInstance.post("/users", userData);
          console.log(res.data);

          // ✅ Fetch full user profile from backend
          const profileRes = await axiosInstance.get(
            `/user?email=${user.email}`
          );

          if (profileRes.data) {
            setUser({ ...user, ...profileRes.data });
            toast.success("Google Login successful!");
            navigate("/");
          } else {
            toast.error("User not found in database.");
          }
        } catch (error) {
          console.error("Error saving or fetching user:", error);
          toast.error("Error saving or fetching user.");
        }
      })
      .catch((err) => {
        console.log(err.message);
        toast.error("Google Sign-in failed. Please try again.");
      });
  };

  return (
    <>
      <Link to={"/"} className="bg-gray-50 flex ml-3">
        <img className="mt-2" src={logo} alt="" />
        <span className=" text-2xl mt-5 font-bold text-[#E30613]">
          ZapShift
        </span>
      </Link>
      <div className="min-h-screen flex flex-col md:flex-row bg-gray-50">
        {/* Left Side - Login Form */}
        <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
          <div className="max-w-md w-full mx-auto">
            <h1
              className="text-3xl font-bold mb-2"
              style={{ color: "#E30613" }}
            >
              Welcome Back
            </h1>
            <h2 className="text-xl mb-8" style={{ color: "#000000" }}>
              Sign in to your parcel delivery account
            </h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  id="email"
                  {...register("email", { required: true })}
                  type="email"
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <input
                  id="password"
                  {...register("password", { required: true })}
                  type="password"
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="remember-me"
                    className="ml-2 block text-sm text-gray-900"
                  >
                    Remember me
                  </label>
                </div>

                <div className="text-sm">
                  <Link
                    to="/forgot-password"
                    className="font-medium hover:underline"
                    style={{ color: "#E30613" }}
                  >
                    Forgot password?
                  </Link>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition duration-300"
                  style={{ backgroundColor: "#E30613" }}
                >
                  Sign in
                </button>
              </div>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-gray-50 text-gray-500">
                    Or continue with
                  </span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-1 gap-3">
                <button
                  onClick={handleGoogle} // ✅ Fix here
                  className="w-full flex justify-center items-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition duration-300"
                >
                  <svg
                    className="w-5 h-5 mr-2"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 488 512"
                  >
                    <path
                      fill="#E30613"
                      d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
                    />
                  </svg>
                  Sign in with Google
                </button>
              </div>

              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600">
                  Don't have an account?{" "}
                  <Link
                    to="/register"
                    className="font-medium hover:underline"
                    style={{ color: "#E30613" }}
                  >
                    Register here
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Image */}
        <div className="w-full md:w-1/2 bg-gray-200 hidden md:block">
          <div className="h-full w-full flex items-center justify-center p-8">
            <img
              src={deliveryImage}
              alt="Parcel Delivery"
              className="w-full object-cover rounded-lg shadow-xl"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
