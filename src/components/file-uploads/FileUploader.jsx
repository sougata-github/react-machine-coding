import { useState } from "react";
import axios from "axios";

/*Try to get access to the file inside the component as a state. Use that state to update the UI and then upload and send to some backend.

What we want to achieve:
- Display file details ✅
- Upload file ✅
- Show upload progress ✅

What happens is we upload the file to a remote server, and then a url is returned. Based on the type of file, we render using the url.
*/

// type UploadStatus = "idle" | "uploading" | "success" | "error";

const FileUploader = () => {
  // for ts: const [file,setFile] = useState<File | null>(null);

  const [file, setFile] = useState(null);
  const [status, setStatus] = useState("idle");
  const [uploadProgress, setUploadProgress] = useState(0);

  // ChangeEvent<HTMLInputElement>
  const handleFileChange = (e) => {
    //from all the files in the input get the first file.
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleFileUpload = async () => {
    if (!file) return;

    setStatus("uploading");
    setUploadProgress(0);
    // we're gonna take this file and convert to formData and send it to backend.
    const formData = new FormData();
    formData.append("file", file);

    /*Typically what you would do is make a post request with the file and run a server-action that updates the database with the file url.*/
    try {
      await axios.post("https://httpbin.org/post", file, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          const progress = progressEvent.total
            ? Math.round((progressEvent.loaded * 100) / progressEvent.total)
            : 0;
          setUploadProgress(progress);
        },
      });
      setStatus("success");
      setUploadProgress(100);
    } catch (error) {
      setStatus("error");
      setUploadProgress(0);
      console.log(error);
    }
  };

  return (
    <div className="space-y-2">
      <input type="file" aria-label="upload file" onChange={handleFileChange} />

      {file && (
        <div className="mb-4 text-sm">
          <p>File name: {file.name}</p>
          <p>Size: {(file.size / 1024).toFixed(2)} KB</p>
          <p>Type: {file.type}</p>
        </div>
      )}

      {file && (
        <button
          onClick={handleFileUpload}
          className="w-[120px] px-4 py-2 rounded-lg bg-black text-white text-sm"
          disabled={status === "uploading"}
        >
          {status === "uploading" ? "Uploading..." : "Upload"}
        </button>
      )}

      {status === "success" && (
        <p className="mt-2 text-sm text-green-500">Upload Completed!</p>
      )}

      {status === "error" && (
        <p className="mt-2 text-sm text-red-500">
          Upload failed! Pleas try again
        </p>
      )}

      {status === "uploading" && (
        <p className="mt-2 text-sm">{uploadProgress}%</p>
      )}
    </div>
  );
};

export default FileUploader;
