'use client'
import React, { useEffect, useState, useCallback, useMemo } from 'react'
import { SearchInput } from 'src/components/SearchInput'
import { AddButton, DeleteButton, EditButton } from 'src/components/Button'
import axios from 'axios'
import { AddNoticeModal } from './addNotice'
import { DeleteNotice } from './deleteNotice'

interface NoticeItem {
  _id: string
  title: string
  date: string
  file?: string
}

export default function Notice() {
  const [noticeData, setNoticeData] = useState<NoticeItem[]>([])
  const [searchKey, setSearchKey] = useState('')
  const [modal, setModal] = useState({
    add: false,
    edit: false,
    delete: false,
  })
  const [editParam, setEditParam] = useState<NoticeItem | null>(null)
  const [deleteParam, setDeleteParam] = useState<{ name: string; id: string }>({
    name: '',
    id: '',
  })

  // ✅ Fetch notices
  const getNotice = useCallback(async () => {
    try {
      const res = await axios.get('/api/notice')
      setNoticeData(res.data || [])
    } catch (error) {
      console.error('Error fetching notices:', error)
    }
  }, [])

  useEffect(() => {
    getNotice()
  }, [getNotice])

  // ✅ Filtered data
  const searchData = useMemo(() => {
    if (!searchKey) return noticeData
    return noticeData.filter((item) =>
      item.title?.toLowerCase().includes(searchKey.trim().toLowerCase())
    )
  }, [searchKey, noticeData])

  // ✅ Handlers
  const handleEdit = (item: NoticeItem) => {
    setEditParam(item)
    setModal((m) => ({ ...m, edit: true }))
  }

  const handleDelete = (item: NoticeItem) => {
    setDeleteParam({ name: item.title, id: item._id })
    setModal((m) => ({ ...m, delete: true }))
  }

  return (
    <div className="w-full flex text-black flex-col gap-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-white">Notice</h1>
        <div className="flex items-center gap-5">
          <SearchInput onChange={setSearchKey} value={searchKey} />
          <AddButton
            onClick={() => setModal((m) => ({ ...m, add: true }))}
            title="Add Notice"
          />
        </div>
      </div>

      {/* Notice List */}
      <div className="flex flex-col gap-5 overflow-y-auto h-[77vh]">
        {searchData&&searchData.length > 0 ? (
          searchData.map((item) => (
            <div
              key={item._id}
              className="flex gap-5 box-shadow-md p-5 rounded-md border border-gray-400 bg-gray-800"
            >
              <div className="relative w-[10rem] h-[10rem] bg-gray-700 flex justify-center items-center">
                <p className="text-white">{item.date}</p>
              </div>
              <div className="flex flex-col gap-3 flex-grow">
                <p className="text-white">{item.title}</p>
                {item.file && (
                  <a
                    href={`http://localhost:3000/${item.file}`}
                    className="text-sm ml-3 font-normal text-blue-400 underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View File
                  </a>
                )}
                <div className="mt-auto flex items-center gap-5 justify-end">
                  <EditButton onClick={() => handleEdit(item)} />
                  <DeleteButton onClick={() => handleDelete(item)} />
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-200">No notices found.</p>
        )}
      </div>

      {/* Modals */}
      <AddNoticeModal
        open={modal.add}
        type="add"
        setOpen={(v) => setModal((m) => ({ ...m, add: v }))}
        getNotice={getNotice}
        editParam={{}}
      />
      <AddNoticeModal
        open={modal.edit}
        type="edit"
        setOpen={(v) => setModal((m) => ({ ...m, edit: v }))}
        getNotice={getNotice}
        editParam={editParam || {}}
      />
      <DeleteNotice
        open={modal.delete}
        setOpen={(v) => setModal((m) => ({ ...m, delete: v }))}
        deleteParam={deleteParam}
        getNotice={getNotice}
      />
    </div>
  )
}
