import styles from "./terms.module.scss";
import Modal from "components/Modal/Modal";
import { useState } from "react";
import classnames from "classnames/bind";

const cx = classnames.bind(styles);

export const Terms = () => {
  const [isActive, setIsActive] = useState<boolean>(false);

  const onClick = () => {
    setIsActive(!isActive);
  };

  return (
    <>
      <Modal active={isActive} closeModal={onClick} />
      <button className={cx("cta-button")} onClick={onClick}>
        <span className={cx("cta-content")}>모달 클릭</span>
      </button>
    </>
  );
};
