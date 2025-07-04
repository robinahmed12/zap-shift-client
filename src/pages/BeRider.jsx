import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import useAuth from "../hook/useAuth";
import useAxiosSecure from "../hook/useAxiosSecure";
import Swal from "sweetalert2";

const BeRider = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const riderData = {
        ...data,
        applicantEmail: user?.email,
        applicationDate: new Date(),
        status: "pending",
      };

      console.log(riderData);

      const res = await axiosSecure.post("/riders", riderData);
      // console.log(res.data.insertedId);

      if (res.data?.data?.insertedId) {
        Swal.fire({
          position: "top-center",
          icon: "success",
          title: "Application submitted successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        reset();
      }
    } catch (error) {
      // Proper error display
      toast.error(`Error submitting application: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const vehicleTypes = ["Motorcycle", "Bicycle", "Car", "Van", "Truck"];

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-[#E30613] mb-2">
            Join Our Rider Team
          </h2>
          <p className="text-lg text-gray-600">
            Deliver happiness with every parcel!
          </p>
        </div>

        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="bg-[#E30613] p-4">
            <h3 className="text-xl font-bold text-white">
              Rider Application Form
            </h3>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="p-6">
            {/* Personal Information Section */}
            <div className="mb-8">
              <h4 className="text-lg font-semibold text-[#E30613] mb-4 border-b-2 border-[#FFD700] pb-2">
                Personal Information
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    className="block text-gray-700 mb-2"
                    htmlFor="fullName"
                  >
                    Full Name <span className="text-[#E30613]">*</span>
                  </label>
                  <input
                    id="fullName"
                    type="text"
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#FFD700] focus:border-[#FFD700] ${
                      errors.fullName ? "border-[#E30613]" : "border-gray-300"
                    }`}
                    {...register("fullName", {
                      required: "Full name is required",
                    })}
                  />
                  {errors.fullName && (
                    <p className="mt-1 text-sm text-[#E30613]">
                      {errors.fullName.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-gray-700 mb-2" htmlFor="email">
                    Email <span className="text-[#E30613]">*</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    defaultValue={user?.email}
                    disabled
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-2" htmlFor="phone">
                    Phone Number <span className="text-[#E30613]">*</span>
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#FFD700] focus:border-[#FFD700] ${
                      errors.phone ? "border-[#E30613]" : "border-gray-300"
                    }`}
                    {...register("phone", {
                      required: "Phone number is required",
                      pattern: {
                        value: /^[0-9]{10,15}$/,
                        message: "Please enter a valid phone number",
                      },
                    })}
                  />
                  {errors.phone && (
                    <p className="mt-1 text-sm text-[#E30613]">
                      {errors.phone.message}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    className="block text-gray-700 mb-2"
                    htmlFor="dateOfBirth"
                  >
                    Date of Birth <span className="text-[#E30613]">*</span>
                  </label>
                  <input
                    id="dateOfBirth"
                    type="date"
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#FFD700] focus:border-[#FFD700] ${
                      errors.dateOfBirth
                        ? "border-[#E30613]"
                        : "border-gray-300"
                    }`}
                    {...register("dateOfBirth", {
                      required: "Date of birth is required",
                    })}
                  />
                  {errors.dateOfBirth && (
                    <p className="mt-1 text-sm text-[#E30613]">
                      {errors.dateOfBirth.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Address Information */}
            <div className="mb-8">
              <h4 className="text-lg font-semibold text-[#E30613] mb-4 border-b-2 border-[#FFD700] pb-2">
                Address Information
              </h4>

              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label
                    className="block text-gray-700 mb-2"
                    htmlFor="fullAddress"
                  >
                    Full Address <span className="text-[#E30613]">*</span>
                  </label>
                  <textarea
                    id="fullAddress"
                    rows={3}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#FFD700] focus:border-[#FFD700] ${
                      errors.fullAddress
                        ? "border-[#E30613]"
                        : "border-gray-300"
                    }`}
                    {...register("fullAddress", {
                      required: "Address is required",
                    })}
                  />
                  {errors.fullAddress && (
                    <p className="mt-1 text-sm text-[#E30613]">
                      {errors.fullAddress.message}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-gray-700 mb-2" htmlFor="city">
                      City <span className="text-[#E30613]">*</span>
                    </label>
                    <input
                      id="city"
                      type="text"
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#FFD700] focus:border-[#FFD700] ${
                        errors.city ? "border-[#E30613]" : "border-gray-300"
                      }`}
                      {...register("city", { required: "City is required" })}
                    />
                    {errors.city && (
                      <p className="mt-1 text-sm text-[#E30613]">
                        {errors.city.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-gray-700 mb-2" htmlFor="state">
                      State/Province <span className="text-[#E30613]">*</span>
                    </label>
                    <input
                      id="state"
                      type="text"
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#FFD700] focus:border-[#FFD700] ${
                        errors.state ? "border-[#E30613]" : "border-gray-300"
                      }`}
                      {...register("state", { required: "State is required" })}
                    />
                    {errors.state && (
                      <p className="mt-1 text-sm text-[#E30613]">
                        {errors.state.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      className="block text-gray-700 mb-2"
                      htmlFor="postalCode"
                    >
                      Postal Code <span className="text-[#E30613]">*</span>
                    </label>
                    <input
                      id="postalCode"
                      type="text"
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#FFD700] focus:border-[#FFD700] ${
                        errors.postalCode
                          ? "border-[#E30613]"
                          : "border-gray-300"
                      }`}
                      {...register("postalCode", {
                        required: "Postal code is required",
                      })}
                    />
                    {errors.postalCode && (
                      <p className="mt-1 text-sm text-[#E30613]">
                        {errors.postalCode.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Vehicle Information */}
            <div className="mb-8">
              <h4 className="text-lg font-semibold text-[#E30613] mb-4 border-b-2 border-[#FFD700] pb-2">
                Vehicle Information
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    className="block text-gray-700 mb-2"
                    htmlFor="vehicleType"
                  >
                    Vehicle Type <span className="text-[#E30613]">*</span>
                  </label>
                  <select
                    id="vehicleType"
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#FFD700] focus:border-[#FFD700] ${
                      errors.vehicleType
                        ? "border-[#E30613]"
                        : "border-gray-300"
                    }`}
                    {...register("vehicleType", {
                      required: "Vehicle type is required",
                    })}
                    value={selectedVehicle}
                    onChange={(e) => setSelectedVehicle(e.target.value)}
                  >
                    <option value="">Select Vehicle Type</option>
                    {vehicleTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                  {errors.vehicleType && (
                    <p className="mt-1 text-sm text-[#E30613]">
                      {errors.vehicleType.message}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    className="block text-gray-700 mb-2"
                    htmlFor="vehicleModel"
                  >
                    Vehicle Model <span className="text-[#E30613]">*</span>
                  </label>
                  <input
                    id="vehicleModel"
                    type="text"
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#FFD700] focus:border-[#FFD700] ${
                      errors.vehicleModel
                        ? "border-[#E30613]"
                        : "border-gray-300"
                    }`}
                    {...register("vehicleModel", {
                      required: "Vehicle model is required",
                    })}
                  />
                  {errors.vehicleModel && (
                    <p className="mt-1 text-sm text-[#E30613]">
                      {errors.vehicleModel.message}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    className="block text-gray-700 mb-2"
                    htmlFor="licensePlate"
                  >
                    License Plate Number{" "}
                    <span className="text-[#E30613]">*</span>
                  </label>
                  <input
                    id="licensePlate"
                    type="text"
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#FFD700] focus:border-[#FFD700] ${
                      errors.licensePlate
                        ? "border-[#E30613]"
                        : "border-gray-300"
                    }`}
                    {...register("licensePlate", {
                      required: "License plate is required",
                    })}
                  />
                  {errors.licensePlate && (
                    <p className="mt-1 text-sm text-[#E30613]">
                      {errors.licensePlate.message}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    className="block text-gray-700 mb-2"
                    htmlFor="yearOfManufacture"
                  >
                    Year of Manufacture
                  </label>
                  <input
                    id="yearOfManufacture"
                    type="number"
                    min="1900"
                    max={new Date().getFullYear()}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFD700] focus:border-[#FFD700]"
                    {...register("yearOfManufacture")}
                  />
                </div>
              </div>
            </div>

            {/* Documents Section */}
            <div className="mb-8">
              <h4 className="text-lg font-semibold text-[#E30613] mb-4 border-b-2 border-[#FFD700] pb-2">
                Required Documents
              </h4>

              <div className="space-y-4">
                <div>
                  <label className="block text-gray-700 mb-2">
                    Driver's License <span className="text-[#E30613]">*</span>
                  </label>
                  <div className="flex items-center">
                    <input
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#FFD700] focus:border-[#FFD700] ${
                        errors.driversLicense
                          ? "border-[#E30613]"
                          : "border-gray-300"
                      }`}
                      {...register("driversLicense", {
                        required: "Driver license is required",
                      })}
                    />
                  </div>
                  <p className="mt-1 text-sm text-gray-500">
                    Upload a clear photo or scan of your driver's license (PDF,
                    JPG, PNG)
                  </p>
                  {errors.driversLicense && (
                    <p className="mt-1 text-sm text-[#E30613]">
                      {errors.driversLicense.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-gray-700 mb-2">
                    Vehicle Registration{" "}
                    <span className="text-[#E30613]">*</span>
                  </label>
                  <input
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#FFD700] focus:border-[#FFD700] ${
                      errors.vehicleRegistration
                        ? "border-[#E30613]"
                        : "border-gray-300"
                    }`}
                    {...register("vehicleRegistration", {
                      required: "Vehicle registration is required",
                    })}
                  />
                  <p className="mt-1 text-sm text-gray-500">
                    Upload a clear photo or scan of your vehicle registration
                  </p>
                  {errors.vehicleRegistration && (
                    <p className="mt-1 text-sm text-[#E30613]">
                      {errors.vehicleRegistration.message}
                    </p>
                  )}
                </div>

                {selectedVehicle === "Motorcycle" && (
                  <div>
                    <label className="block text-gray-700 mb-2">
                      Motorcycle Insurance (if applicable)
                    </label>
                    <input
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFD700] focus:border-[#FFD700]"
                      {...register("insuranceDocument")}
                    />
                    <p className="mt-1 text-sm text-gray-500">
                      Upload your motorcycle insurance document
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Terms and Submission */}
            <div className="mb-6">
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="terms"
                    type="checkbox"
                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-[#FFD700]"
                    {...register("termsAccepted", {
                      required: "You must accept the terms",
                    })}
                  />
                </div>
                <label htmlFor="terms" className="ml-2 text-sm text-gray-700">
                  I agree to the{" "}
                  <a href="#" className="text-[#E30613] hover:underline">
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a href="#" className="text-[#E30613] hover:underline">
                    Privacy Policy
                  </a>{" "}
                  <span className="text-[#E30613]">*</span>
                </label>
              </div>
              {errors.termsAccepted && (
                <p className="mt-1 text-sm text-[#E30613]">
                  {errors.termsAccepted.message}
                </p>
              )}
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-[#E30613] hover:bg-[#C00511] text-white font-bold py-3 px-8 rounded-lg shadow-md transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#FFD700] focus:ring-opacity-50 flex items-center"
              >
                {isSubmitting ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Processing...
                  </>
                ) : (
                  "Submit Application"
                )}
              </button>
            </div>
          </form>
        </div>

        <div className="mt-8 bg-[#FFD700] bg-opacity-20 p-6 rounded-lg border border-[#FFD700]">
          <h3 className="text-xl font-bold text-[#E30613] mb-2">
            What to Expect Next
          </h3>
          <ul className="list-disc pl-5 space-y-2 text-gray-700">
            <li>
              Our team will review your application within 2-3 business days
            </li>
            <li>You'll receive an email with the next steps if approved</li>
            <li>Background check and verification may be required</li>
            <li>
              Training session will be scheduled upon successful verification
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default BeRider;
