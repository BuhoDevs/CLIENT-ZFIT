import { Box, Text, useColorModeValue } from "@chakra-ui/react";
import type { InputProps } from "@chakra-ui/react";
import { useCallback, useEffect, useState } from "react";
import type { DropzoneOptions } from "react-dropzone";
import { useDropzone } from "react-dropzone";
import { FiUpload } from "react-icons/fi";

import FileList from "./FileList";

interface IDragAndDropInput extends DropzoneOptions {
  //   filesMaxSizeData: number;
  file: File | null;
  setFile: (filesData: File | null) => void;
  setImage: (value: string | undefined) => void;
  inputProps?: InputProps & {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    capture?: any;
    multiple?: boolean;
    accept?: string;
  };
  image: string | undefined;
  isEditing?: boolean;
}

const DragAndDropInput = ({
  file,
  setFile,
  setImage,
  image,
  isEditing = false,
  ...props
}: IDragAndDropInput) => {
  const handleRemoveFile = (file: File) => {
    if (!file) return null;

    setFile(null);
    setImage(undefined);
  };

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (!acceptedFiles) return;
      setFile(acceptedFiles[0]);
    },
    [setFile]
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    ...props,
    onDrop,
    multiple: false,
  });

  const [isMobile, setIsMobile] = useState(false);
  const label = isMobile
    ? "Subir foto"
    : "Arrastra y suelta la foto aquí, o haz clic para seleccionar una foto";

  useEffect(() => {
    setIsMobile(window.screen.width < 768);
  }, []);
  const borderDragInput = useColorModeValue("gray.300", "gray.700");
  const tagBgColor = useColorModeValue("brand.500", "brand.400");
  return (
    <Box
      {...getRootProps()}
      p={4}
      borderWidth={1.5}
      borderColor={isDragActive ? tagBgColor : borderDragInput}
      borderStyle="dashed"
      borderRadius="md"
      textAlign="center"
      cursor="pointer"
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <Text>Suelta la foto aquí ...</Text>
      ) : (
        <Box
          display={isMobile ? "flex" : "unset"}
          flexDirection={isMobile ? "column" : "unset"}
          alignItems={isMobile ? "center" : "unset"}
        >
          {isMobile && <FiUpload size={20} />}
          {!file && <Text>{label}</Text>}
        </Box>
      )}

      <FileList
        file={file}
        handleRemoveFile={handleRemoveFile}
        image={image}
        isEditing={isEditing}
      />
    </Box>
  );
};

export default DragAndDropInput;
