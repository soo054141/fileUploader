import classnames from "classnames/bind";
import styles from "./button.module.scss";
import { ModalType } from "../Modal";
import { useCallback } from "react";

const cx = classnames.bind(styles);

export type ButtonProps = {
  today: string;
  handleClosed: () => void;
  modalType: string;
  changeModal: (s: ModalType) => void;
  uploadFileCount: number;
  closeModal: () => void;
};

export default function Button({
  today,
  handleClosed,
  modalType,
  changeModal,
  uploadFileCount,
  closeModal,
}: ButtonProps) {
  const clickBack = useCallback(() => {
    if (modalType === ModalType.Sign) {
      handleClosed();
    } else {
      changeModal(ModalType.Sign);
    }
  }, [changeModal, handleClosed, modalType]);

  const clickConfirm = useCallback(() => {
    if (modalType === ModalType.Sign) {
      changeModal(ModalType.File);
    } else {
      if (uploadFileCount !== 0) {
        alert(`${today} 개인정보 처리 방침에 정상적으로 동의하셨습니다.`);
        closeModal();
      } else {
        alert(`서명 된 파일이 존재하지 않습니다.`);
      }
    }
  }, [changeModal, modalType]);
  return (
    <div className={cx("button-wrapper")}>
      <div className={cx(["button-style", "closed"])} onClick={clickBack}>
        {modalType === ModalType.Sign ? "취소하기" : "돌아가기"}
      </div>
      <div className={cx(["button-style", "confirm"])} onClick={clickConfirm}>
        {modalType === ModalType.Sign ? "동의하기" : "완료하기"}
      </div>
    </div>
  );
}
