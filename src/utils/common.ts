/**
 * Extracts the ID from the url by using a regex to match any digits in the URL and returning the last match.
 * If there are no matches, it returns 1 as the default ID.
 * If the input is an array, it takes the first element as the URL.
 * @param url
 * @returns
 */
export const getIdFromUrl = (url?: string | string[]) => {
  if (Array.isArray(url)) [url] = url;

  const matches = url?.match(/\d+/g);
  if (!matches) return 1;

  return matches[matches.length - 1] ?? 1;
};

export const getBinaryFormat = (file: File) => {
  const reader = new FileReader();
  const promise = new Promise((resolve, reject) => {
    reader.onload = (event) => {
      const binaryString = event.target?.result;
      resolve(binaryString);
    };
    reader.onerror = () => {
      reject();
    };
  });
  reader.readAsBinaryString(file);
  return promise;
};
