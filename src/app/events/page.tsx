'use client'
import React, { useEffect, useState, useCallback } from 'react'
import { SearchInput } from 'src/components/SearchInput'
import { AddButton, DeleteButton, EditButton } from 'src/components/Button'
import axios from 'axios'
const AddEventModal= React.lazy(()=>import('./addEvents'));
const DeleteEvents= React.lazy(()=>import('./deleteEvents'));
import Image from 'next/image'
import Loader from 'src/components/Loader/Loader'
import { useDebounce } from 'src/components/customHooks/useDeboune'

interface EventItem {
  _id: string
  title: string
  name?: string
  description: string
  image: string
  date: string
}

export default function Events() {
  const [eventsData, setEventsData] = useState<EventItem[]>([])
  const [searchKey, setSearchKey] = useState('')
  const [modal, setModal] = useState<{
    add: boolean
    edit: boolean
    delete: boolean
  }>({ add: false, edit: false, delete: false })

  const [editParam, setEditParam] = useState<EventItem | null>(null)
  const [deleteParam, setDeleteParam] = useState<{ name: string; id: string }>({
    name: '',
    id: '',
  });
  const [loading, setLoading]=useState(true);
  const [searchData, setSearchData]=useState<EventItem[]>([]);
  const {debounceFetch}=useDebounce(eventsData, setSearchData,'title');

  // ✅ Fetch Events
  const getEvents = useCallback(async () => {
    try {
      const res = await axios.get('/api/event')
      setEventsData(res.data || []);
      setSearchData(res.data||[]);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching events:', error);
      setLoading(false);
    }
  }, [])

  useEffect(() => {
    getEvents()
  }, [getEvents])


  // ✅ Handlers
  const handleEdit = (item: EventItem) => {
    setEditParam(item)
    setModal((m) => ({ ...m, edit: true }))
  }

  const handleDelete = (item: EventItem) => {
    setDeleteParam({ name: item.title, id: item._id })
    setModal((m) => ({ ...m, delete: true }))
  }
  const handleChange=(value:string)=>{
        setSearchKey(value);
        debounceFetch(value);
    };

  return (
    <div className="w-full flex text-black flex-col gap-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-white">Events</h1>
        <div className="flex items-center gap-5">
          <SearchInput onChange={handleChange} value={searchKey} />
          <AddButton
            onClick={() => setModal((m) => ({ ...m, add: true }))}
            title="Add Events"
          />
        </div>
      </div>

      {/* Events List */}
      <div className="flex flex-col gap-5 overflow-y-auto h-[77vh]">
        {loading?                
        <Loader/>: 
        searchData.length > 0 ? (
          searchData.map((item) => (
            <div
              key={item._id}
              className="flex gap-5 box-shadow-md p-5 rounded-md border border-gray-400 bg-gray-800"
            >
              <div className="relative w-[10rem] h-[10rem]">
                <Image
                  alt={item.title}
                  src={item.image}
                  fill
                  className="object-cover rounded-md"
                />
              </div>
              <div className="flex flex-col gap-3 flex-grow">
                <h2 className="text-white font-semibold">
                  {item.title}{' '}
                  <span className="text-sm text-gray-300 ml-3 font-normal">
                    {item.date}
                  </span>
                </h2>
                <p className='text-gray-200'>{item.description}</p>
                <div className="mt-auto flex items-center gap-5 justify-end">
                  <EditButton onClick={() => handleEdit(item)} />
                  <DeleteButton onClick={() => handleDelete(item)} />
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-600">No events found.</p>
        )}
      </div>

      {/* Modals */}
      <AddEventModal
        open={modal.add}
        type="add"
        setOpen={(v) => setModal((m) => ({ ...m, add: v }))}
        getEvents={getEvents}
        editParam={{}}
      />
      <AddEventModal
        open={modal.edit}
        type="edit"
        setOpen={(v) => setModal((m) => ({ ...m, edit: v }))}
        getEvents={getEvents}
        editParam={editParam || {}}
      />
      <DeleteEvents
        open={modal.delete}
        setOpen={(v) => setModal((m) => ({ ...m, delete: v }))}
        deleteParam={deleteParam}
        getEvents={getEvents}
      />
    </div>
  )
}
