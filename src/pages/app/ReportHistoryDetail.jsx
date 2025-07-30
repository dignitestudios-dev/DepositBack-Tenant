import React from "react";
import {
  IoChevronBack,
  IoChevronForward,
  IoLocationOutline,
  IoEllipsisHorizontal,
  IoPlay,
} from "react-icons/io5";
import Footer from "../../components/global/Footer";
import Header from "../../components/global/Header";
import Pdficon from "../../assets/pdficon.png";
import { useNavigate } from "react-router";
export default function ReportDetailHistory() {
  const navigate = useNavigate("");
  return (
    <div className="min-h-screen bg-gray-50 ">
      <Header />
      <div className="max-w-7xl mt-10 mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6 sm:mb-8">
          <IoChevronBack
            onClick={() => navigate(-1)}
            className="w-6 h-6 text-gray-600 cursor-pointer hover:text-gray-800 transition-colors"
          />
          <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900">
            Report History
          </h1>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 lg:gap-8">
          {/* Left Column */}
          <div className="space-y-4 col-span-5 sm:space-y-6">
            {/* Property Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <img
                  src="https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=100&h=80&fit=crop&crop=house"
                  alt="Property"
                  className="w-full sm:w-20 h-32 sm:h-16 rounded-lg object-cover flex-shrink-0"
                />
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2 gap-2">
                    <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
                      Property Name
                    </h2>
                    <div className="text-left sm:text-right">
                      <span className="text-blue-600 font-semibold text-lg">
                        $1200
                      </span>
                      <span className="text-gray-500 text-sm ml-1">month</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-2 text-gray-600 mb-2">
                    <IoLocationOutline className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">
                      456 Maple Street, Anytown, NY 12345
                    </span>
                  </div>
                  <div className="text-sm text-gray-500">
                    Unique Code:{" "}
                    <span className="text-blue-600 font-medium">258496</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Landlord Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full gradient-color flex items-center justify-center text-white font-medium flex-shrink-0">
                    JT
                  </div>
                  <div>
                    <h3 className="font-[500] text-[14px] text-[#181818]">
                      Justin Timberlake
                    </h3>
                    <p className="text-gray-500 text-sm">Landlord</p>
                  </div>
                </div>
                <div
                  onClick={() => navigate("/app/property-detail",{state:{role:"history-detail"}})}
                  className="w-10 h-10 gradient-color rounded-lg flex items-center justify-center cursor-pointer hover:bg-blue-700 transition-colors flex-shrink-0"
                >
                  <IoChevronForward className="w-5 h-5 text-white" />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-2 col-span-7 sm:space-y-2">
            {/* Type Of Property */}
            <h3 className="font-[500] text-[14px] text-[#181818]">
              Type Of Property
            </h3>
            <input
              className="bg-white rounded-xl shadow-sm border outline-none border-gray-200 text-[#00000099] px-2 h-[48px] w-full"
              placeholder="Forced Entry"
            />

            {/* Date And Time */}
            <h3 className="font-[500] text-[14px] text-[#181818]">
              Date And Time
            </h3>
            <div className="bg-white rounded-xl flex flex-col justify-center shadow-sm border border-gray-200 px-2 h-[75px]">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="w-full border-r">
                  <label className="block text-[14px] font-medium text-[#181818] mb-1">
                    Date
                  </label>
                  <input
                    type="date"
                    placeholder="01-01-2025"
                    className="bg-transparent outline-none border-none "
                  />
                </div>
                <div className="w-full">
                  <label className="block text-[14px] font-medium text-[#181818] mb-1">
                    Time
                  </label>
                  <input
                    type="time"
                    placeholder="09:00 PM"
                    className="bg-transparent outline-none border-none "
                  />
                </div>
              </div>
            </div>

            {/* Witnesses */}
            <h3 className="font-[500] text-[14px] text-[#181818]">Witnesses</h3>
            <div className="grid grid-cols-6 gap-3">
              <div className="bg-[#FFFFFF] rounded-[16px] h-[45px] flex items-center justify-center">
                <span className="text-[#727272] text-sm">Witness 1</span>
              </div>
              <div className="bg-[#FFFFFF] rounded-[16px] h-[45px] flex items-center justify-center">
                <span className="text-[#727272] text-sm">Witness 2</span>
              </div>
              <div className="bg-[#FFFFFF] rounded-[16px] h-[45px] flex items-center justify-center">
                <span className="text-[#727272] text-sm">Witness 3</span>
              </div>
              <div className="bg-[#FFFFFF] rounded-[16px] h-[45px] flex items-center justify-center">
                <span className="text-[#727272] text-sm">Witness 4</span>
              </div>
            </div>

            {/* Description */}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <h3 className="font-[500] text-[14px] text-[#181818]">
                  Description
                </h3>
                <textarea
                  placeholder="Text goes here
"
                  className="bg-[#FFFFFF] text-[#727272] text-[14px] resize-none w-full outline-none h-[102px] rounded-lg p-4 "
                ></textarea>
              </div>
              <div>
                <h3 className="font-[500] text-[14px] text-[#181818]">
                  Description of Suspect
                </h3>{" "}
                <textarea
                  placeholder="Text goes here
"
                  className="bg-[#FFFFFF] text-[#727272] resize-none text-[14px] w-full outline-none h-[102px] rounded-lg p-4 "
                ></textarea>
              </div>
            </div>

            <div className="mt-6 lg:mt-8 space-y-4 sm:space-y-6">
              {/* First Videos Row */}
              <div className="rounded-xl  p-4 sm:p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-[500] text-[14px] text-[#181818]">
                    Videos
                  </h3>
                  <button className="text-blue-600 text-sm font-medium hover:underline">
                    View all
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="relative group cursor-pointer">
                    <img
                      src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=200&h=120&fit=crop"
                      alt="Video thumbnail"
                      className="w-full h-24 sm:h-28 rounded-lg object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-30 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <IoPlay className="w-6 h-6 text-white" />
                    </div>
                    <div className="absolute top-2 bg-[#FFFFFFA6] w-[25px] h-[15px] rounded-full right-2">
                      <IoEllipsisHorizontal className="w-4 h-4 mx-auto  text-black" />
                    </div>
                  </div>
                  <div className="relative group cursor-pointer">
                    <img
                      src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=200&h=120&fit=crop"
                      alt="Video thumbnail"
                      className="w-full h-24 sm:h-28 rounded-lg object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-30 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <IoPlay className="w-6 h-6 text-white" />
                    </div>
                    <div className="absolute top-2 bg-[#FFFFFFA6] w-[25px] h-[15px] rounded-full right-2">
                      <IoEllipsisHorizontal className="w-4 h-4 mx-auto  text-black" />
                    </div>
                  </div>
                  <div className="relative group cursor-pointer">
                    <img
                      src="https://images.unsplash.com/photo-1484154218962-a197022b5858?w=200&h=120&fit=crop"
                      alt="Video thumbnail"
                      className="w-full h-24 sm:h-28 rounded-lg object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-30 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <IoPlay className="w-6 h-6 text-white" />
                    </div>
                    <div className="absolute top-2 bg-[#FFFFFFA6] w-[25px] h-[15px] rounded-full right-2">
                      <IoEllipsisHorizontal className="w-4 h-4 mx-auto  text-black" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Second Videos Row */}
              <div className=" rounded-xl   p-4 sm:p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-[500] text-[14px] text-[#181818]">
                    Videos
                  </h3>
                  <button className="text-blue-600 text-sm font-medium hover:underline">
                    View all
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="relative group cursor-pointer">
                    <img
                      src="https://images.unsplash.com/photo-1560472355-536de3962603?w=200&h=120&fit=crop"
                      alt="Video thumbnail"
                      className="w-full h-24 sm:h-28 rounded-lg object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-30 rounded-lg flex items-center justify-center">
                      <IoPlay className="w-6 h-6 text-white" />
                    </div>
                    <div className="absolute top-2 bg-[#FFFFFFA6] w-[25px] h-[15px] rounded-full right-2">
                      <IoEllipsisHorizontal className="w-4 h-4 mx-auto  text-black" />
                    </div>
                  </div>
                  <div className="relative group cursor-pointer">
                    <img
                      src="https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=200&h=120&fit=crop"
                      alt="Video thumbnail"
                      className="w-full h-24 sm:h-28 rounded-lg object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-30 rounded-lg flex items-center justify-center">
                      <IoPlay className="w-6 h-6 text-white" />
                    </div>
                    <div className="absolute top-2 bg-[#FFFFFFA6] w-[25px] h-[15px] rounded-full right-2">
                      <IoEllipsisHorizontal className="w-4 h-4 mx-auto  text-black" />
                    </div>
                  </div>
                  <div className="relative group cursor-pointer">
                    <img
                      src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=200&h=120&fit=crop"
                      alt="Video thumbnail"
                      className="w-full h-24 sm:h-28 rounded-lg object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-30 rounded-lg flex items-center justify-center">
                      <IoPlay className="w-6 h-6 text-white" />
                    </div>
                    <div className="absolute top-2 bg-[#FFFFFFA6] w-[25px] h-[15px] rounded-full right-2">
                      <IoEllipsisHorizontal className="w-4 h-4 mx-auto  text-black" />
                    </div>
                  </div>
                </div>
              </div>

              {/* PDF Documents */}
              <div className="rounded-xl   p-3">
                <div className="grid grid-cols-6 -mt-8 gap-2">
                  <div className="flex bg-[#FFFFFF] p-2 shadow-md rounded-[14px] flex-col items-center cursor-pointer group">
                    <div className="text-end flex   rounded-[100px] justify-end   w-full">
                      <button className="bg-[#FFFFFFA6] w-[25px] h-[15px] shadow-sm  rounded-full">
                        <IoEllipsisHorizontal className="w-4 h-4 text-[#181818] mx-auto" />
                      </button>
                    </div>
                    <img
                      src={Pdficon}
                      alt="Pdficon"
                      className="w-[48px] h-[55px]"
                    />
                    <span className="text-[9px] text-nowrap mt-2 font-[500] text-center max-w-20">
                      Lease Agreement
                    </span>
                  </div>
                  <div className="flex bg-[#FFFFFF] p-2 shadow-md rounded-[14px] flex-col items-center cursor-pointer group">
                    <div className="text-end flex  rounded-[100px] justify-end  w-full">
                      <button className="bg-[#FFFFFFA6]  w-[25px] h-[15px] shadow-sm  rounded-full">
                        <IoEllipsisHorizontal className="w-4 h-4 text-[#181818] mx-auto" />
                      </button>
                    </div>
                    <img
                      src={Pdficon}
                      alt="Pdficon"
                      className="w-[48px] h-[55px]"
                    />
                    <span className="text-[9px] text-nowrap mt-2 font-[500] text-center max-w-20">
                      Contract Agreement
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Videos Section */}
      </div>
      <Footer />
    </div>
  );
}
