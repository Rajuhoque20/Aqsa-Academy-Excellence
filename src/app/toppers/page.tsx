"use client";

import React, { useEffect, useState, useMemo } from "react";
import { SearchInput } from "src/components/SearchInput";
import { AddButton, DeleteButton, EditButton } from "src/components/Button";
import axios from "axios";
const AddTopperModal= React.lazy(()=>import("./addToppers"));
const DeleteTopper= React.lazy(()=>import("./deleteToppers"));
import Image from "next/image";
import Loader from "src/components/Loader/Loader";

type Topper = {
  _id: string;
  name: string;
  class: string;
  marks: string;
  description: string;
  image: string;
};

type ModalDTO={
   add: boolean;
    edit: boolean;
    delete: boolean;
}

export default function Toppers() {
  const [toppersData, setToppersData] = useState<Topper[]>([]);
  const [searchKey, setSearchKey] = useState("");

  const [modal, setModal] = useState<ModalDTO>({ add: false, edit: false, delete: false });

  const [editParam, setEditParam] = useState<Topper | null>(null);
  const [deleteParam, setDeleteParam] = useState<{ name: string; id: string }>({
    name: "",
    id: "",
  });
  const [loading, setLoading]=useState(true);

  const getToppers = async () => {
    try {
      const res = await axios.get("/api/topper");
      setToppersData(res.data);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch toppers:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getToppers();
  }, []);

  const searchData = useMemo(() => {
    if (!searchKey.trim()) return toppersData;
    return toppersData.filter((item) =>
      item.name.toLowerCase().includes(searchKey.trim().toLowerCase())
    );
  }, [searchKey, toppersData]);

  return (
    <div className="w-full flex text-black flex-col gap-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-white">Toppers</h1>
        <div className="flex items-center gap-5">
          <SearchInput onChange={setSearchKey} value={searchKey} />
          <AddButton onClick={() => setModal((m) => ({ ...m, add: true }))} title="Add Toppers" />
        </div>
      </div>

      {/* Grid */}
       {
        loading?                
        <Loader/>: 
        searchData.length === 0 ? (
          <p className="text-gray-400 col-span-2 text-center">No toppers found.</p>
        ) : 
      <div className="grid grid-cols-2 gap-5 overflow-y-auto h-[77vh]">
       
          {searchData.map((item) => (
            <TopperCard
              key={item._id}
              item={item}
              onEdit={() => {
                setEditParam(item);
                setModal((m) => ({ ...m, edit: true }));
              }}
              onDelete={() => {
                setDeleteParam({ name: item.name, id: item._id });
                setModal((m) => ({ ...m, delete: true }));
              }}
            />
          ))
        }
      </div>}

      {/* Modals */}
      <AddTopperModal
        open={modal.add}
        type="add"
        setOpen={(v) => setModal((m) => ({ ...m, add: v }))}
        getToppers={getToppers}
        editParam={{}}
      />
      <AddTopperModal
        open={modal.edit}
        type="edit"
        setOpen={(v) => setModal((m) => ({ ...m, edit: v }))}
        getToppers={getToppers}
        editParam={editParam || {}}
      />
      <DeleteTopper
        open={modal.delete}
        setOpen={(v) => setModal((m) => ({ ...m, delete: v }))}
        deleteParam={deleteParam}
        getToppers={getToppers}
      />
    </div>
  );
}

/* ------------------------------
   Extracted Card Component
-------------------------------- */
function TopperCard({
  item,
  onEdit,
  onDelete,
}: {
  item: Topper;
  onEdit: () => void;
  onDelete: () => void;
}) {
  return (
    <div className="flex gap-5 box-shadow-md p-5 rounded-md border border-gray-400 bg-gray-800">
      <div className="relative w-1/2 h-[20rem]">
        <Image alt={item.name} src={item.image} fill className="object-cover rounded-md" />
      </div>
      <div className="flex w-1/2 flex-col gap-3">
        <h2 className="font-semibold text-gray-400">
          {item.name}
          <span className="text-sm ml-3 font-normal text-gray-200">{item.class}</span>
          <span className="text-sm ml-3 font-normal text-gray-300">{item.marks}</span>
        </h2>
        <p className="text-gray-400">{item.description}</p>
        <div className="mt-auto flex items-center gap-5 justify-end">
          <EditButton onClick={onEdit} />
          <DeleteButton onClick={onDelete} />
        </div>
      </div>
    </div>
  );
}
