import { useMemo, useState } from "react";
import { LuMapPin } from "react-icons/lu";

import { FaArrowLeft, FaEnvelope, FaPhoneAlt } from "react-icons/fa";
import { useNavigate, useParams } from "react-router";
import { RiDeleteBinFill } from "react-icons/ri";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import backimage from "../../assets/propertydetail/back.png";
import { IoIosWarning } from "react-icons/io";
import { BsChevronRight } from "react-icons/bs";
import Modal from "../../components/global/Modal";
import ImageGallery from "../../components/app/ImageGallery";
import { ErrorToast, SuccessToast } from "../../components/global/Toaster";
import axios from "../../axios";
import { getDateFormat } from "../../lib/helpers";
import DisputeModal from "../../components/app/propertyDetail/DisputeModal";
import { useFetchData } from "../../hooks/api/Get";
import PropertyHeaderSkeleton from "../../components/app/PropertyHeaderSkeleton";
import { useTranslation } from "react-i18next";

const PropertyDetail = () => {
  const navigate = useNavigate("");
  const { id } = useParams();

  const [showModal, setShowModal] = useState(false);

  const [isDelete, setIsDelete] = useState(false);
  const [disputeModal, setDisputeModal] = useState(false);
  const [disputeSuccess, setDisputeSuccess] = useState(false);
  const [disputeLoading, setDisputeLoading] = useState(false);

  const [confirmDispute, setConfirmDispute] = useState(false);
  const [successLease, setSuccessLease] = useState(false);
  const currentDate = useMemo(() => new Date().toISOString(), []);
  const [update, setUpdate] = useState(false);

  const { data: propertyDetail, loading } = useFetchData(
    `/properties/${id}`,
    {
      currentDate,
    },
    1,
    update
  );

  const handleDelete = async () => {
    try {
      const response = await axios.delete(`/properties/tenant/${id}`);
      if (response.status === 200) {
        setIsDelete(false);
        SuccessToast("Deleted");
        navigate("/app/dashboard");
      }
    } catch (error) {
      ErrorToast(error.response.data.message);
    }
  };

  const handleDispute = async () => {
    setDisputeLoading(true);
    try {
      const response = await axios.post(`/properties/leaseDispute/${id}`);
      if (response.status === 200) {
        setDisputeSuccess(true);
        setDisputeModal(false);
      }
    } catch (error) {
      console.log("🚀 ~ handleDispute ~ error:", error);
      ErrorToast(error.response.data.message);
    } finally {
      setDisputeLoading(false);
    }
  };

  const handleConfirmDispute = async () => {
    setDisputeLoading(true);
    try {
      const response = await axios.post(`/properties/leaseConfirm/${id}`, {
        isConfirmed: true,
      });
      if (response.status === 200) {
        setConfirmDispute(false);
        setSuccessLease(true);
        setUpdate((prev) => !prev);
      }
    } catch (error) {
      console.log("🚀 ~ handleDispute ~ error:", error);
      ErrorToast(error.response.data.message);
    } finally {
      setDisputeLoading(false);
    }
  };

  const {
    _id,
    name,
    rent,
    address,
    uniquePropertyCode,
    leaseStartDate,
    leaseEndDate,
    description,
    rentDueDate,
    lateFeeAmount,
    contactPersons,
    images,
    landlord,
    paymentStatus,
    landlordAgreements,
    landlordPropertyConditionImages,
    landlordPropertyConditionVideos,
    landlordRules,
    tenantMoveInImages,
    tenantMoveInVideos,
    tenantMoveOutImages,
    tenantMoveOutVideos,
    tenantAgreements,
    tenantRepairsVideos,
    tenantRepairsImages,
    uvLightImages,
    ownedBy,
    contract,
    depositTracker,
    isLeaseDateResolved,
    isLeaseDateConfirmed,
  } = propertyDetail?.property || {};

  // const isActive = userId === propertyData?.tenant;
  const { t } = useTranslation();
  return (
    <div className="max-w-[1260px] mx-auto pt-10">
      {loading ? (
        <PropertyHeaderSkeleton />
      ) : (
        <>
          <div className="flex justify-between items-center mb-6">
            <div className="flex gap-3">
              <button type="button" onClick={() => navigate(-1)}>
                <FaArrowLeft size={18} />
              </button>
              <h1 className="text-[26px] font-[600]">
                {t("headings.myProperties")}
              </h1>
            </div>
            {ownedBy === "tenant" && (
              <div className="flex gap-4">
                <button
                  onClick={() => setIsDelete(true)}
                  className="bg-[#FF3B30] text-white flex items-center gap-3 rounded-3xl px-4 py-2  font-medium"
                >
                  <RiDeleteBinFill />
                  Delete
                </button>
              </div>
            )}
            {ownedBy === "landlord" && (
              <div className="flex gap-4">
                <button
                  onClick={() => navigate(`/app/report/${_id}`)}
                  className="bg-gradient-to-r from-[#003897] to-[#0151DA] text-white flex items-center gap-3 rounded-3xl px-4 py-2  font-medium"
                >
                  <RiDeleteBinFill />
                  Report
                </button>
              </div>
            )}
            {/* <div className="flex gap-4">
            <button
              onClick={() => setIsDelete(true)}
              className="bg-[#FF3B30] text-white flex items-center gap-3 rounded-3xl px-4 py-2  font-medium"
            >
              <RiDeleteBinFill />
              Delete
            </button>
            <button
              type="button"
              onClick={() => {
                navigate(`/app/edit-property`, {
                  state: { propertyDetail },
                });
              }}
              className="bg-gradient-to-r from-[#003897] to-[#0151DA] text-white flex items-center gap-3 rounded-3xl px-4 py-2 font-medium"
            >
              <RiEdit2Fill />
              Edit
            </button>
          </div> */}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-1 gap-6 bg-white p-6 rounded-2xl">
            {/* Main Image Gallery */}
            <div className="md:col-span-2">
              <div className="flex flex-col md:flex-row gap-4">
                <ImageGallery images={images} />
              </div>
            </div>

            {/* Property Details Section */}
            <div className="bg-white p-6 w-[44em]">
              <div className="flex justify-between">
                <h2 className="!text-3xl font-semibold mb-2">{name}</h2>
                <div>
                  <span className="text-[#0151DA] font-[600] ml-4 text-2xl">
                    ${rent}
                  </span>{" "}
                  <span className="text-sm font-medium text-gray-400">
                    /month
                  </span>
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

              {/* {tenant && ( */}
              {ownedBy === "landlord" && (
                <div className="pt-4 text-sm">
                  <div className="flex justify-between items-center gap-3 pt-3 pb-3">
                    <div>
                      <h5 className="text-[18px] font-[500] text-black">
                        Rent Activity
                      </h5>
                    </div>

                    <div className="flex justify-between items-center gap-2 w-[50%]">
                      {paymentStatus !== "Paid" && (
                        <button
                          className="w-full bg-gradient-to-r from-[#003897] to-[#0151DA] text-white py-2 rounded-3xl font-semibold"
                          onClick={() =>
                            navigate("/app/rent-history", {
                              state: {
                                lateFeeAmount,
                                rentDueDate,
                                rent,
                                paymentStatus,
                                propertyId: _id,
                                contractId: contract,
                              },
                            })
                          }
                        >
                          Pay Rent
                        </button>
                      )}
                      <button
                        className="w-full bg-gray-100 text-black py-2 rounded-3xl font-semibold"
                        onClick={() =>
                          navigate("/app/rent-history", {
                            state: {
                              lateFeeAmount,
                              rentDueDate,
                              rent,
                              paymentStatus,
                              propertyId: _id,
                              contractId: contract,
                            },
                          })
                        }
                      >
                        View History
                      </button>
                    </div>
                  </div>

                  <div className="bg-[#F3F8FF] rounded-2xl p-3 leading-8">
                    <p className="flex justify-between font-[500]">
                      Current Month:{" "}
                      <span>{getDateFormat(new Date().toISOString())}</span>
                    </p>
                    <p className="flex justify-between font-[500]">
                      Amount Due: <span>${rent}</span>
                    </p>
                    <p className="flex justify-between font-[500]">
                      Due Date:{" "}
                      <span>
                        {getDateFormat(
                          new Date(
                            new Date().getFullYear(),
                            new Date().getMonth(),
                            rentDueDate
                          )
                        )}
                      </span>
                    </p>
                    <p className="flex justify-between font-[500]">
                      Payment Status:{" "}
                      <span
                        className={`${
                          paymentStatus === "Paid"
                            ? "text-white bg-gradient-to-r from-[#003897] to-[#0151DA]" // Blue background if paid
                            : "text-yellow-500 bg-[#FF950040]" // Yellow background if not paid
                        } font-medium rounded-3xl px-3`}
                      >
                        {paymentStatus || "Pending"}
                      </span>
                    </p>
                  </div>

                  <Modal
                    isOpen={showModal}
                    onClose={() => setShowModal(false)}
                    onAction={() => {
                      setShowModal(false);
                      navigate("/auth/login");
                    }}
                    data={{
                      title: "Reminder Sent!",
                      description:
                        "Reminder of rent due has been sent to the tenant.",
                      iconBgColor: "bg-blue-600",
                    }}
                  />
                </div>
              )}

              {/* )} */}

              <div className="mt-4">
                <h3 className="!text-[20px] font-[500] mb-2">Description</h3>
                <p className="text-sm text-gray-700 leading-relaxed">
                  {description}
                </p>
                {ownedBy === "landlord" && (
                  <p className="mt-3 text-sm text-black">
                    <span className="font-[600]">Rent Due Date:</span>{" "}
                    {rentDueDate
                      ? `Day ${rentDueDate} of each month`
                      : "Not specified"}
                  </p>
                )}
                <p className="text-sm text-black">
                  <span className="font-[600]">Late Fee:</span>{" "}
                  {lateFeeAmount ? `$${lateFeeAmount}` : "No late fee"}
                </p>
              </div>

              <div className="mt-4">
                <h3 className="font-[500] text-gray-800 mb-1">More Contacts</h3>
                <ul className="text-sm text-gray-700">
                  {contactPersons?.length ? (
                    contactPersons.map((person, i) => (
                      <li key={i} className="pt-2 pb-2">
                        {person.name}{" "}
                        <div className="flex items-center gap-3">
                          <FaPhoneAlt color="#003897" size={12} />{" "}
                          {person.phone}
                        </div>
                      </li>
                    ))
                  ) : (
                    <li>No contact persons available</li>
                  )}
                </ul>
              </div>
            </div>

            {/* Tenant Sidebar */}
            <div className="bg-[#F3F8FF] w-[30em] rounded-2xl p-6">
              {landlord && (
                <>
                  <div
                    style={{ backgroundImage: `url(${backimage})` }}
                    className="bg-cover bg-center rounded-3xl p-3 text-white"
                  >
                    <div className="flex gap-3 justify-between pt-3">
                      <div
                        onClick={() =>
                          navigate("/app/landlord-profile", { state: landlord })
                        }
                        className="flex gap-3 cursor-pointer"
                      >
                        <img
                          src={landlord?.profilePicture}
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
                        <div
                          onClick={() => navigate("/app/messages")}
                          className="bg-[#fff] p-3 rounded-xl cursor-pointer"
                        >
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
                        Emergency:{" "}
                        {landlord?.emergencyContact || "-- Not provided --"}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 border-t mt-4 pt-3  pb-3">
                    {leaseStartDate && (
                      <p className="border-r">
                        <span className="font-[500] text-black text-[14px]">
                          Lease Start Date:
                        </span>
                        <br /> {new Date(leaseStartDate).toLocaleDateString()}
                      </p>
                    )}
                    {leaseEndDate && (
                      <p>
                        <span className="font-[500] text-black text-[14px]">
                          Lease End Date:
                        </span>
                        <br /> {new Date(leaseEndDate).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                </>
              )}
              <div className="border-t pt-4 mt-4 cursor-pointer">
                <h5 className="font-[500] text-black mb-2">
                  Property Documentation
                </h5>
                <div className="mb-4">
                  <div
                    onClick={() =>
                      navigate("/app/documents", {
                        state: {
                          propertyId: id,
                          landlordAgreements,
                          landlordRules,
                          landlordPropertyConditionImages,
                          landlordPropertyConditionVideos,
                          uvLightImages,
                          tenantAgreements,
                          tenantRepairsVideos,
                          tenantRepairsImages,
                        },
                      })
                    }
                    className="bg-white flex justify-between rounded-2xl p-3 items-center mb-3"
                  >
                    <button className="font-[500]">Documents</button>
                    <BsChevronRight />
                  </div>
                  {ownedBy === "landlord" && (
                    <div
                      className="bg-white flex justify-between rounded-2xl p-3 items-center mb-3"
                      onClick={() =>
                        navigate("/app/inspection", {
                          state: {
                            tenantMoveInImages,
                            tenantMoveInVideos,
                            tenantMoveOutImages,
                            tenantMoveOutVideos,
                            propertyId: id,
                            landlordId: landlord?._id,
                          },
                        })
                      }
                    >
                      <button className="font-[500]">
                        Inspection (Move in/Move out)
                      </button>
                      <BsChevronRight />
                    </div>
                  )}
                  {depositTracker && (
                    <div
                      className="bg-white flex justify-between rounded-2xl p-3 items-center"
                      onClick={() =>
                        navigate("/app/deposit-tracker", {
                          state: { depositTracker },
                        })
                      }
                    >
                      <button className="font-[500]">Deposit Tracker</button>
                      <BsChevronRight />
                    </div>
                  )}
                </div>
                {ownedBy === "landlord" && (
                  <div>
                    <div className="space-x-2 flex justify-between w-full">
                      {/* Case 2a: Resolved but not Confirmed → Show Confirm + Dispute */}
                      {isLeaseDateResolved && !isLeaseDateConfirmed && (
                        <button
                          onClick={() => setConfirmDispute(true)}
                          className="bg-green-500 py-3 px-4 text-white rounded-full font-medium text-sm w-full"
                        >
                          Confirm Lease Date
                        </button>
                      )}

                      {/* Case 2b: Always show Dispute if active */}
                      <button
                        onClick={() => setDisputeModal(true)}
                        className="bg-red-500 py-3 px-4 text-white rounded-full font-medium text-sm w-full"
                      >
                        {isLeaseDateResolved
                          ? "Dispute Again "
                          : "Dispute Lease Date"}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}

      {isDelete && (
        <Modal
          isOpen={isDelete}
          onClose={() => setIsDelete(false)}
          onAction={() => {
            handleDelete();
          }}
          data={{
            title: "Are You Sure",
            description: "You won't able to revert changes.",
            iconBgColor: "bg-red-600",
            actionText: "Delete",
          }}
        />
      )}
      {disputeModal && (
        <DisputeModal
          disputeLoading={disputeLoading}
          isOpen={disputeModal}
          onClose={() => setDisputeModal(false)}
          onAction={() => {
            handleDispute();
          }}
          data={{
            title: "Dispute Lease Date",
            description: "Are you sure you want to dispute this lease date?",
            iconBgColor: "bg-red-600",
            hoverBgColor: "hover:bg-red-700",
            actionText: "Yes",
          }}
        />
      )}
      {disputeSuccess && (
        <Modal
          isOpen={disputeSuccess}
          onClose={() => {
            setDisputeSuccess(false);
          }}
          data={{
            title: "Dispute submitted successfully!",
            description: "Your lease date dispute has been sent",
            iconBgColor: "bg-blue-600", // Optional
          }}
        />
      )}
      {successLease && (
        <Modal
          isOpen={successLease}
          onClose={() => {
            setSuccessLease(false);
          }}
          data={{
            title: "Lease accepted successfully!",
            description: "Lease date has been accepted",
            iconBgColor: "bg-blue-600", // Optional
          }}
        />
      )}
      {confirmDispute && (
        <DisputeModal
          disputeLoading={disputeLoading}
          isOpen={confirmDispute}
          onClose={() => setConfirmDispute(false)}
          onAction={() => {
            handleConfirmDispute();
          }}
          data={{
            title: "Confirm Lease Date",
            description: "Are you sure you want to confirm this lease date?",
            iconBgColor: "bg-blue-600",
            hoverBgColor: "hover:bg-blue-700",
            actionText: "Yes",
          }}
        />
      )}
    </div>
  );
};

export default PropertyDetail;
