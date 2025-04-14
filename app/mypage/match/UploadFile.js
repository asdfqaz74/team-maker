"use client";

import { useState } from "react";

export default function UploadFile({ onUploadSuccess }) {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");

  const handleFileChange = (e) => {
    const selectedFile = e.target.files?.[0];

    if (selectedFile) {
      setFile(selectedFile);
      setPreview(selectedFile.name);
    }
  };

  const handleUpload = async () => {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

    if (!file) {
      alert("파일을 선택해주세요.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch(`${baseUrl}/match/upload`, {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (response.ok) {
      alert("파일 업로드 성공: " + data.message);
      onUploadSuccess(data.match);
    } else {
      alert("파일 업로드 실패: " + data.error);
    }
  };

  return (
    <div className="p-4 border rounded flex justify-between items-center">
      <div className="flex gap-4">
        <label
          htmlFor="fileInput"
          className="bg-gray-500 text-white px-4 py-2 rounded cursor-pointer inline-block"
        >
          파일선택
        </label>
        <input
          id="fileInput"
          type="file"
          accept=".rofl"
          onChange={handleFileChange}
          className="hidden"
        />
        {preview ? (
          <p className="mt-2">{preview}</p>
        ) : (
          <p className="mt-2 text-gray-400">선택된 파일 없음</p>
        )}
      </div>
      <button
        className="mt-2 px-4 py-2 bg-blue-600 text-white rounded cursor-pointer hover:bg-blue-700"
        onClick={handleUpload}
      >
        업로드
      </button>
    </div>
  );
}
