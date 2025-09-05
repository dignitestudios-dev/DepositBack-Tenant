import React, { useState } from "react";
import { LuMapPin } from "react-icons/lu";
import Footer from "../../components/global/Footer";
import Header from "../../components/global/Header";
import imageone from "../../assets/propertydetail/home one.webp";
import imagetwo from "../../assets/propertydetail/home two.webp";
import imagethree from "../../assets/propertydetail/home three.webp";
import imagefour from "../../assets/propertydetail/home four.webp";
import imagefive from "../../assets/propertydetail/home five.webp";
import {
  FaArrowLeft,
  FaChevronRight,
  FaEnvelope,
  FaPhoneAlt,
  FaUser,
} from "react-icons/fa";
import { useLocation, useNavigate } from "react-router";
import { RiDeleteBinFill, RiEdit2Fill } from "react-icons/ri";
import user from "../../assets/user.png";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import backimage from "../../assets/propertydetail/back.png";
import { IoIosWarning } from "react-icons/io";
import { BsChevronRight } from "react-icons/bs";
import Modal from "../../components/global/Modal";
import ImageGallery from "../../components/app/ImageGallery";

const Linkpropertydetails = () => {
  const navigate = useNavigate("");
  const [showModal, setShowModal] = useState(false);
  // const images = [imagetwo, imageone, imagefive, imagethree, imagefour];

  const location = useLocation();
  const propertyDetail = location.state?.propertyDetail?.property;
  console.log("propertyDetail -- >", propertyDetail);

  const {
    isSubscriptionPaid,
    landlord,
    name,
    rent,
    address,
    uniquePropertyCode,
    deposit,
    description,
    id,
    images,
  } = propertyDetail;

  console.log(imageone);

  // console.log(images, "This is Images");
  return (
    <div className="max-w-[1260px] min-h-screen bg-[#f6f9ff] mx-auto pt-10">
      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-3">
          <button type="button" className="mb-6" onClick={() => navigate(-1)}>
            <FaArrowLeft size={18} />
          </button>
          <div>
            <h1 className="text-[26px] font-[600]">Property Details </h1>
            <p>
              Confirm your rental property. Verify that the following property
              details match your rental agreement.
            </p>
          </div>
        </div>
        {/* <div className="flex gap-4">
          <button className="bg-gradient-to-r from-[#003897] to-[#0151DA] text-white flex items-center gap-1 rounded-3xl px-4 py-2 font-medium">
            <FaUser />
            Report
          </button>
        </div> */}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-1 gap-6 bg-white p-6 rounded-2xl">
        {/* Main Image */}
        <div className="md:col-span-2">
          <div className="flex flex-col md:flex-row gap-4">
            <ImageGallery images={images} />
          </div>
        </div>
        <div className="bg-white p-6 w-[44em]">
          <div className="flex justify-between">
            <h2 className="!text-3xl font-semibold mb-2">{name}</h2>
            <div>
              <span className="text-[#0151DA] font-[600] ml-4 text-2xl">
                ${rent}
              </span>{" "}
              <span className="text-sm font-medium text-gray-400">/month</span>
            </div>
          </div>
          <div className="flex items-center text-gray-600 mb-2 font-[500]">
            <LuMapPin className="mr-1" /> {address}
          </div>
          <p className="text-1xl font-[500] text-gray-600 mb-2">
            Unique Code:{" "}
            <span className="text-blue-600 font-medium">
              {uniquePropertyCode}
            </span>
          </p>
          <div className="mt-4">
            <h3 className="!text-[20px] font-[500] mb-2">Description</h3>
            <p className="text-sm text-gray-700 leading-relaxed">
              {description}
            </p>
          </div>
          <div className="bg-[#F3F8FF] p-3 flex items-center justify-between rounded-2xl mt-4">
            <p>Deposit Amount</p>
            <span className="text-[#0151DA] font-[600] ml-4 text-2xl">
              ${deposit}
            </span>
          </div>
          <button
            onClick={() => {
              navigate("/app/pay-security-deposite", {
                state: { propertyId: id, depositAmount: deposit },
              });
            }}
            className="text-sm font-medium bg-gradient-to-r from-[#003897] to-[#0151DA] text-white p-3 rounded-full mt-7 w-full"
          >
            Proceed to Deposit
          </button>
        </div>

        {/* Tenant Sidebar */}
        <div className="bg-[#F3F8FF] w-[30em] rounded-2xl p-6">
          <div
            style={{ backgroundImage: `url(${backimage})` }}
            className="bg-cover bg-center rounded-3xl pl-3 pr-3 pt-3 pb-3 text-white"
          >
            <div className="flex gap-3 justify-between pt-3">
              <div className="flex gap-3">
                <img
                  src={user}
                  className="h-[3.3em] w-[3.3em] rounded-full object-cover cursor-pointer"
                  alt="User Avatar"
                />
                <div>
                  <span className="text-1xl font-[500]">
                    {landlord?.name || "N/A"}
                  </span>
                  <p className="text-sm text-white">Landlord</p>
                </div>
              </div>
              <div>
                <div className="bg-[#fff] p-3 rounded-xl">
                  <IoChatbubbleEllipsesOutline size={20} color="blue" />
                </div>
              </div>
            </div>

            <div className="text-sm text-white mb-4 mt-3 ml-3">
              <div className="flex justify-start gap-3">
                <p className="flex gap-2 items-center">
                  <FaEnvelope />
                  {landlord?.email || "N/A"}
                </p>
                <p className="flex gap-2 items-center">
                  <FaPhoneAlt />
                  {landlord?.phoneNo || "N/A"}
                </p>
              </div>
              <p className="flex gap-2 items-center mt-2">
                <IoIosWarning />
                Emergency: {landlord?.emergencyContact || "+1 000 000 000"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Linkpropertydetails;
