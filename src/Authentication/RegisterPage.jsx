import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { uploadImageToCloudinary } from "../Utilities";
import useAuth from "../hook/useAuth";
import toast from "react-hot-toast";
import useAxios from "../hook/useAxios";

const RegisterPage = () => {
  const { register, handleSubmit, reset } = useForm();
  const [imageUrl, setImageUrl] = useState("");
  const { createUser, setUser, updateUserProfile, googleSignIn } = useAuth();
  const axiosInstance = useAxios();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  // 🔼 Upload immediately after image selection
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const url = await uploadImageToCloudinary(file);
    setImageUrl(url);
  };

  // 🔼 Final submit
  const onSubmit = (data) => {
    if (!imageUrl) {
      alert("Please wait for image upload to complete!");
      return;
    }

    const Data = {
      name: data?.name,
      email: data?.email,
      password: data?.password,
      photoUrl: imageUrl,
    };

    const { email, password, name } = Data;

    console.log("Submitted user:", Data);
    reset();
    setImageUrl("");

    createUser(email, password)
      .then(async (result) => {
        const user = result.user;

        // Save user to database
        try {
          const userData = {
            name: user.displayName,
            email: user.email,
            photoURL: imageUrl,
            role: "user", // default role
          };

          const res = await axiosInstance.post("/users", userData);
          console.log(res.data);

          if (res.data.success) {
            toast.success("User registered successfully!");
          } else {
            toast("User already exists.");
          }
        } catch (error) {
          console.error("Error saving user:", error);
          toast.error("Error saving user.");
        }

        // Update user profile
        updateUserProfile({ displayName: name, photoURL: imageUrl })
          .then(() => {
            setUser({ ...user, displayName: name, photoURL: imageUrl });
            navigate(from, { replace: true });
          })
          .catch((err) => {
            console.log(err.message);
            toast.error("Error updating profile.");
          });
      })
      .catch((err) => {
        console.log(err.message);
        toast.error(err.message);
      });
  };

  const handleGoogle = () => {
    googleSignIn()
      .then(async (result) => {
        const user = result.user;

        // Save Google user to database
        try {
          const userData = {
            name: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
            role: "user", // default role
          };

          const res = await axiosInstance.post("/users", userData);
          console.log(res.data);

          if (res.data.success) {
            toast.success("Google Login successful!");
          } else {
            toast("User already exists.");
          }
        } catch (error) {
          console.error("Error saving user:", error);
          toast.error("Error saving user.");
        }

        // Update Auth Context user
        setUser(user);
        navigate("/");
      })
      .catch((err) => {
        console.log(err.message);
        toast.error("Google Sign-in failed. Please try again.");
      });
  };

  return (
    <>
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div>
          <Link to={"/"}>
            <FaArrowLeft />
          </Link>
        </div>
        <div className="sm:mx-auto sm:w-full sm:max-w-6xl">
          <div className="flex flex-col md:flex-row bg-white shadow-xl rounded-lg overflow-hidden">
            {/* Left Side - Registration Form */}
            <div className="w-full md:w-1/2 p-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-extrabold text-[#E30613]">
                  Create Your Account
                </h2>
                <p className="mt-2 text-sm text-gray-600">
                  Join our parcel delivery network today
                </p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Name */}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-black"
                  >
                    Full Name
                  </label>
                  <div className="mt-1">
                    <input
                      id="name"
                      {...register("name", { required: true })}
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:ring-[#E30613] focus:border-[#E30613] sm:text-sm"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-black"
                  >
                    Email address
                  </label>
                  <div className="mt-1">
                    <input
                      id="email"
                      {...register("email", { required: true })}
                      type="email"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:ring-[#E30613] focus:border-[#E30613] sm:text-sm"
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-black"
                  >
                    Password
                  </label>
                  <div className="mt-1">
                    <input
                      id="password"
                      {...register("password", { required: true })}
                      type="password"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:ring-[#E30613] focus:border-[#E30613] sm:text-sm"
                    />
                  </div>
                </div>

                {/* Profile Photo */}
                <div>
                  <label
                    htmlFor="photo"
                    className="block text-sm font-medium text-black"
                  >
                    Profile Photo
                  </label>
                  <div className="mt-1">
                    <input
                      id="photo"
                      {...register("photo", { required: "Photo is required" })}
                      onChange={handleImageChange}
                      type="file"
                      accept="image/*"
                      className="block w-full text-sm text-gray-500
                      file:mr-4 file:py-2 file:px-4
                      file:rounded-md file:border-0
                      file:text-sm file:font-semibold
                      file:bg-[#E30613] file:text-white
                      hover:file:bg-[#C00511] transition-colors"
                    />
                  </div>

                  {/* {uploading && (
                    <p className="text-sm mt-2 text-yellow-500">Uploading...</p>
                  )} */}
                  {imageUrl && (
                    <img
                      src={imageUrl}
                      alt="Uploaded"
                      className="mt-2 h-20 w-20 object-cover rounded-md"
                    />
                  )}
                </div>

                {/* Terms checkbox */}
                <div className="flex items-center">
                  <input
                    id="terms"
                    type="checkbox"
                    className="h-4 w-4 text-[#E30613] focus:ring-[#E30613] border-gray-300 rounded"
                  />
                  <label htmlFor="terms" className="ml-2 text-sm text-black">
                    I agree to the terms and conditions
                  </label>
                </div>

                {/* Submit button */}
                <div>
                  <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#E30613] hover:bg-[#C00511] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#E30613]"
                  >
                    Register
                  </button>
                </div>
              </form>

              {/* Social login and login link (unchanged) */}
              <div className="mt-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-black">
                      Or continue with
                    </span>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-1 gap-3">
                  <button
                    onClick={handleGoogle}
                    type="button"
                    className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-black hover:bg-gray-50"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12.545 10.239v3.821h5.445c-0.712 2.315-2.647 3.972-5.445 3.972-3.332 0-6.033-2.701-6.033-6.032s2.701-6.032 6.033-6.032c1.498 0 2.866 0.549 3.921 1.453l2.814-2.814c-1.784-1.664-4.153-2.675-6.735-2.675-5.522 0-10 4.477-10 10s4.478 10 10 10c8.396 0 10-7.524 10-10 0-0.167-0.007-0.333-0.020-0.5h-9.98z" />
                    </svg>
                    <span className="ml-2">Sign up with Google</span>
                  </button>
                </div>

                <div className="mt-6 text-center">
                  <p className="text-sm text-black">
                    Already have an account?{" "}
                    <Link
                      to="/login"
                      className="font-medium text-[#E30613] hover:text-[#C00511]"
                    >
                      Sign in
                    </Link>
                  </p>
                </div>
              </div>
            </div>

            {/* Right Side - Image */}
            <div className="hidden md:block md:w-1/2 bg-[#FFD700] relative">
              <div className="absolute inset-0 flex items-center justify-center p-12">
                <img
                  src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                  alt="Parcel delivery"
                  className="object-cover w-full h-full rounded-lg shadow-lg"
                />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-black bg-opacity-70 text-white text-center">
                <h3 className="text-xl font-bold text-[#FFD700]">
                  Fast & Reliable Delivery
                </h3>
                <p className="mt-2">
                  Join thousands of satisfied customers shipping with us daily
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;
