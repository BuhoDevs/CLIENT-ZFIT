import type { IconType } from "react-icons";
import {
  FaFileAudio,
  FaFileExcel,
  FaFilePdf,
  FaFilePowerpoint,
  FaFileWord,
  FaImage,
  FaVideo,
} from "react-icons/fa";
import {
  IClientByIdEdition,
  IClientRequestBody,
} from "../../../../types/client";

export const iconByFileType: {
  [key: string]: IconType;
} = {
  pdf: FaFilePdf,

  doc: FaFileWord,
  docx: FaFileWord,

  xls: FaFileExcel,
  xlsx: FaFileExcel,

  ppt: FaFilePowerpoint,
  pptx: FaFilePowerpoint,

  jpg: FaImage,
  jpeg: FaImage,
  png: FaImage,
  gif: FaImage,

  mp3: FaFileAudio,

  mp4: FaVideo,
  mov: FaVideo,
  avi: FaVideo,
  wmv: FaVideo,
};

export const getFileExtension = (fileName: string) => {
  const dotIndex = fileName.lastIndexOf(".");
  if (dotIndex === -1) return "";
  return fileName.slice(dotIndex + 1);
};

export const formatFileSize = (size: number) => {
  const units = ["B", "KB", "MB", "GB", "TB"];
  let tempSize = size;
  let unitIndex = 0;
  while (tempSize >= 1024 && unitIndex < units.length - 1) {
    tempSize /= 1024;
    unitIndex += 1;
  }
  return `${tempSize.toFixed(2)} ${units[unitIndex]}`;
};

export const getFileType = (extension: string): string => {
  switch (extension) {
    case "pdf":
      return "pdf";
    case "doc":
    case "docx":
      return "word";
    case "xls":
    case "xlsx":
      return "excel";
    case "ppt":
    case "pptx":
      return "powerpoint";
    case "jpg":
    case "jpeg":
    case "png":
    case "gif":
      return "image";
    case "mp3":
      return "audio";
    case "mp4":
    case "mov":
    case "avi":
      return "video";
    case "wmv":
      return "video";
    default:
      return "file";
  }
};

export const parseToFormdata = ({
  values,
  file,
}: {
  values: IClientRequestBody;
  file: File | null;
}): FormData => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { genre, genreId, ...restValues } = values;
  const formData = new FormData();
  for (const key in restValues) {
    if (Object.prototype.hasOwnProperty.call(restValues, key)) {
      formData.append(
        key,
        String(
          restValues[key as keyof Omit<IClientRequestBody, "genre" | "genreId">]
        )
      );
    }
  }

  if (genre) {
    formData.append("genreId", String(genre.id));
  }

  if (file) {
    formData.append("photo", file);
  }

  return formData;
};

export const parseToFormdataEditClient = ({
  values,
  file,
}: {
  values: IClientByIdEdition;
  file: File | null;
}): FormData => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { Genre, ...restValues } = values;
  const formData = new FormData();
  for (const key in restValues) {
    if (Object.prototype.hasOwnProperty.call(restValues, key)) {
      formData.append(
        key,
        String(restValues[key as keyof Omit<IClientByIdEdition, "Genre">])
      );
    }
  }

  if (Genre) {
    formData.append("genreId", String(Genre.id));
  }

  if (file) {
    formData.append("photo", file);
  }

  return formData;
};
