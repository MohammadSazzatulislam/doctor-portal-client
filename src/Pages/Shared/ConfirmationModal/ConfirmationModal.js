import React from "react";

const ConfirmationModal = ({
  deleteDoctor,
  handleDeleteCancle,
  handleDeleteSuccess,
}) => {
  return (
    <div>
      {/* Put this part before </body> tag */}
      <input type="checkbox" id="confirm-delete" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">
            Are you sure you want to Delete ??
          </h3>
          <p className="py-4">
            if you delete {deleteDoctor.name}. It cannot be undone
          </p>
          <div className="modal-action">
            <label
              onClick={()=>handleDeleteSuccess(deleteDoctor)}
              htmlFor="confirm-delete"
              className="btn"
            >
              Delete
            </label>
            <button onClick={handleDeleteCancle} className="btn btn-outline ">
              Cancle
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
