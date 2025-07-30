import { useState } from "react";
import userAvatar from "../../assets/userone.png";
import ActionModal from "../global/ActionModal";

const RequestFromLandlord = ({ status }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);

  const [requests] = useState([
    {
      id: "1",
      title: "Justin Timberlake",
      description:
        "has requested to you to give view access for move-in photos and videos.",
      status: "pending",
      time: "2hrs ago",
    },
    {
      id: "2",
      title: "Peter Parker",
      description:
        "has requested to you to give view access for move-in photos and videos.",
      status: "approved",
      time: "2hrs ago",
    },
    {
      id: "3",
      title: "Justin Timberlake",
      description:
        "has requested to you to give view access for move-in photos and videos.",
      status: "pending",
      time: "2hrs ago",
    },
    {
      id: "4",
      title: "Justin Timberlake",
      description:
        "has requested to you to give view access for move-in photos and videos.",
      status: "rejected",
      time: "2hrs ago",
    },
  ]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {/* Request Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {requests
            .filter(
              (el) =>
                el.status.toLocaleLowerCase() == status?.toLocaleLowerCase()
            )
            .map((request) => (
              <div
                key={request.id}
                className={`bg-[#FFFFFF] rounded-[15px] shadow-sm flex flex-col pb-3 items-center px-3  cursor-pointer hover:shadow-lg transition-shadow`}
              >
                <div className="flex items-start gap-3 ">
                  <img
                    src={userAvatar}
                    alt=""
                    className="w-[42px] rounded-full h-[42px]"
                  />
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-[#181818] font-[500] text-[13px]">
                        <span className="font-[600]">{request.title}</span>{" "}
                        {request.description}
                      </p>
                      {request.status == "pending" && (
                        <div className="mt-3  flex gap-3">
                          <button
                            onClick={() => {
                              setShowModal(!showModal);
                              setSelectedRequest(
                                "Are you sure you want to give access to the landlord?"
                              );
                            }}
                            className="h-[32px] text-[12px] font-[600] w-[100px] text-center rounded-full text-white gradient-color "
                          >
                            Accept
                          </button>
                          <button
                            onClick={() => {
                              setShowModal(!showModal);
                              setSelectedRequest(
                                "Are you sure you want to decline landlord’s view request?"
                              );
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
                        {request.time}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </main>

      <ActionModal
        isOpen={showModal}
        des={selectedRequest}
        setIsOpen={setShowModal}
      />
    </div>
  );
};

export default RequestFromLandlord;
