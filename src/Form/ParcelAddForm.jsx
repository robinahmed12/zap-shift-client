import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useForm, Controller } from "react-hook-form";
import useAuth from "../hook/useAuth";
import useAxiosSecure from "../hook/useAxiosSecure";
import useTracking from "../hook/useTracking";
import Swal from "sweetalert2";

const ParcelAddForm = () => {
  const [activeSection, setActiveSection] = useState("parcelInfo");
  const [showCostModal, setShowCostModal] = useState(false);
  const [deliveryCost, setDeliveryCost] = useState(0);
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { saveTracking } = useTracking();

  const generateTrackingID = () => {
    const date = new Date();
    const datePart = date.toISOString().split("T")[0].replace(/-/g, "");
    const rand = Math.random().toString(36).substring(2, 7).toUpperCase();
    return `PCL-${datePart}-${rand}`;
  };

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
    trigger,
    setValue,
    getValues,
  } = useForm({
    defaultValues: {
      // Parcel Info
      type: "document",
      title: "",
      weight: "",

      // Sender Info
      senderName: "", // Prefilled
      senderContact: "",
      senderRegion: "",
      senderServiceCenter: "",
      senderAddress: "",
      senderPickupInstruction: "",

      // Receiver Info
      receiverName: "",
      receiverContact: "",
      receiverRegion: "",
      receiverServiceCenter: "",
      receiverAddress: "",
      receiverDeliveryInstruction: "",
    },
  });

  const regions = [
    "Dhaka",
    "Chittagong",
    "Sylhet",
    "Khulna",
    "Barishal",
    "Rajshahi",
    "Rangpur",
    "Mymensingh",
  ];
  const serviceCenters = {
    Dhaka: ["Mirpur", "Dhanmondi", "Uttara", "Gulshan"],
    Chittagong: ["Agrabad", "Nasirabad", "Halishahar"],
    Sylhet: ["Zindabazar", "Upashahar"],
    Khulna: ["Khalishpur", "Sonadanga"],
    Barishal: ["Rupatoli", "Kawnia"],
    Rajshahi: ["Shaheb Bazar", "Boalia"],
    Rangpur: ["Station Road", "College Road"],
    Mymensingh: ["Notun Bazar", "Chorpara"],
  };

  const watchType = watch("type");
  const watchSenderRegion = watch("senderRegion");
  const watchReceiverRegion = watch("receiverRegion");

  const calculateCost = (data) => {
    // Simple cost calculation logic
    let cost = 50; // base cost

    if (data.type === "non-document") {
      cost += parseInt(data.weight || 0) * 10; // 10 per kg
    }

    // Add premium for certain service centers
    const premiumCenters = ["Gulshan", "Uttara", "Agrabad", "Zindabazar"];
    if (
      premiumCenters.includes(data.senderServiceCenter) ||
      premiumCenters.includes(data.receiverServiceCenter)
    ) {
      cost += 30;
    }

    return cost;
  };

  const onSubmit = (data) => {
    const cost = calculateCost(data);
    setDeliveryCost(cost);
    setShowCostModal(true);
  };
