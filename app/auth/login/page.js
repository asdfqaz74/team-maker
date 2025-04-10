"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSetAtom } from "jotai";
import { tokenAtom } from "@/store/auth";

export default function LoginPage() {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  const setToken = useSetAtom(tokenAtom);

  const handleLogin = async () => {
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId, password }),
    });
    const data = await response.json();

    if (response.ok) {
      setMessage("로그인 성공");
      // JWT 토큰을 로컬 스토리지에 저장
      sessionStorage.setItem("token", data.token);
      // Jotai 상태 업데이트
      setToken(data.token);

      // 로그인 성공 시, 홈으로 리다이렉트
      router.push("/");
    } else {
      // 로그인 실패 시 에러 메시지 표시
      setMessage(data.error || "로그인 실패");
    }
  };

  return (
    <div>
      <span>아이디</span>
      <input
        type="text"
        placeholder="아이디를 입력하세요"
        onChange={(e) => setUserId(e.target.value)}
      />
      <span>비밀번호</span>
      <input
        type="password"
        placeholder="비밀번호를 입력하세요"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin} className="cursor-pointer">
        로그인
      </button>
      {message && <p>{message}</p>}
    </div>
  );
}
