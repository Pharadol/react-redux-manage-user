import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchUser, editUser, createUser } from "../actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
function UserEdit() {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
  });
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser);
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      dispatch(fetchUser(id));
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (currentUser && id) {
      setUserData(currentUser);
    }
  }, [currentUser, id]);

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async () => {
    console.log(userData);
    console.log(id);
    if (id) {
      const response = await dispatch(editUser(userData));
      if (response.success) {
        alert("Edit user successful!");
      }
    } else {
      const response = await dispatch(createUser(userData));
      if (response.success) {
        alert("Create user successful!");
      }
    }
  };
  return (
    <div className="container mx-auto p-4">
      <Link to="/">
        <button className="rounded bg-blue-500 px-3 py-1 text-white mb-8 hover:bg-blue-600">
          Back
        </button>
      </Link>
      <h1 className="mb-4 font-semibold text-2xl">
        {id? "Edit User" : "Create User"}
      </h1>
      <input
        type="text"
        name="name"
        value={userData.name}
        onChange={handleChange}
        placeholder="Name"
        className="mb-2 w-full rounded border p-2"
      />
      <input
        type="email"
        name="email"
        value={userData.email}
        onChange={handleChange}
        placeholder="Email"
        className="mb-2 w-full rounded border p-2"
      />
      <input
        type="text"
        name="phoneNumber"
        value={userData.phone}
        onChange={handleChange}
        placeholder="Phone Number"
        className="mb-4 w-full rounded border p-2"
      />

      <button
        onClick={handleSave}
        className="rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600"
      >
        Save
      </button>
    </div>
  );
}

export default UserEdit;
