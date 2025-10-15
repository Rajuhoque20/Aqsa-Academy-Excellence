'use client'
import React, { useEffect, useState, useCallback } from 'react'
import { SearchInput } from 'src/components/SearchInput'
import { AddButton, DeleteButton, EditButton } from 'src/components/Button'
import axios from 'axios'
import Loader from 'src/components/Loader/Loader'
import { useDebounce } from 'src/components/customHooks/useDeboune'
import { FaBell 
      } from "react-icons/fa";
const AddAlarmModal = React.lazy(()=>import('./addAlarm'));
const DeleteAlarm = React.lazy(()=>import('./deleteAlarm')); 

interface AlarmItem {
  _id: string
  time: string
  type: string
}

export default function Notice() {
  const [AlarmData, setAlarmData] = useState<AlarmItem[]>([])
  const [searchKey, setSearchKey] = useState('')
  const [modal, setModal] = useState({
    add: false,
    edit: false,
    delete: false,
  })
  const [editParam, setEditParam] = useState<AlarmItem | null>(null)
  const [deleteParam, setDeleteParam] = useState<{ name: string; id: string }>({
    name: '',
    id: '',
  })
  const [searchData, setSearchData]=useState<AlarmItem[]>([]);
  const [loading, setLoading]=useState(true);
  const {debounceFetch}=useDebounce(AlarmData, setSearchData,'time');

  // ✅ Fetch notices
  const getAlarm = useCallback(async () => {
    try {
      const res = await axios.get('/api/alarm')
      setAlarmData(res.data || []);
      setSearchData(res?.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching Alarms:', error);
      setLoading(false);
    }
  }, [])

  useEffect(() => {
    getAlarm()
  }, [getAlarm])

  // ✅ Filtered data
  // const searchData = useMemo(() => {
  //   if (!searchKey) return AlarmData
  //   return AlarmData.filter((item) =>
  //     item.title?.toLowerCase().includes(searchKey.trim().toLowerCase())
  //   )
  // }, [searchKey, AlarmData])

  // ✅ Handlers
  const handleEdit = (item: AlarmItem) => {
    setEditParam(item)
    setModal((m) => ({ ...m, edit: true }))
  }

  const handleDelete = (item: AlarmItem) => {
    setDeleteParam({ name: item.time, id: item._id })
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
        <h1 className="text-2xl font-semibold text-white">Alarm Bell</h1>
        <div className="flex items-center gap-5">
          <SearchInput onChange={handleChange} value={searchKey} />
          <AddButton
            onClick={() => setModal((m) => ({ ...m, add: true }))}
            title="Add Alarm"
          />
        </div>
      </div>

      {/* Notice List */}
      <div className="flex flex-col gap-5 overflow-y-auto h-[77vh]">
         {loading?                
          <Loader/>:             
          searchData&&searchData.length > 0 ? (
            <div className='grid grid-cols-3 gap-10'>
         { searchData.map((item) => (
            <div
              key={item._id}
              className="flex flex-col gap-5 box-shadow-md p-5 rounded-md border border-gray-400 bg-gray-800"
            >
              
             
                <FaBell size={70} className='text-white'/>
                <p className="text-white">{item.type}</p>
                 <p className="text-white">{item.time}</p>
                <div className="mt-auto flex items-center gap-5 justify-end">
                  <EditButton onClick={() => handleEdit(item)} />
                  <DeleteButton onClick={() => handleDelete(item)} />
                </div>
              
            </div>
          ))}
        
        </div>) : (
          <p className="text-center text-gray-200">No Alarms found.</p>
        )}
      </div>

      {/* Modals */}
      <AddAlarmModal
        open={modal.add}
        type="add"
        setOpen={(v) => setModal((m) => ({ ...m, add: v }))}
        getAlarm={getAlarm}
        editParam={{}}
      />
      <AddAlarmModal
        open={modal.edit}
        type="edit"
        setOpen={(v) => setModal((m) => ({ ...m, edit: v }))}
        getAlarm={getAlarm}
        editParam={editParam || {}}
      />
      <DeleteAlarm
        open={modal.delete}
        setOpen={(v) => setModal((m) => ({ ...m, delete: v }))}
        deleteParam={deleteParam}
        getAlarm={getAlarm}
      />
    </div>
  )
}
