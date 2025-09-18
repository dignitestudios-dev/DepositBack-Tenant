import React from "react";
import Header from "../../components/global/Header";
import Footer from "../../components/global/Footer";
import { LuMapPin } from "react-icons/lu";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { useNavigate } from "react-router";
import user from "../../assets/user.png";
import { useFetchData } from "../../hooks/api/Get";
import DashboardSkeletonLoader from "../../components/app/dashboard/DashboardSkeletonLoader";
import { useTranslation } from "react-i18next";

export default function ReportHistory() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { data: reports, loading } = useFetchData("/reports"); // Adjust endpoint if needed

  return (
    <div className="min-h-screen">
      {/* <Header /> */}
      <div className="max-w-[90em] mx-auto py-6 px-[4em]">
        <div className="flex flex-wrap justify-between items-center gap-6 p-0">
          <div className="text-left">
            <p className="mt-2 text-[32px] font-[600] text-black pt-2">
              {t("headings.reportHistory")}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-5">
          {!loading && reports.length > 0 ? (
            reports.map((report, index) => {
              const property = report.property;
              const landlord = report.landlord;

              return (
                <div
                  key={index}
                  className="bg-white p-3 rounded-2xl shadow-lg overflow-hidden"
                >
                  <div className="relative">
                    <img
                      src={property?.images?.[0] || user}
                      alt="Property"
                      className="w-full h-[13em] object-cover rounded-2xl"
                    />
                  </div>
                  <div className="p-4">
                    <div className="flex justify-between items-center">
                      <span
                        className="text-[18px] font-[500] cursor-pointer"
                        onClick={() =>
                          navigate("/app/report-detail", { state: { report } })
                        }
                      >
                        {property?.name || "Unnamed Property"}
                      </span>
                      <p className="mt-2 text-lg font-semibold text-[#0151DA]">
                        ${property?.rent || 0}/month
                      </p>
                    </div>
                    <div className="flex gap-1 pt-2 items-center">
                      <LuMapPin size={16} />
                      <p className="text-gray-500 font-[500] text-sm">
                        {property?.address || "No address provided"}
                      </p>
                    </div>
                    <span className="text-sm text-black">
                      Unique Code: &nbsp;
                      <span className="text-blue-600 font-semibold">
                        {property?.uniquePropertyCode || "N/A"}
                      </span>
                    </span>
                    <br />
                    <div className="flex gap-3 justify-between pt-3">
                      <div className="flex gap-3">
                        <img
                          src={landlord?.profilePicture || user}
                          className="h-10 w-10 rounded-full object-cover cursor-pointer"
                          alt="User Avatar"
                        />
                        <div>
                          <span className="text-1xl">
                            {landlord?.name || "Unknown"}
                          </span>
                          <p className="text-sm text-gray-500">Landlord</p>
                        </div>
                      </div>
                      <div>
                        <div className="bg-[#0151DA] p-3 rounded-xl cursor-pointer">
                          <IoChatbubbleEllipsesOutline
                            onClick={() => navigate("/app/messages")}
                            size={20}
                            color="white"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          ) : loading ? (
            <div className="text-center col-span-3">
              <DashboardSkeletonLoader />
            </div>
          ) : (
            <p className="text-center col-span-3">No reports found.</p>
          )}
        </div>
      </div>
      {/* <Footer /> */}
    </div>
  );
}
