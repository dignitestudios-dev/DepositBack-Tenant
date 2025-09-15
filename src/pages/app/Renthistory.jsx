import { FaArrowLeft } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router";
import Modal from "../../components/global/Modal";
import { useMemo, useState } from "react";
import { ErrorToast, SuccessToast } from "../../components/global/Toaster";
import axios from "../../axios";
import { RiLoader5Line } from "react-icons/ri";
import { useFetchData } from "../../hooks/api/Get";
import { getDateFormat } from "../../lib/helpers";

const RentHistory = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { propertyId, contractId } = location.state || {};
  console.log("🚀 ~ RentHistory ~ contractId 15-->:", contractId);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const currentDate = useMemo(() => new Date().toISOString(), []);

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
    `/properties/rent/history/${contractId}`,
    { currentDate },
    1,
    ""
  );
  console.log("🚀 ~ RentHistory ~ data:", data);

  return (
    <div className="min-h-screen bg-[#F6FAFF] p-6 text-[#333]">
      {isLoading ? (
        <div className="max-w-[1260px] mx-auto">
          <div className="flex gap-3 items-center mb-10 pt-3">
            <button type="button" onClick={() => navigate(-1)}>
              <FaArrowLeft size={20} />
            </button>
            <h1 className="text-3xl font-[600]">Rent History</h1>
          </div>
          <div className="flex justify-between items-center gap-2">
            <div className="bg-white shadow-md rounded-2xl p-6 mb-6 h-40 w-full"></div>
            <div className="bg-white shadow-md rounded-2xl p-6 mb-6 h-40 w-full"></div>
          </div>
        </div>
      ) : (
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
                      <p className="text-lg ">${data?.summary?.amountDue}</p>
                    </div>
                    <div className="flex items-center justify-between pt-2 pb-2">
                      <p className="text-black font-[500] text-[16px]">
                        Upcoming Rent Due
                      </p>
                      <p className="text-lg ">
                        ${data?.summary?.amountDue} on{" "}
                        {getDateFormat(data?.summary?.nextDueDate)}
                      </p>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-black font-[500] text-[16px]">
                        Payment Status
                      </p>
                      <span
                        className={`${
                          data?.summary?.paymentStatus === "Paid"
                            ? "bg-green-100 text-green-600"
                            : "bg-yellow-100 text-yellow-600"
                        }  font-medium text-sm px-8 py-1 rounded-full`}
                      >
                        {data?.summary?.paymentStatus || "Pending"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              {data?.summary?.paymentStatus !== "Paid" && (
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

            {data?.rentHistory?.length > 0 ? (
              <div className="bg-white shadow-md rounded-2xl p-4 w-full">
                {/* Headers */}
                <div className="grid grid-cols-4 gap-4 font-semibold text-gray-800 border-b pb-2">
                  <p>Paid On</p>
                  <p>For Month</p>
                  <p>Amount</p>
                  <p>Invoice</p>
                </div>

                {/* Entries */}
                {data?.rentHistory?.map((entry, idx) => (
                  <div
                    key={idx}
                    className="grid grid-cols-4 gap-4 items-center py-3 border-b last:border-b-0"
                  >
                    {/* Paid Date */}
                    <p className="text-sm text-gray-700">
                      {getDateFormat(entry.paidOn)}
                    </p>

                    {/* For Month */}
                    <p className="text-sm text-gray-600">{entry.forMonth}</p>

                    {/* Amount */}
                    <p className="text-sm text-gray-900 font-[500]">
                      ${entry.amount}
                      {entry.lateFee > 0 && (
                        <span className="ml-2 text-red-500 text-xs">
                          + Late Fee ${entry.lateFee}
                        </span>
                      )}
                    </p>

                    {/* Invoice Link */}
                    <a
                      href={entry.invoice}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-blue-600 font-medium hover:underline"
                    >
                      View Invoice
                    </a>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white shadow-md justify-items-center p-8 items-center rounded-2xl w-full">
              <p className="text-gray-500 text-center" >
                No rent history available
              </p>
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
      )}
    </div>
  );
};

export default RentHistory;
