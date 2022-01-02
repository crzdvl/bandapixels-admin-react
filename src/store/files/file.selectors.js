export const getUploadedFiles = (
  { file: { files } },
) => files;

export const getFileError = (
  { file: { error } },
) => error;
