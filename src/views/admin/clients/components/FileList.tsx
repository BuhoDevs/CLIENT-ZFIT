import {
  Avatar,
  Flex,
  Tag,
  TagCloseButton,
  TagLabel,
  useColorModeValue,
} from "@chakra-ui/react";

import { formatFileSize } from "./utils";

type FileListProps = {
  file: File | null;
  handleRemoveFile: (file: File) => void;
  image: string | undefined;
  isEditing?: boolean;
};

type RenderFileProps = {
  file: File | null;
  fileRemoveHandler: (file: File) => void;
  image: string | undefined;
  isEditing?: boolean;
};

const FileListItem = ({
  file,
  fileRemoveHandler,
  image,
  isEditing = false,
}: RenderFileProps) => {
  const fileSize = useColorModeValue("gray.300", "navy.700");
  const tagBgColor = useColorModeValue("brand.500", "brand.400");
  const onRemoveFile = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.stopPropagation();
    if (file) fileRemoveHandler(file);
  };
  const shouldRenderAvatar = image || file;
  return (
    <Tag
      key={file?.name || image}
      size="lg"
      borderRadius="2xl"
      variant="solid"
      bg={tagBgColor}
      mr={2}
      mt={2}
      position="relative"
    >
      {shouldRenderAvatar && (
        <Avatar src={image} size="xl" name={file?.name || ""} ml={-1} mr={2} />
      )}
      <Flex direction="column" gap={2}>
        <TagLabel maxW="150px" textOverflow="ellipsis">
          {file ? file.name : "Foto de perfil"}
        </TagLabel>
        {file?.size && (
          <TagLabel fontSize="sm" color={fileSize}>
            {formatFileSize(file.size)}
          </TagLabel>
        )}
      </Flex>
      {!isEditing && (
        <TagCloseButton
          position="absolute"
          top={1}
          right={2}
          onClick={onRemoveFile}
        />
      )}
    </Tag>
  );
};

const FileList = ({
  file,
  handleRemoveFile,
  image,
  isEditing = false,
}: FileListProps) => {
  const shouldRenderFileList = file || (isEditing && image);
  if (!shouldRenderFileList) {
    return null;
  }
  return (
    <>
      {/* {file && ( */}
      <FileListItem
        key={file?.name || image}
        file={file}
        fileRemoveHandler={handleRemoveFile}
        image={image}
        isEditing={isEditing}
      />
      {/* )} */}
    </>
  );
};

export default FileList;
