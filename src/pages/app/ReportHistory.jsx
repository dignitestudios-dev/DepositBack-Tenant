import React from "react";
import Header from "../../components/global/Header";
import Homeone from "../../assets/Homeone.png";
import Hometwo from "../../assets/Hometwo.png";
import Homethree from "../../assets/Homefour.png";
import { LuMapPin } from "react-icons/lu";
import user from "../../assets/user.png";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { useNavigate } from "react-router";
import Footer from "../../components/global/Footer";
export default function ReportHistory() {
  const navigate = useNavigate("");
  const properties = [
    {
      name: "Property Name",
      price: "$1200/month",
      address: "456 Maple Street, Anytown, NY 12345",
      tenant: "Mike Smith",
      status: "Active",
      uniqueCode: "258496",
      propertyimage: Homeone,
    },
    {
      name: "Property Name",
      price: "$1500/month",
      address: "180 Pinecrest Lane, Texas, 75609, USA",
      tenant: "No Tenant Assigned",
      status: "Inactive",
      uniqueCode: "534321",
      propertyimage: Hometwo,
    },
    {
      name: "Property Name",
      price: "$1200/month",
      address: "456 Maple Street, Anytown, NY 12345",
      tenant: "Mike Smith",
      status: "Active",
      uniqueCode: "258496",
      propertyimage: Homethree,
    },
    {
      name: "Property Name",
      price: "$1200/month",
      address: "456 Maple Street, Anytown, NY 12345",
      tenant: "Mike Smith",
      status: "Active",
      uniqueCode: "258496",
      propertyimage: Homeone,
    },
    {
      name: "Property Name",
      price: "$1500/month",
      address: "180 Pinecrest Lane, Texas, 75609, USA",
      tenant: "No Tenant Assigned",
      status: "Inactive",
      uniqueCode: "534321",
      propertyimage: Hometwo,
    },
    {
      name: "Property Name",
      price: "$1200/month",
      address: "456 Maple Street, Anytown, NY 12345",
      tenant: "Mike Smith",
      status: "Active",
      uniqueCode: "258496",
      propertyimage: Homethree,
    },
  ];
  return (
    <div className="min-h-screen">
      <Header />
      <div className="max-w-[90em] mx-auto py-6 px-[4em]">
        <div className="flex flex-wrap justify-between items-center gap-6 p-0">
          <div className="text-left">
            <p className="mt-2 text-[32px] font-bold text-black pt-2">
              Report History
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-5 ">
          {properties.map((property, index) => (
            <div
              key={index}
              className="bg-white p-3 rounded-2xl shadow-lg overflow-hidden"
            >
              <div className="relative">
                {/* Image */}
                <img
                  src={property.propertyimage}
                  alt="Property"
                  className="w-full h-[13em] object-cover rounded-2xl"
                />
              </div>
              <div className="p-4">
                <div className="flex justify-between items-center">
                  <span
                    className="text-[18px] font-[500] cursor-pointer"
                    onClick={() => {
                      navigate("/app/report-detail");
                    }}
                  >
                    {property.name}
                  </span>
                  <p className="mt-2 text-lg font-semibold text-[#0151DA]">
                    {property.price}
                  </p>
                </div>
                <div className="flex gap-1 pt-2 items-center">
                  <LuMapPin size={16} />
                  <p className="text-gray-500 font-[500] text-sm">
                    {property.address}
                  </p>
                </div>
                <span className="text-sm text-black">
                  Unique Code: &nbsp;
                  <span className="text-blue-600 font-semibold">
                    {property.uniqueCode}
                  </span>
                </span>
                <br />
                <div className="flex gap-3 justify-between pt-3">
                  <div className="flex gap-3">
                    <img
                      src={user}
                      className="h-10 w-10 rounded-full object-cover cursor-pointer"
                      alt="User Avatar"
                    />
                    <div>
                      <span className="text-1xl">{property.tenant}</span>
                      <p className="text-sm text-gray-500">Tenant</p>
                    </div>
                  </div>
                  <div>
                    <div className="bg-[#0151DA] p-3 rounded-xl cursor-pointer">
                      <IoChatbubbleEllipsesOutline
                        onClick={() => {
                          navigate("/app/messages");
                        }}
                        size={20}
                        color="white"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer/>
    </div>
  );
}
