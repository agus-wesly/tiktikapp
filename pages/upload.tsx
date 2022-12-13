import React, { useState, useEffect } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import { topics } from "../utils/constants";
import authState from "../store";
import { useRouter } from "next/router";
import { client } from "../utils/client";
import Image from "next/image";
import { SanityImageAssetDocument } from "@sanity/client";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import axios from "axios";
import { baseURL } from "../utils";

const Upload = () => {
  const [loading, setLoading] = useState(false);
  const [capt, setCapt] = useState("");
  const [selectedTopic, setSelectedTopic] = useState(topics[0].name);
  const [upFile, setUpFile] = useState<File | null>(null);
  const [newImg, setNewImg] = useState<null | string>(null);
  const [photoAsset, setPhotoAsset] = useState<SanityImageAssetDocument | null>(null);

  const router = useRouter();
  const { user } = authState();

  //Check if the user is logged in
  if (!user) {
    router.push("/");
  }

  useEffect(() => {
    if (upFile) {
      setLoading(true);
      client.assets
        .upload("image", upFile)
        .then((asset) => {
          setNewImg(asset.url);
          setPhotoAsset(asset);
          setLoading(false);
        })
        .catch((err) => console.log(err));
    }
  }, [upFile]);

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      //Check the type
      const validTypes = ["image/jpg", "image/png", "image/jpeg"];
      if (validTypes.includes(e.target.files[0]?.type) && e.target.files[0].size <= 10000000) {
        setUpFile(e.target.files[0]);
        // Upload to sanity
      } else {
        //Error handling
      }
    }
  };
  const handlePost = async () => {
    if (capt && selectedTopic && photoAsset?._id) {
      //New data
      const newData = {
        _type: "post",
        caption: capt,
        photo: {
          _type: "file",
          asset: {
            _type: "reference",
            _ref: photoAsset._id,
          },
        },
        userId: user?._id,
        postedBy: {
          _type: "postedBy",
          _ref: user?._id,
        },
        likes: [],
        comments: [],
        topic: selectedTopic,
      };
      //Post to backend
      try {
        setLoading(true);
        const resp = await axios.post(`${baseURL}/api/post`, newData);
        if (resp.status === 201) {
          router.push("/");
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="flex flex-col gap-5 items-center overflow-y-scroll h-full lg:h-[90vh]">
      {user && (
        <>
          <div className="flex flex-col gap-2 text-center mt-3 lg:mt-0">
            <h1 className="font-bold text-xl md:text-2xl">Upload Photo</h1>
            <p className="text-gray-500 md:text-lg">Post an image to your account</p>
          </div>
          <div className="flex flex-col lg:flex-row items-start h-full justify-evenly gap-5">
            <label className="cursor-pointer w-full lg:w-auto">
              <div
                className={`${
                  !newImg && "border-dashed border-gray-200 border-2"
                }  flex flex-col px-3 py-5 bg-white hover:bg-gray-50 items-center gap-5  lg:gap-0 hover:border-yellow-500 justify-evenly w-full lg:w-[230px] lg:aspect-[3/3 ] md:aspect-square xl:w-[440px] ${newImg ? "relative" : "static"}`}
              >
                {loading && (
                  <div className="w-full h-full flex flex-col gap-3 items-center bg-white justify-center">
                    <AiOutlineLoading3Quarters className="text-5xl animate-spin" />
                    <p>Uploading Image...</p>
                  </div>
                )}
                {newImg && (
                  <div className="inset-0 absolute">
                    <Image src={newImg} layout={"fill"} className="object-cover rounded-md" />
                  </div>
                )}
                {!loading && (
                  <>
                    <div className="flex flex-col gap-2 items-center">
                      <FaCloudUploadAlt className="text-5xl text-gray-300" />
                      <h2 className="font-semibold">Upload Photo</h2>
                    </div>

                    <div className="text-center text-sm lg:text-base flex flex-col lg:gap-3 text-gray-400">
                      <span>
                        JPG or JPEG or PNG format <br />
                      </span>
                      <span>
                        Less than 10 MB
                        <br />
                      </span>
                    </div>
                    <div className="w-full cursor-pointer bg-[#FF2676] hover:bg-[#e72d71] text-center py-3 text-white font-semibold">Select a File</div>
                    <input type="file" className="w-0 h-0" name="inputPhoto" onChange={handleChange} />
                  </>
                )}
              </div>
            </label>
            <div className="flex flex-col gap-1 lg:gap-3 w-full lg:w-auto">
              <label htmlFor="caption">Caption</label>
              <input type="text" className="border-gray-200 text-md xl:text-lg p-1 lg:p-3 border-2 outline-none font-semibold" autoComplete="false" id="caption" onChange={(e) => setCapt(e.target.value)} value={capt} />

              <label htmlFor="topic">Choose a topic</label>
              <select id="topic" className="border-gray-200 text-md xl:text-lg p-1 lg:p-3 border-2 outline-none font-semibold capitalize" onChange={(e) => setSelectedTopic(e.target.value)}>
                {topics.map((t, i) => (
                  <option value={t.name} key={i}>
                    {t.name}
                  </option>
                ))}
              </select>
              <div className="mt-5 flex gap-3 w-full justify-between">
                <button className="text-center font-semibold border-gray-200 border-2 cursor-pointer hover:bg-gray-50 bg-white w-[110px] h-[40px] lg:h-auto lg:w-[180px]">Discard</button>
                <button className="p-3 text-center font-semibold cursor-pointer hover:bg-[#e72d71] bg-[#FF2676] w-[110px] h-[40px] flex items-center justify-center  lg:h-auto lg:w-[180px] text-white" onClick={handlePost}>
                  Post
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Upload;
