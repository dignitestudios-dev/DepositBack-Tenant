import Modal from "react-modal";
import AlertImage from "../../assets/alert.png";
const ActionModal = ({ isOpen, setIsOpen, des }) => {
  return (
    <Modal
      isOpen={isOpen}
      shouldCloseOnOverlayClick={false}
      shouldCloseOnEsc={false}
      className="flex items-center justify-center border-none outline-none z-[1000] "
      overlayClassName="fixed inset-0 bg-[#C6C6C6] bg-opacity-50 backdrop-blur-sm z-[1000]  flex justify-center items-center"
    >
      <div className="bg-white rounded-[16px] shadow-lg w-[470px] h-[350px]   items-center flex flex-col justify-center  text-center">
        <div className="flex flex-col items-center gap-3 justify-center">
          <img
            src={AlertImage}
            className="w-[107px] h-[107px] "
            alt="AlertImage"
          />
          <h3 className="text-[24px] font-[600] text-[#212121]">View Access</h3>
          <p className="text-[16px] font-[400] text-[#565656]">{des}</p>
          <div className="mt-3 w-full  flex gap-3">
            <button
              onClick={() => {
                setIsOpen(false);
              }}
              className=" text-[12px] h-[50px] font-[600] w-full text-center rounded-full text-[#9E9E9E] bg-[#ECECEC] "
            >
              No
            </button>
            <button
              onClick={() => {
                setIsOpen(false);
              }}
              className=" text-[12px] h-[50px] font-[600] w-full text-center rounded-full bg-[#EE3131] text-white "
            >
              Yes
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ActionModal;
