import { useCallback, useEffect, useMemo, useState } from "react";
import styles from "./modal.module.scss";
import classnames from "classnames/bind";
import xmark from "../../image/x-mark.png";
import Image from "next/image";
import Button from "./Button/Button";
import FileUploader from "components/FileUploader/FileUploader";

const cx = classnames.bind(styles);

export enum ModalType {
  Sign = "sign",
  File = "file",
}

export type ModalBaseProps = {
  active: boolean;
  closeModal: () => void;
};

interface TermsInterface {
  title: string;
  content: string;
}

export interface FileInterface {
  acceptFileFormat: string[];
  maxFileLength: number;
  setUploadFileCount: (count: number) => void;
}

interface SignInterface {
  title: string;
  content: string;
  file: FileInterface;
}

export interface DataInterface {
  terms: TermsInterface;
  sign: SignInterface;
}

export default function Modal({ active, closeModal }: ModalBaseProps) {
  const [data, setData] = useState<DataInterface>();
  const [modalType, setModalType] = useState<ModalType>(ModalType.Sign);
  const [uploadFileCount, setUploadFileCount] = useState(0);

  const today = useMemo(() => {
    const date = new Date(Date.now());
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${year}년 ${month}월 ${day}일`;
  }, []);

  const handleClosed = useCallback(() => {
    alert(`${today} 개인정보 처리 방침에 미동의하셨습니다.`);
    closeModal();
  }, [closeModal, today]);

  const signComponent = useMemo(() => {
    return (
      <>
        <div className={cx("modal-titleWrap")}>
          <div
            className={cx("title")}
            dangerouslySetInnerHTML={{
              __html: data ? `${today}${data.terms.title}` : "",
            }}
          />
          <div className={cx("closeBtn")} onClick={handleClosed}>
            <Image src={xmark} alt='xmark' />
          </div>
        </div>
        <div
          className={cx("modal-textWrap")}
          dangerouslySetInnerHTML={{
            __html: data ? data.terms.content : "",
          }}
        />
      </>
    );
  }, [data, handleClosed, today]);

  const fileComponent = useMemo(() => {
    return (
      <>
        <div className={cx("modal-titleWrap")}>
          <div
            className={cx("title")}
            dangerouslySetInnerHTML={{
              __html: data ? `${data.sign.title}` : "",
            }}
          />
          <div className={cx("closeBtn")} onClick={handleClosed}>
            <Image src={xmark} alt='xmark' />
          </div>
        </div>
        <div
          className={cx("modal-textWrap")}
          dangerouslySetInnerHTML={{
            __html: data ? data.sign.content : "",
          }}
        />
        <div>
          <FileUploader
            maxFileLength={data?.sign.file.maxFileLength}
            acceptFileFormat={data?.sign.file.acceptFileFormat}
            setUploadFileCount={(count) => setUploadFileCount(count)}
          />
        </div>
      </>
    );
  }, [data, handleClosed]);

  const getData = useCallback(async () => {
    try {
      const response = await fetch(
        "https://fe-interview.s3.ap-northeast-2.amazonaws.com/terms.json"
      );
      if (response.ok) {
        const parsedData: DataInterface = await response.json();
        setData(parsedData);
      } else {
        throw new Error("Fail API");
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <>
      {active && (
        <div className={cx("modal-container")} onClick={handleClosed}>
          <div
            className={cx("modal-content")}
            onClick={(e) => e.stopPropagation()}
          >
            {modalType === "sign" ? signComponent : fileComponent}
            <div className={cx("modal-buttonWrap")}>
              <Button
                today={today}
                handleClosed={handleClosed}
                modalType={modalType}
                changeModal={(type: ModalType) => setModalType(type)}
                uploadFileCount={uploadFileCount}
                closeModal={() => closeModal()}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
