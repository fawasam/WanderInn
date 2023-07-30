import axios from "axios";
import Perks from "../components/Perks";
import toast from "react-hot-toast";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
const PlacePage = () => {
  const { action } = useParams();
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [photoLink, setPhotoLink] = useState("");
  const [description, setDescription] = useState("");
  const [perks, setPerks] = useState([]);
  const [extraInfo, setExtraInfo] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [maxGuests, setMaxGuests] = useState(1);
  const [price, setPrice] = useState(100);

  function inputHeader(text) {
    return <h2 className="addPlace">{text}</h2>;
  }

  function inputDescription(text) {
    return <p className="text-gray-500 text-sm addPlace">{text}</p>;
  }
  function preInput(header, description) {
    return (
      <>
        {inputHeader(header)}
        {inputDescription(description)}
      </>
    );
  }

  async function addPhotoByLink(e) {
    e.preventDefault();
    const { data: filename } = await axios.post("/upload-by-link", {
      link: photoLink,
    });
    setAddedPhotos((prev) => {
      return [...prev, filename];
    });
    toast.success("Photos added successfully");
    setPhotoLink("");
  }

  function uploadPhoto(e) {
    const files = e.target.files;
    const data = new FormData();
    for (let i = 0; i < files.length; i++) {
      data.append("photos", files[i]);
    }
    axios
      .post("/upload", data, {
        headers: { "Content-type": "multipart/form-data" },
      })
      .then((response) => {
        const { data: filenames } = response;
        setAddedPhotos((prev) => {
          return [...prev, ...filenames];
        });
        toast.success("Photos added successfully");
      });
  }

  return (
    <div>
      {action !== "new" && (
        <div className="text-center">
          <Link className="inline-flex gap-1 primary " to={"/"}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
            Add new place
          </Link>
        </div>
      )}
      {action === "new" && (
        <div className="md:px-20 px-2">
          <form>
            {preInput(
              "Title",
              "Title for your place. should be short and catchy as in advertisement"
            )}
            <input
              type="text"
              placeholder="title"
              value={title}
              onChange={(ev) => setTitle(ev.target.value)}
            />

            {preInput("Address", "Address to this place")}
            <input
              type="text"
              placeholder="address"
              value={address}
              onChange={(ev) => setAddress(ev.target.value)}
            />

            {preInput("Photos", "more = better")}
            <div className="flex gap-2">
              <input
                type="text"
                placeholder={"Add using a link ... jpeg"}
                value={photoLink}
                onChange={(ev) => setPhotoLink(ev.target.value)}
              />
              <button
                className="bg-gray-200 px-4   rounded-full "
                onClick={addPhotoByLink}
              >
                Add&nbsp;photo
              </button>
            </div>

            <div className="mt-2 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
              {addedPhotos.length > 0 &&
                addedPhotos.map((link, id) => (
                  <div key={id} className="h-32 flex ">
                    <img
                      className="rounded-xl gap-2 mr-2 w-full object-cover position-center"
                      src={`http://localhost:5000/uploads/${link}`}
                      alt={"image"}
                    />
                  </div>
                ))}
              <label className=" h-32 border item-center bg-transparent rounded-2xl p-2 text-2xl text-gray-600 flex justify-center  items-center cursor-pointer">
                <input
                  type="file"
                  className="hidden "
                  multiple
                  onChange={uploadPhoto}
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                  />
                </svg>
                Upload
              </label>
            </div>

            {preInput("Description", "description of the place")}
            <textarea
              placeholder="description"
              value={description}
              onChange={(ev) => setDescription(ev.target.value)}
            />

            {preInput("Perks", "select all the perks of your place")}
            <Perks selected={perks} onChange={setPerks} />

            {preInput("Extra info", "house rules, etc")}
            <textarea
              placeholder="extra info"
              onChange={(ev) => setExtraInfo(ev.target.value)}
            />

            {preInput(
              "Check in&out times",
              "add check in and out times, remember to have some time window for cleaning the room between guests"
            )}
            <div className="grid sm:grid-cols-3 gap-2">
              <div>
                <h3 className="mt-2">Check in time</h3>
                <input
                  type="text"
                  placeholder="14:00"
                  value={checkIn}
                  onChange={(ev) => setCheckIn(ev.target.value)}
                />
              </div>
              <div>
                <h3 className="mt-2">Check out time</h3>
                <input
                  type="text"
                  value={checkOut}
                  onChange={(ev) => setCheckOut(ev.target.value)}
                />
              </div>
              <div>
                <h3 className="mt-2">Max number of guests</h3>
                <input
                  type="number"
                  alue={maxGuests}
                  onChange={(ev) => setMaxGuests(ev.target.value)}
                />
              </div>
              <div>
                <h3 className="mt-2 -mb-1">Price per night</h3>
                <input
                  type="number"
                  value={price}
                  onChange={(ev) => setPrice(ev.target.value)}
                />
              </div>
            </div>
            <div>
              <button className="primary my-4">Save</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default PlacePage;
