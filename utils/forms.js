export const trimTextFields = (data) => {
  for (const key in data) {
    if (Object.hasOwnProperty.call(data, key)) {
      const fieldVal = data[key];
      if (typeof fieldVal === 'string') data[key] = fieldVal.trim();
    }
  }
};

export const extractFilename = (path) => path.replace(/^.*[\\\/]/, '');

export const extractFileExt = (filename) => filename.split('.').pop();

export const extractFileData = (file) => {
  const filename = file.uri.split('/').pop();
  const fExtension = filename.split('.').pop();
  const mimetype = `${file.type}/${fExtension === 'jpg' ? 'jpeg' : fExtension}`;

  return {
    uri: file.uri,
    filename,
    mimetype,
  };
};
