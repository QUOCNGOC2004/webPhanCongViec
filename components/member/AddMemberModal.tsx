'use client'

import { X } from 'lucide-react'
import { useState } from 'react'

type AddMemberModalProps = {
  onClose: () => void
}

export const AddMemberModal = ({ onClose }: AddMemberModalProps) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    position: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Logic xử lý submit form, ví dụ: gọi API
    console.log('Form data submitted:', formData)
    onClose() // Đóng modal sau khi submit
  }

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center">
      {/* Overlay mờ nhẹ */}
      <div
        className="fixed inset-0 bg-gray-200/50"
        onClick={onClose} // bấm ra ngoài để đóng modal
      />

      {/* Khối modal */}
      <div className="relative bg-white rounded-lg shadow-xl w-full max-w-md p-8 z-10">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Thêm thành viên mới</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Họ và tên
              </label>
              <input
                type="text"
                id="name"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Số điện thoại
              </label>
              <input
                type="tel"
                id="phone"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div>
              <label
                htmlFor="position"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Vị trí
              </label>
              <input
                type="text"
                id="position"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>
          <div className="mt-8 flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
            >
              Thêm thành viên
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
