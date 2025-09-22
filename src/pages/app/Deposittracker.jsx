import React, { Fragment, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router";
import invoice from "../../assets/invoice.png";
import { useLocation } from "react-router";
import { TiWarning } from "react-icons/ti";
import { IoMdCheckmark } from "react-icons/io";
import { useFetchData } from "../../hooks/api/Get";
import { useTranslation } from "react-i18next";

const Deposittracker = () => {
  const { t } = useTranslation();
  const navigate = useNavigate("");
  const location = useLocation();
  const { depositTracker } = location.state || {};
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [depostreleasedpopup, setDepostreleasedpopup] = useState(false);

  const { data, loading, pagination } = useFetchData(
    `/deposits/${depositTracker}`,
    {},
    1,
    ""
  );

  return (
    <div className="max-w-[1260px] mx-auto px-6 pt-8 pb-20 min-h-screen bg-[#F6FAFF] text-[#333]">
      {/* Back + Title */}
      <div className="flex items-center gap-3 mb-2">
        <button type="button" onClick={() => navigate(-1)}>
          <FaArrowLeft size={20} />
        </button>

        <h1 className="text-3xl font-[600]">{t("headings.depositTracker")}</h1>
      </div>
      {/* <p className="text-lg text-gray-600 mb-6 max-w-full pt-3">
        {isReleasing
          ? "Review the move-out inspection and finalize the deposit refund process for the tenant."
          : "You can manage the deposit reserved for your tenant. Keep track of deductions, view history, and release the amount when the agreement ends."}
      </p> */}

      {loading ? (
        <div className="mt-4 w-full h-[430px] overflow-y-auto">
          <div className="flex items-center w-full py-3 border-gray-100">
            <div className="bg-white flex p-2 w-full">
              <div className="py-3 px-2">
                <div className="w-full h-[20px] bg-gray-200 rounded animate-pulse mb-2"></div>
                <div className="w-full h-[20px] bg-gray-200 rounded animate-pulse"></div>
              </div>
            </div>
          </div>

          <div className="flex items-center w-full py-3 border-gray-100">
            <div className="bg-white flex p-2 w-full">
              <div className="py-3 px-2">
                <div className="w-full h-[20px] bg-gray-200 rounded animate-pulse mb-2"></div>
                <div className="w-full h-[20px] bg-gray-200 rounded animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          {/* Total Deposit Amount Card */}
          <div className="bg-white rounded-xl shadow-sm p-8 flex flex-col md:flex-row items-center justify-between mb-6">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">
                Total Deposit Amount
              </p>
              <p className="text-4xl font-[600] text-blue-700">
                ${data?.depositTracker?.totalDeposit}
              </p>
            </div>

            {showRequestModal && (
              <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
                <div className="bg-white rounded-xl shadow-xl p-6 w-[90%] max-w-sm text-center">
                  <div className="bg-[#FF3B30] text-[#fff] p-6 w-fit mx-auto rounded-full mb-3">
                    <TiWarning size={40} />
                  </div>
                  <h2 className="font-semibold text-[20px] mb-2">
                    Release Deposit Amount
                  </h2>
                  <p className="text-sm text-gray-600 mb-4">
                    Are you sure you want to release the refundable deposit of
                    $2300 to [Tenant Name]? This action cannot be undone.
                  </p>
                  <div className="flex justify-center gap-3">
                    <button
                      className="px-8 py-2 text-sm bg-gray-200 rounded-full"
                      onClick={() => setShowRequestModal(false)}
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => {
                        setShowRequestModal(false);
                        setDepostreleasedpopup(true);
                        setTimeout(() => {
                          navigate("/app/property-detail");
                        }, 2000);
                      }}
                      className="px-8 py-2 text-sm bg-[#FF3B30] text-white rounded-full"
                    >
                      Confirm
                    </button>
                  </div>
                </div>
              </div>
            )}

            {depostreleasedpopup && (
              <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
                <div className="bg-white rounded-xl shadow-xl p-6 w-[90%] max-w-sm text-center">
                  <div className="bg-gradient-to-r from-[#003897] to-[#0151DA] text-[#fff] p-6 w-fit mx-auto rounded-full mb-3">
                    <IoMdCheckmark size={40} />
                  </div>
                  <h2 className="font-semibold text-[20px] mb-2">
                    Deposit Released!
                  </h2>
                  <p className="text-sm text-gray-600 mb-4">
                    Are you sure you want to release the refundable deposit of
                    $2300 to [Tenant Name]? This action cannot be undone.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Receipts and Deductions Section */}
          <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
            <h3 className="text-md text-black font-semibold mb-4">
              Receipts and Deductions
            </h3>
            {data?.deductions?.length > 0 ? (
              <Fragment>
                {data?.deductions?.map((item, index) => (
                  <div
                    key={item._id || index}
                    className="bg-[#F3F3F3] p-6 rounded-2xl items-start my-2"
                  >
                    <h1 className="font-[500]">{item.title}</h1>
                    <p className="text-sm pt-1 pb-1">{item.description}</p>

                    <span className="text-[14px] font-[500] pt-1 block">
                      Date:{" "}
                      {new Date(item.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>

                    <span className="text-[14px] font-[500] pt-1 block">
                      Deduction:{" "}
                      <span className="text-red-600">${item.amount}</span>
                    </span>

                    <div className="flex justify-end">
                      <button
                        onClick={() =>
                          navigate("/app/receipts-and-deductions", {
                            state: item,
                          })
                        }
                        className="font-[500] text-[14px] underline text-blue-600"
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                ))}
              </Fragment>
            ) : (
              <div className="text-center py-10 text-gray-500">
                <p className="font-[600] text-lg text-black">
                  No Receipts Or Deductions Yet
                </p>
                <p className="text-sm mt-1">
                  No deductions made yet. You can upload receipts or
                  <br /> invoices for any repair costs or damages.
                </p>
              </div>
            )}
          </div>

          {/* Remaining Balance */}
          <div className="bg-white rounded-xl shadow-sm p-6 flex items-center justify-between">
            <h3 className="text-md text-black font-semibold">
              Remaining Balance
            </h3>
            <p className="text-4xl font-[600] text-blue-700">
              ${data?.depositTracker?.remainingBalance}
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default Deposittracker;
