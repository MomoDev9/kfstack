import { useEffect } from "react";
import Modal from "react-modal";
import { FaArrowLeft, FaArrowRight, FaTimes } from "react-icons/fa";

const ImageModal = ({ image, onClose, onNext, onPrevious }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        onNext();
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        onPrevious();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onNext, onPrevious]);
  return (
    <Modal
      isOpen={true}
      onRequestClose={onClose}
      contentLabel="Image Modal"
      className="relative w-[85%] items-center justify-center  "
      overlayClassName="fixed top-0 left-0 right-0 bottom-0 bg-black/50 flex items-center justify-center"
    >
      <button
        onClick={onClose}
        className="absolute top-0 right-0 text-white bg-red-500 rounded-md p-1 text-lg"
      >
        <FaTimes />
      </button>
      <div className="flex items-center justify-between my-2 border-white border-2">
        <button
          onClick={onPrevious}
          className="text-white bg-blue-600 text-lg p-1 rounded-md mx-2 md:mx-5"
        >
          <FaArrowLeft />
        </button>
        <img
          src={image.src}
          alt={image.title}
          className="max-h-[80vh] w-3/4 md:max-w-[80vw]"
        />
        <button
          onClick={onNext}
          className="text-white bg-blue-600 text-lg p-1 rounded-md mx-2 md:mx-5"
        >
          <FaArrowRight />
        </button>
      </div>
      {/* <div className={styles.details}> */}
      <div className=" bg-white">
        <p className="text-2xl mt-5 font-bold ml-5">{image.title}</p>
        <div className="mt-2 mx-2">
          {image.description.split("\n").map((n) => (
            <p>{n}</p>
          ))}
        </div>
      </div>
    </Modal>
  );
};

export default ImageModal;
