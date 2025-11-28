import React from "react";
import css from "./ConfirmModal.module.css";

const ConfirmModal = ({ isOpen, message, onConfirm, onCancel }) => {
  if (!isOpen) return null;

  return (
    <div className={css.modalOverlay} onClick={onCancel}>
      <div className={css.modalBox} onClick={(e) => e.stopPropagation()}>
        <p className={css.message}>{message}</p>
        <div className={css.btnGroup}>
          <button className={css.cancelBtn} onClick={onCancel}>
            취소
          </button>
          <button className={css.deleteBtn} onClick={onConfirm}>
            삭제
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
