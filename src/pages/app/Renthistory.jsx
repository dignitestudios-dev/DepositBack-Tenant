import { FaArrowLeft } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router";
import Modal from "../../components/global/Modal";
import { useState } from "react";
import { ErrorToast, SuccessToast } from "../../components/global/Toaster";
import axios from "../../axios";
import { RiLoader5Line } from "react-icons/ri";
import { useFetchData } from "../../hooks/api/Get";

const RentHistory = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { lateFeeAmount, paymentStatus, rentDueDate, rent, propertyId } =
    location.state || {};
  console.log("🚀 ~ RentHistory ~ propertyId:", propertyId);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const rentData = [
    { date: "Jan 1, 2025", status: "Received", amount: "$1200.00" },
    { date: "Feb 1, 2025", status: "Received", amount: "$1260.00" },
    { date: "Mar 1, 2025", status: "Received", amount: "$1200.00" },
    { date: "Apr 1, 2025", status: "Received", amount: "$1260.00" },
    { date: "May 1, 2025", status: "Received", amount: "$1200.00" },
    { date: "Jun 1, 2025", status: "Received", amount: "$1260.00" },
    { date: "Jul 1, 2025", status: "Received", amount: "$1200.00" },
    { date: "Aug 1, 2025", status: "Received", amount: "$1200.00" },
    { date: "Sep 1, 2025", status: "Received", amount: "$1260.00" },
  ];

  const handlePayRent = async () => {
    try {
      setLoading(true);
      const response = await axios.post(`/properties/rent/${propertyId}`, {
        currentDate: new Date().toLocaleString(),
      });
      if (response.status === 200) {
        if (response?.data?.data) {
          console.log("Response --- > ", response);
        } else {
          SuccessToast("Rent Paid");
          navigate(-1);
        }
      }
    } catch (error) {
      ErrorToast(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  const {
    data,
    loading: isLoading,
    pagination,
  } = useFetchData(
    `/properties/rent/history/${propertyId}`,
    { currentDate: new Date().toLocaleString() },
    1,
    ""
  );
  console.log("🚀 ~ RentHistory ~ data:", data);

  return (
    <div className="min-h-screen bg-[#F6FAFF] p-6 text-[#333]">
      <div className="max-w-[1260px] mx-auto">
        <div className="flex gap-3 items-center mb-10 pt-3">
          <button type="button" onClick={() => navigate(-1)}>
            <FaArrowLeft size={20} />
          </button>
          <h1 className="text-3xl font-[600]">Rent History</h1>
        </div>

        <div className="flex justify-between gap-4">
          <div className="w-full">
            <div className="bg-white shadow-md rounded-2xl p-6 mb-6 h-40">
              <div className="flex justify-between">
                <div className="w-full">
                  <div className="flex items-center justify-between">
                    <p className="text-black font-[500] text-[16px]">
                      Total Paid
                    </p>
                    <p className="text-lg ">$7200</p>
                  </div>
                  <div className="flex items-center justify-between pt-2 pb-2">
                    <p className="text-black font-[500] text-[16px]">
                      Upcoming Rent Due
                    </p>
                    <p className="text-lg ">
                      ${rent} on {rentDueDate}
                    </p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-black font-[500] text-[16px]">
                      Payment Status
                    </p>
                    <span
                      className={`${
                        paymentStatus === "Paid"
                          ? "bg-green-100 text-green-600"
                          : "bg-yellow-100 text-yellow-600"
                      }  font-medium text-sm px-8 py-1 rounded-full`}
                    >
                      {paymentStatus || "Pending"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            {paymentStatus !== "Paid" && (
              <button
                disabled={loading}
                onClick={handlePayRent}
                className=" w-full bg-gradient-to-r from-[#003897] to-[#0151DA] text-white font-medium px-[4em] py-3 rounded-full hover:bg-[#002f7a] transition"
              >
                <div className="flex justify-center items-center">
                  <span className="mr-1">Pay Your Rent</span>
                  {loading && (
                    <RiLoader5Line className="animate-spin text-lg" />
                  )}
                </div>
              </button>
            )}
          </div>

          {data?.length > 0 ? (
            <div className="bg-white shadow-md rounded-2xl p-4 divide-y w-full">
              {data?.map((entry, idx) => (
                <div
                  key={idx}
                  className="py-4 flex flex-col sm:flex-row sm:justify-between sm:items-center pl-3 pr-3"
                >
                  <p className="text-sm font-[400] text-gray-700">
                    {entry.date}
                  </p>
                  <p className="text-sm text-gray-600">{entry.status}</p>
                  <p className="text-sm text-gray-900 font-[500]">
                    {entry.amount}
                  </p>
                  <a
                    href="#"
                    className="text-sm text-blue-600 font-medium hover:underline"
                  >
                    View Invoice
                  </a>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white shadow-md rounded-2xl p-4 divide-y w-full">
              No record found
            </div>
          )}
        </div>

        <Modal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          data={{
            title: "Reminder Sent!",
            description: "Reminder of rent due has been sent to the tenant.",

            iconBgColor: "bg-blue-600", // Optional
          }}
        />
      </div>
    </div>
  );
};

export default RentHistory;
