import styles from "./FileUploader.module.scss";
import classnames from "classnames/bind";
import { ChangeEvent, useCallback, useState, useRef, useEffect } from "react";
import { FileInterface } from "components/Modal/Modal";
import clipImage from "../../image/clip.png";
import xMark from "../../image/x-mark.png";
import Image from "next/image";

const cx = classnames.bind(styles);

export default function FileUploader({
  acceptFileFormat,
  maxFileLength,
  setUploadFileCount,
}: FileInterface) {
  const [uploadedImages, setUploadedImages] = useState([]);
  const uploadBoxRef = useRef<HTMLLabelElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    setUploadFileCount(uploadedImages.length);
  }, [uploadedImages]);

  const handleFile = useCallback(
    (files) => {
      console.log(files, files.length);
      if (files.length > maxFileLength) {
        alert("파일 갯수가 초과되었습니다.");
        return;
      }
      for (const file of files) {
        if (acceptFileFormat.some((el) => file.type.indexOf(el) !== -1)) {
          const reader = new FileReader();

          reader.onloadend = (e) => {
            const result = e.target.result;
            const fileObject = { name: file.name, value: result };
            if (result) {
              setUploadedImages((state) => [...state, fileObject]);
            }
          };
          reader.readAsDataURL(file);
        }
      }
      alert("업로드에 성공하였습니다.");
    },
    [acceptFileFormat, maxFileLength]
  );

  const dropHandler = useCallback(
    (e) => {
      e.preventDefault();
      e.stopPropagation();
      const files = e.dataTransfer.files;

      console.log(files);
      handleFile(files);
    },
    [handleFile]
  );

  const dragOverHandler = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const deleteFile = (name: string) => {
    const deleteTargetIndex = uploadedImages.findIndex(
      (file) => file.name === name
    );
    const uploadedTemp = [...uploadedImages];
    uploadedTemp.splice(deleteTargetIndex, 1);
    setUploadedImages([...uploadedTemp]);
  };

  const FileList = useCallback(() => {
    return uploadedImages.map((file) => {
      return (
        <span key={file.name} className={cx("file-list-text")}>
          <Image src={clipImage} className={cx("clip-image")} />
          <div className={cx("file-list-title")}>{file.name}</div>
          <Image
            src={xMark}
            className={cx("x-image")}
            onClick={() => deleteFile(file.name)}
          />
        </span>
      );
    });
  }, [uploadedImages]);
  return (
    <div className={cx("FileUploadBox")}>
      <label
        className={cx("drag")}
        ref={uploadBoxRef}
        onDrop={dropHandler}
        onDragOver={dragOverHandler}
      >
        <div className={cx("text-box")}>파일을 끌어서 업로드해주세요.</div>
        <input className={cx("fileUpload")} type='file' ref={inputRef} />
      </label>
      <div className={cx("file-list-wrapper")}>{FileList()}</div>
    </div>
  );
}
