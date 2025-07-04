import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import useAxiosSecure from "../../hook/useAxiosSecure";

const MakeAdmin = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [searchEmail, setSearchEmail] = useState("");
  const [searchText, setSearchText] = useState("");

  // Fetch user by email
  const {
    data: user,
    refetch,
    isFetching,
  } = useQuery({
    queryKey: ["searchedUser", searchEmail],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users?email=${searchEmail}`);
      return res.data;
    },
    enabled: false, // Will run only when refetch is called
  });

  // Mutation to make user admin
  const { mutate: makeAdmin, isPending: isMakingAdmin } = useMutation({
    mutationFn: async (email) => {
      const res = await axiosSecure.patch(`/users/admin/${email}`);
      return res.data;
    },
    onSuccess: () => {
      toast.success("User has been made admin successfully");
      queryClient.invalidateQueries({ queryKey: ["searchedUser"] });
      setSearchEmail("");
      setSearchText("");
    },
    onError: () => {
      toast.error("Failed to make admin. Please try again.");
    },
  });

  // Handle Search
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchText) {
      setSearchEmail(searchText);
      refetch();
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center mb-6 text-[#E30613]">
        Make User Admin
      </h2>

      {/* Search Form */}
      <form onSubmit={handleSearch} className="flex gap-4 mb-6">
        <input
          type="email"
          placeholder="Enter user email"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFD700]"
          required
        />
        <button
          type="submit"
          className="bg-[#E30613] text-white px-6 py-2 rounded-lg hover:bg-[#C00511] transition-all"
        >
          {isFetching ? "Searching..." : "Search"}
        </button>
      </form>

      {/* Search Result */}
      {user && user.email ? (
        <div className="bg-gray-100 p-4 rounded-lg flex items-center justify-between">
          <div>
            <p className="font-semibold">{user.name}</p>
            <p className="text-sm text-gray-600">{user.email}</p>
            <p className="text-sm text-gray-600">Role: {user.role || "user"}</p>
          </div>

          <button
            onClick={() => makeAdmin(user.email)}
            className={`bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-all ${
              isMakingAdmin ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={isMakingAdmin || user.role === "admin"}
          >
            {user.role === "admin"
              ? "Already Admin"
              : isMakingAdmin
              ? "Making Admin..."
              : "Make Admin"}
          </button>
        </div>
      ) : (
        searchEmail &&
        !isFetching && (
          <p className="text-center text-gray-600">User not found.</p>
        )
      )}
    </div>
  );
};

export default MakeAdmin;
