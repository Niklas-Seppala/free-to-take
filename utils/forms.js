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
  let localUri = file.uri;
  let filename = localUri.split('/').pop();
  // Infer the type of the image
  let match = /\.(\w+)$/.exec(filename);
  let type = match ? `image/${match[1]}` : `image`;

  return {
    uri: localUri,
    name: filename,
    type,
  };
};

export const handleFetch = async (url, options = {}, nested) => {
  try {
    const resp = await fetch(
      'https://media.mw.metropolia.fi/wbma/media',
      options
    );

    if (resp.status >= 500) {
      throw new Error('Oopsie woopsie: ' + resp.status);
    }

    const json = await resp.json();
    if (resp.ok) {
      if (nested) {
        // Execute nested fetch (ifdef), and return aggregated results.
        if (!(json instanceof Array))
          throw new Error(`Response cant be mapped.`);
        return await Promise.all(json.map(nested));
      }
      return json;
    } else {
      const message = json.error
        ? `${json.message}: ${json.error}`
        : json.message;
      throw new Error(message || resp.statusText);
    }
  } catch (err) {
    throw new Error(err.message);
  }
};
