"use client";
import { fetchChampionList } from "@/lib/api/fetchChampionList";
import { Dialog } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useState } from "react";

export default function ChampionPalette({ open, onClose }) {
  const [searchChampion, setSearchChampion] = useState("");
  const [selected, setSelected] = useState([]);
  const {
    data: championList = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["championList"],
    queryFn: fetchChampionList,
  });

  const filteredChampionList = championList.filter((champ) =>
    champ.name.includes(searchChampion)
  );

  const toggleChampion = (championId) => {
    setSelected((prev) =>
      prev.includes(championId)
        ? prev.filter((id) => id !== championId)
        : [...prev, championId]
    );
  };

  if (isLoading) return <div>불러오는 중...</div>;
  if (isError) return <div>{error.message}</div>;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      slotProps={{
        paper: {
          sx: {
            minWidth: "37.5rem",
            minHeight: "30rem",
            backgroundColor: "#1E1E2F",
            paddingX: "1rem",
          },
        },
      }}
    >
      <div className="flex flex-col justify-center items-center">
        <input
          type="text"
          className="bg-[#D9D9D9] placeholder-gray-500 p-2 text-gray-950 w-1/2 my-6"
          placeholder="챔피언 검색"
          value={searchChampion}
          onChange={(e) => setSearchChampion(e.target.value)}
        />
        <div className="grid grid-cols-8 gap-2">
          {filteredChampionList.map((champ) => (
            <button
              key={champ.id}
              onClick={() => toggleChampion(champ.id)}
              className={`border-2 rounded flex flex-col items-center justify-center min-w-0 ${
                selected.includes(champ.id)
                  ? "border-blue-500"
                  : "border-transparent"
              }`}
            >
              <Image
                src={champ.image}
                alt={champ.name}
                className="object-cover cursor-pointer"
                width={64}
                height={64}
              />
              <p className="text-xs text-center text-white truncate w-[4rem]">
                {champ.name}
              </p>
            </button>
          ))}
        </div>
        <div className="flex gap-2 flex-wrap">
          {selected.map((id) => {
            const champ = championList.find((c) => c.id === id);
            return (
              <div
                key={id}
                className="text-sm px-2 py-1 bg-blue-600 text-white rounded"
              >
                {champ?.name}
              </div>
            );
          })}
        </div>
        <div className="flex">
          <button className="cursor-pointer">설정</button>
        </div>
      </div>
    </Dialog>
  );
}
