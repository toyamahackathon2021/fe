const getHost = (): string => {
  const env = process.env.NODE_ENV;
  if (env === "production") {
    return "https://toyama-fe.vercel.app/";
  }
  return "http://localhost:3000";
};

export const fetcher = (url: string) => {
  const host = getHost();
  return fetch(`${host}${url}`).then((r) => r.json());
};

export const post = (dataURI: string) => {
  const byteString = atob(dataURI.split(",")[1]);
  const mimeType = "image/jpeg";

  for (
    var i = 0, l = byteString.length, content = new Uint8Array(l);
    l > i;
    i++
  ) {
    content[i] = byteString.charCodeAt(i);
  }

  console.log(content);
  const blob = new Blob([content], {
    type: mimeType,
  });

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/octet-stream",
      "Prediction-Key": "2bd1af7f448e4385a522ebe4c1f12418",
    },
    body: blob,
  };

  const url =
    "https://toyamahackathon.cognitiveservices.azure.com/customvision/v3.0/Prediction/7c933a45-3360-4a8c-95fb-cabcb5aa9993/classify/iterations/Iteration1/image";

  return fetch(url, requestOptions).then((r) => r.json());
};
