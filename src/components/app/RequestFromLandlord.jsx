/* eslint-disable react/prop-types */

import { useState } from "react";
import ActionModal from "../global/ActionModal";
import moment from "moment";
import { ErrorToast, SuccessToast } from "../global/Toaster";
import axios from "../../axios";

const RequestFromLandlord = ({ status, setUpdate }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [requestId, setRequestId] = useState(null);
  const [requestStatus, setRequestStatus] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);

  const handleWatchRequest = async () => {
    try {
      setActionLoading(true);
      const response = await axios.put(`/requests/docs/${requestId}`, {
        status: requestStatus,
      });
      if (response.status === 200) {
        SuccessToast(`Request ${requestStatus}`);
        setShowModal(false);
        setUpdate((prev) => !prev);
      }
    } catch (error) {
      console.log("🚀 ~ handleWatchRequest ~ error:", error);
      ErrorToast(error.response.data.message);
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {/* Request Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
  {status?.length === 0 ? (
    <div className="col-span-full text-center p-4">
      <p className="text-gray-500">No requests available</p>
    </div>
  ) : (
    status?.map((request) => (
      <div
        key={request._id}
        className={`bg-[#FFFFFF] p-4 rounded-[15px] shadow-sm flex flex-col pb-3 items-center px-3 cursor-pointer hover:shadow-lg transition-shadow`}
      >
        <div className="flex items-start gap-3">
          <img
            src={request?.landlord?.profilePicture}
            alt=""
            className="w-[42px] rounded-full h-[42px] object-cover"
          />
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="text-[#181818] font-[500] text-[13px]">
                <span className="font-[600]">{request.name}</span>{" "}
                {request.description}
              </p>
              {request.status === "pending" && (
                <div className="mt-3 flex gap-3">
                  <button
                    onClick={() => {
                      setShowModal(!showModal);
                      setSelectedRequest(
                        "Are you sure you want to give access to the landlord?"
                      );
                      setRequestId(request._id);
                      setRequestStatus("approved");
                    }}
                    className="h-[32px] text-[12px] font-[600] w-[100px] text-center rounded-full text-white gradient-color"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => {
                      setShowModal(!showModal);
                      setSelectedRequest(
                        "Are you sure you want to decline landlord’s view request?"
                      );
                      setRequestId(request._id);
                      setRequestStatus("rejected");
                    }}
                    className="h-[32px] text-[12px] font-[600] w-[100px] text-center rounded-full text-[#242424] bg-[#ECECEC]"
                  >
                    Decline
                  </button>
                </div>
              )}
            </div>

            <div>
              <span className="text-[#8C8C8C] text-nowrap font-[400] text-[10px]">
                {moment(request.createdAt).format("hh:mm A")}
              </span>
            </div>
          </div>
        </div>
      </div>
    ))
  )}
</div>

      </main>

      <ActionModal
        isOpen={showModal}
        des={selectedRequest}
        setIsOpen={setShowModal}
        onAction={handleWatchRequest}
        actionLoading={actionLoading}
      />
    </div>
  );
};

export default RequestFromLandlord;
