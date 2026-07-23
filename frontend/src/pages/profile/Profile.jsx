import { useEffect, useState } from "react";
import api from "../../services/api";

function Profile() {
  const [user, setUser] = useState({});
  const [editing, setEditing] = useState(false);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [image, setImage] = useState(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await api.get("/auth/profile", {
        headers: {
          Authorization: token,
        },
      });

      setUser(response.data.user);

      setName(response.data.user.name || "");
      setPhone(response.data.user.phone || "");
      setLocation(response.data.user.location || "");
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem("token");

      const formData = new FormData();

      formData.append("name", name);
      formData.append("phone", phone);
      formData.append("location", location);

      if (image) {
        formData.append("profileImage", image);
      }

      console.log("SUBMITTING BODY:", { name, phone, location });
      console.log("SUBMITTING FILE:", image);

      const response = await api.put("/auth/profile", formData, {
        headers: {
          Authorization: token,
        },
      });

      alert(response.data.message);

      setEditing(false);
      setImage(null);

      fetchProfile();
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Update Failed");
    }
  };

  return (
    <div className="min-h-screen bg-green-50 py-10 px-5">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-8">
        <h1 className="text-4xl font-bold text-center text-green-700 mb-8">
          👤 My Profile
        </h1>

        {/* Profile Image & Upload Section */}
        <div className="flex flex-col items-center justify-center">
          <img
            src={
              image
                ? URL.createObjectURL(image)
                : user.profileImage
                ? user.profileImage
                : "https://cdn-icons-png.flaticon.com/512/149/149071.png"
            }
            alt="Profile"
            className="w-40 h-40 rounded-full border-4 border-green-600 object-cover shadow-md"
          />

          {/* ALWAYS RENDERED INPUT/LABEL SO IT NEVER DISAPPEARS */}
          <div className="mt-5 flex flex-col items-center w-full">
            <input
              id="profileImageInput"
              type="file"
              accept="image/*"
              className="hidden"
              disabled={!editing}
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  setImage(e.target.files[0]);
                }
              }}
            />

            <label
              htmlFor="profileImageInput"
              className={`font-semibold px-6 py-2.5 rounded-lg transition shadow-md text-center ${
                editing
                  ? "cursor-pointer bg-green-700 text-white hover:bg-green-800"
                  : "cursor-not-allowed bg-gray-300 text-gray-500 opacity-60"
              }`}
            >
              📷 Choose New Photo
            </label>

            {image && (
              <p className="text-xs text-green-600 font-medium mt-2">
                ✓ File selected: {image.name}
              </p>
            )}
          </div>
        </div>

        {/* Form Inputs */}
        <div className="mt-8 space-y-5">
          <div>
            <label className="font-semibold text-gray-700">Name</label>
            <input
              type="text"
              value={name}
              disabled={!editing}
              onChange={(e) => setName(e.target.value)}
              className="w-full border rounded-lg p-3 mt-2 disabled:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-600"
            />
          </div>

          <div>
            <label className="font-semibold text-gray-700">Email</label>
            <input
              type="email"
              value={user.email || ""}
              disabled
              className="w-full border rounded-lg p-3 mt-2 bg-gray-100 text-gray-500 cursor-not-allowed"
            />
          </div>

          <div>
            <label className="font-semibold text-gray-700">Phone</label>
            <input
              type="text"
              value={phone}
              disabled={!editing}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full border rounded-lg p-3 mt-2 disabled:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-600"
            />
          </div>

          <div>
            <label className="font-semibold text-gray-700">Location</label>
            <input
              type="text"
              value={location}
              disabled={!editing}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full border rounded-lg p-3 mt-2 disabled:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-600"
            />
          </div>

          <div>
            <label className="font-semibold text-gray-700">Role</label>
            <input
              type="text"
              value={user.role || ""}
              disabled
              className="w-full border rounded-lg p-3 mt-2 bg-gray-100 text-gray-500 cursor-not-allowed"
            />
          </div>

          <div>
            <label className="font-semibold text-gray-700">Joined On</label>
            <input
              type="text"
              value={
                user.createdAt
                  ? new Date(user.createdAt).toLocaleDateString()
                  : ""
              }
              disabled
              className="w-full border rounded-lg p-3 mt-2 bg-gray-100 text-gray-500 cursor-not-allowed"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center gap-5 mt-10">
          {!editing ? (
            <button
              onClick={() => setEditing(true)}
              className="bg-green-700 text-white font-medium px-8 py-3 rounded-lg hover:bg-green-800 transition shadow"
            >
              Edit Profile
            </button>
          ) : (
            <>
              <button
                onClick={handleUpdate}
                className="bg-blue-600 text-white font-medium px-8 py-3 rounded-lg hover:bg-blue-700 transition shadow"
              >
                Save
              </button>

              <button
                onClick={() => {
                  setEditing(false);
                  setImage(null);
                  fetchProfile();
                }}
                className="bg-red-600 text-white font-medium px-8 py-3 rounded-lg hover:bg-red-700 transition shadow"
              >
                Cancel
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;