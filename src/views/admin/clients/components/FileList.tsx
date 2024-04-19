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
};

type RenderFileProps = {
  file: File;
  fileRemoveHandler: (file: File) => void;
  image: string | undefined;
};

const FileListItem = ({ file, fileRemoveHandler, image }: RenderFileProps) => {
  const fileSize = useColorModeValue("gray.300", "navy.700");
  const tagBgColor = useColorModeValue("brand.500", "brand.400");
  const onRemoveFile = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.stopPropagation();
    fileRemoveHandler(file);
  };

  return (
    <Tag
      key={file.name}
      size="lg"
      borderRadius="2xl"
      variant="solid"
      bg={tagBgColor}
      mr={2}
      mt={2}
      position="relative"
    >
      <Avatar src={image} size="xl" name={file.name} ml={-1} mr={2} />
      <Flex direction="column" gap={2}>
        <TagLabel maxW="150px" textOverflow="ellipsis">
          {file.name}
        </TagLabel>
        <TagLabel fontSize="sm" color={fileSize}>
          {formatFileSize(file.size)}
        </TagLabel>
      </Flex>
      <TagCloseButton
        position="absolute"
        top={1}
        right={2}
        onClick={onRemoveFile}
      />
    </Tag>
  );
};

const FileList = ({ file, handleRemoveFile, image }: FileListProps) => {
  if (!file) {
    return null;
  }
  return (
    <>
      {file && (
        <FileListItem
          key={file.name}
          file={file}
          fileRemoveHandler={handleRemoveFile}
          image={image}
        />
      )}
    </>
  );
};

export default FileList;