const tracking_id = generateTrackingID();
  const handleConfirm = async () => {
    const formData = getValues();

    const parcelData = {
      ...formData,
      creation_date: new Date().toISOString(),
      status: "pending",
      cost: deliveryCost,
      userEmail: user?.email,
      payment_status: "unpaid",
      delivery_status: "not_collected",
      tracking_id,
    };

    console.log("Saving to database:", parcelData);

    try {
      const response = await axiosSecure.post("/parcels", parcelData);
      console.log("Parcel added:", response.data);

      // 🔥 Save Tracking Log
      saveTracking({
        tracking_id: parcelData.tracking_id,
        status: "Parcel Created",
        details: "User created the parcel",
        updated_by: user?.email,
        timestamp: new Date().toISOString(),
      });

      if (response.status === 200) {
        Swal.fire({
          title: "Success!",
          text: "Parcel sent successfully!",
          icon: "success",
          confirmButtonText: "OK",
        }).then(() => {
          // Optional: navigate after confirmation
          // navigate("/dashboard");
        });
      }
    } catch (error) {
      console.error("Error adding parcel:", error);
      Swal.fire({
        title: "Error!",
        text: "Failed to add parcel.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  const validateSection = async (section) => {
    let fields = [];

    if (section === "parcelInfo") {
      fields = ["title"];
      if (watchType === "non-document") fields.push("weight");
    } else if (section === "senderInfo") {
      fields = [
        "senderContact",
        "senderRegion",
        "senderServiceCenter",
        "senderAddress",
      ];
    } else if (section === "receiverInfo") {
      fields = [
        "receiverName",
        "receiverContact",
        "receiverRegion",
        "receiverServiceCenter",
        "receiverAddress",
      ];
    }

    const result = await trigger(fields);
    if (result) {
      setActiveSection(section);
    }
    return result;
  };

  useEffect(() => {
    if (user) {
      setValue("senderName", user.displayName || ""); // Prefill the sender name
    }
  }, [setValue, user]);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Heading */}
        <h1 className="text-3xl font-bold mb-2" style={{ color: "#E30613" }}>
          Create New Parcel
        </h1>
        <p className="text-lg mb-8" style={{ color: "#000000" }}>
          Fill out the form below to schedule a door-to-door delivery
        </p>

        {/* Progress Steps */}
        <div className="flex justify-between mb-8 relative">
          <div className="flex flex-col items-center">
            <button
              onClick={() => setActiveSection("parcelInfo")}
              className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 transition-all ${
                activeSection === "parcelInfo"
                  ? "bg-[#E30613] text-white"
                  : "bg-gray-200 text-gray-700"
              } hover:bg-[#E30613] hover:text-white`}
            >
              1
            </button>
            <span
              className={`text-sm ${
                activeSection === "parcelInfo"
                  ? "font-bold text-[#E30613]"
                  : "text-gray-600"
              }`}
            >
              Parcel Info
            </span>
          </div>
          <div className="flex flex-col items-center">
            <button
              onClick={() => validateSection("senderInfo")}
              className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 transition-all ${
                activeSection === "senderInfo"
                  ? "bg-[#E30613] text-white"
                  : "bg-gray-200 text-gray-700"
              } hover:bg-[#E30613] hover:text-white`}
            >
              2
            </button>
            <span
              className={`text-sm ${
                activeSection === "senderInfo"
                  ? "font-bold text-[#E30613]"
                  : "text-gray-600"
              }`}
            >
              Sender Info
            </span>
          </div>
          <div className="flex flex-col items-center">
            <button
              onClick={() => validateSection("receiverInfo")}
              className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 transition-all ${
                activeSection === "receiverInfo"
                  ? "bg-[#E30613] text-white"
                  : "bg-gray-200 text-gray-700"
              } hover:bg-[#E30613] hover:text-white`}
            >
              3
            </button>
            <span
              className={`text-sm ${
                activeSection === "receiverInfo"
                  ? "font-bold text-[#E30613]"
                  : "text-gray-600"
              }`}
            >
              Receiver Info
            </span>
          </div>
          <div className="absolute top-5 left-0 right-0 h-1 bg-gray-200 -z-10">
            <div
              className="h-full bg-[#E30613] transition-all duration-300"
              style={{
                width:
                  activeSection === "parcelInfo"
                    ? "0%"
                    : activeSection === "senderInfo"
                    ? "50%"
                    : "100%",
              }}
            ></div>
          </div>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white shadow-md rounded-lg p-6"
        >
          {/* Parcel Info Section */}
          {activeSection === "parcelInfo" && (
            <div className="space-y-4">
              <h2
                className="text-xl font-semibold mb-4"
                style={{ color: "#000000" }}
              >
                Parcel Information
              </h2>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Parcel Type *
                </label>
                <div className="flex space-x-4">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      value="document"
                      {...register("type")}
                      className="h-4 w-4 text-[#E30613] focus:ring-[#E30613] border-gray-300"
                    />
                    <span className="ml-2 text-gray-700">Document</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      value="non-document"
                      {...register("type")}
                      className="h-4 w-4 text-[#E30613] focus:ring-[#E30613] border-gray-300"
                    />
                    <span className="ml-2 text-gray-700">Non-Document</span>
                  </label>
                </div>
              </div>

              <div>
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Parcel Title *
                </label>
                <input
                  id="title"
                  {...register("title", { required: "Title is required" })}
                  className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#E30613] focus:border-[#E30613] ${
                    errors.title ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="e.g. Important Documents"
                />
                {errors.title && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.title.message}
                  </p>
                )}
              </div>

              {watchType === "non-document" && (
                <div>
                  <label
                    htmlFor="weight"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Weight (kg) *
                  </label>
                  <input
                    type="number"
                    id="weight"
                    {...register("weight", {
                      required: "Weight is required for non-document",
                      min: {
                        value: 0.1,
                        message: "Weight must be at least 0.1kg",
                      },
                    })}
                    className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#E30613] focus:border-[#E30613] ${
                      errors.weight ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="e.g. 2"
                    min="0.1"
                    step="0.1"
                  />
                  {errors.weight && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.weight.message}
                    </p>
                  )}
                </div>
              )}

              <div className="flex justify-end pt-4">
                <button
                  type="button"
                  onClick={() => validateSection("senderInfo")}
                  className="px-4 py-2 bg-[#000000] text-white rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#000000] transition-colors"
                >
                  Next: Sender Info
                </button>
              </div>
            </div>
          )}

          {/* Sender Info Section */}
          {activeSection === "senderInfo" && (
            <div className="space-y-4">
              <h2
                className="text-xl font-semibold mb-4"
                style={{ color: "#000000" }}
              >
                Sender Information
              </h2>

              <div>
                <label
                  htmlFor="senderName"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Name *
                </label>
                <input
                  id="senderName"
                  {...register("senderName")}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#E30613] focus:border-[#E30613] bg-gray-100"
                  readOnly
                />
              </div>

              <div>
                <label
                  htmlFor="senderContact"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Contact Number *
                </label>
                <input
                  type="tel"
                  id="senderContact"
                  {...register("senderContact", {
                    required: "Contact is required",
                    pattern: {
                      value: /^[0-9]{11}$/,
                      message: "Please enter a valid 11-digit phone number",
                    },
                  })}
                  className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#E30613] focus:border-[#E30613] ${
                    errors.senderContact ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="e.g. 01712345678"
                />
                {errors.senderContact && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.senderContact.message}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="senderRegion"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Region *
                  </label>
                  <Controller
                    name="senderRegion"
                    control={control}
                    rules={{ required: "Region is required" }}
                    render={({ field }) => (
                      <select
                        {...field}
                        onChange={(e) => {
                          field.onChange(e);
                          setValue("senderServiceCenter", "");
                        }}
                        className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#E30613] focus:border-[#E30613] ${
                          errors.senderRegion
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                      >
                        <option value="">Select Region</option>
                        {regions.map((region) => (
                          <option key={region} value={region}>
                            {region}
                          </option>
                        ))}
                      </select>
                    )}
                  />
                  {errors.senderRegion && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.senderRegion.message}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="senderServiceCenter"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Service Center *
                  </label>
                  <Controller
                    name="senderServiceCenter"
                    control={control}
                    rules={{ required: "Service Center is required" }}
                    render={({ field }) => (
                      <select
                        {...field}
                        disabled={!watchSenderRegion}
                        className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#E30613] focus:border-[#E30613] ${
                          errors.senderServiceCenter
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                      >
                        <option value="">Select Service Center</option>
                        {watchSenderRegion &&
                          serviceCenters[watchSenderRegion].map((center) => (
                            <option key={center} value={center}>
                              {center}
                            </option>
                          ))}
                      </select>
                    )}
                  />
                  {errors.senderServiceCenter && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.senderServiceCenter.message}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label
                  htmlFor="senderAddress"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Full Address *
                </label>
                <textarea
                  id="senderAddress"
                  {...register("senderAddress", {
                    required: "Address is required",
                  })}
                  rows={3}
                  className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#E30613] focus:border-[#E30613] ${
                    errors.senderAddress ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="House #, Road #, Area details"
                ></textarea>
                {errors.senderAddress && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.senderAddress.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="senderPickupInstruction"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Pickup Instructions
                </label>
                <textarea
                  id="senderPickupInstruction"
                  {...register("senderPickupInstruction")}
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#E30613] focus:border-[#E30613]"
                  placeholder="Any special instructions for pickup"
                ></textarea>
              </div>

              <div className="flex justify-between pt-4">
                <button
                  type="button"
                  onClick={() => setActiveSection("parcelInfo")}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#E30613] transition-colors"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={() => validateSection("receiverInfo")}
                  className="px-4 py-2 bg-[#000000] text-white rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#000000] transition-colors"
                >
                  Next: Receiver Info
                </button>
              </div>
            </div>
          )}

          {/* Receiver Info Section */}
          {activeSection === "receiverInfo" && (
            <div className="space-y-4">
              <h2
                className="text-xl font-semibold mb-4"
                style={{ color: "#000000" }}
              >
                Receiver Information
              </h2>

              <div>
                <label
                  htmlFor="receiverName"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Name *
                </label>
                <input
                  type="text"
                  id="receiverName"
                  {...register("receiverName", {
                    required: "Name is required",
                  })}
                  className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#E30613] focus:border-[#E30613] ${
                    errors.receiverName ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Receiver's full name"
                />
                {errors.receiverName && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.receiverName.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="receiverContact"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Contact Number *
                </label>
                <input
                  type="tel"
                  id="receiverContact"
                  {...register("receiverContact", {
                    required: "Contact is required",
                    pattern: {
                      value: /^[0-9]{11}$/,
                      message: "Please enter a valid 11-digit phone number",
                    },
                  })}
                  className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#E30613] focus:border-[#E30613] ${
                    errors.receiverContact
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                  placeholder="e.g. 01712345678"
                />
                {errors.receiverContact && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.receiverContact.message}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="receiverRegion"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Region *
                  </label>
                  <Controller
                    name="receiverRegion"
                    control={control}
                    rules={{ required: "Region is required" }}
                    render={({ field }) => (
                      <select
                        {...field}
                        onChange={(e) => {
                          field.onChange(e);
                          setValue("receiverServiceCenter", "");
                        }}
                        className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#E30613] focus:border-[#E30613] ${
                          errors.receiverRegion
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                      >
                        <option value="">Select Region</option>
                        {regions.map((region) => (
                          <option key={region} value={region}>
                            {region}
                          </option>
                        ))}
                      </select>
                    )}
                  />
                  {errors.receiverRegion && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.receiverRegion.message}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="receiverServiceCenter"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Service Center *
                  </label>
                  <Controller
                    name="receiverServiceCenter"
                    control={control}
                    rules={{ required: "Service Center is required" }}
                    render={({ field }) => (
                      <select
                        {...field}
                        disabled={!watchReceiverRegion}
                        className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#E30613] focus:border-[#E30613] ${
                          errors.receiverServiceCenter
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                      >
                        <option value="">Select Service Center</option>
                        {watchReceiverRegion &&
                          serviceCenters[watchReceiverRegion].map((center) => (
                            <option key={center} value={center}>
                              {center}
                            </option>
                          ))}
                      </select>
                    )}
                  />
                  {errors.receiverServiceCenter && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.receiverServiceCenter.message}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label
                  htmlFor="receiverAddress"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Full Address *
                </label>
                <textarea
                  id="receiverAddress"
                  {...register("receiverAddress", {
                    required: "Address is required",
                  })}
                  rows={3}
                  className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#E30613] focus:border-[#E30613] ${
                    errors.receiverAddress
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                  placeholder="House #, Road #, Area details"
                ></textarea>
                {errors.receiverAddress && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.receiverAddress.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="receiverDeliveryInstruction"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Delivery Instructions
                </label>
                <textarea
                  id="receiverDeliveryInstruction"
                  {...register("receiverDeliveryInstruction")}
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#E30613] focus:border-[#E30613]"
                  placeholder="Any special instructions for delivery"
                ></textarea>
              </div>

              <div className="flex justify-between pt-4">
                <button
                  type="button"
                  onClick={() => setActiveSection("senderInfo")}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#E30613] transition-colors"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#E30613] text-white rounded-md hover:bg-[#C10511] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#E30613] transition-colors"
                >
                  Calculate & Submit
                </button>
              </div>
            </div>
          )}
        </form>
      </div>

      {/* Cost Confirmation Modal */}
      {showCostModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <div className="text-center">
              <h3
                className="text-lg font-bold mb-2"
                style={{ color: "#E30613" }}
              >
                Delivery Cost
              </h3>
              <p className="text-gray-700 mb-4">
                Your estimated delivery cost is:
              </p>
              <div
                className="text-3xl font-bold mb-6"
                style={{ color: "#FFD700" }}
              >
                ৳{deliveryCost}
              </div>

              <div className="flex flex-col space-y-3">
                <button
                  onClick={handleConfirm}
                  className="w-full px-4 py-2 bg-[#E30613] text-white rounded-md hover:bg-[#C10511] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#E30613] transition-colors"
                >
                  Confirm & Submit
                </button>
                <button
                  onClick={() => setShowCostModal(false)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#E30613] transition-colors"
                >
                  Go Back
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ParcelAddForm;
