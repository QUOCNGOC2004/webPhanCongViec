"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, ChevronRight, Plus, CalendarIcon, Clock, Users } from "lucide-react"

// Mock data for calendar events
const mockEvents = [
  {
    id: "1",
    title: "Họp nhóm",
    date: "2024-01-15",
    time: "09:00",
    type: "meeting",
    attendees: 5,
    color: "bg-blue-500",
  },
  {
    id: "2",
    title: "Deadline dự án",
    date: "2024-01-18",
    time: "17:00",
    type: "deadline",
    project: "Thiết kế lại website",
    color: "bg-red-500",
  },
  {
    id: "3",
    title: "Review code",
    date: "2024-01-20",
    time: "14:00",
    type: "review",
    attendees: 3,
    color: "bg-green-500",
  },
]

export function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [view, setView] = useState<"month" | "week" | "day">("month")

  const monthNames = [
    "Tháng 1",
    "Tháng 2",
    "Tháng 3",
    "Tháng 4",
    "Tháng 5",
    "Tháng 6",
    "Tháng 7",
    "Tháng 8",
    "Tháng 9",
    "Tháng 10",
    "Tháng 11",
    "Tháng 12",
  ]

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()

    const days = []

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null)
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day)
    }

    return days
  }

  const navigateMonth = (direction: "prev" | "next") => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev)
      if (direction === "prev") {
        newDate.setMonth(prev.getMonth() - 1)
      } else {
        newDate.setMonth(prev.getMonth() + 1)
      }
      return newDate
    })
  }

  const getEventsForDate = (day: number) => {
    const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`
    return mockEvents.filter((event) => event.date === dateStr)
  }

  const days = getDaysInMonth(currentDate)

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Lịch</h1>
            <p className="text-gray-600">Quản lý lịch trình và deadline của bạn</p>
          </div>
          <Button className="bg-green-700 hover:bg-green-800">
            <Plus className="h-4 w-4 mr-2" />
            Sự kiện mới
          </Button>
        </div>

        {/* Calendar Controls */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" onClick={() => navigateMonth("prev")}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <h2 className="text-xl font-semibold min-w-[200px] text-center">
                {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
              </h2>
              <Button variant="outline" size="sm" onClick={() => navigateMonth("next")}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Button variant={view === "month" ? "default" : "outline"} size="sm" onClick={() => setView("month")}>
              Tháng
            </Button>
            <Button variant={view === "week" ? "default" : "outline"} size="sm" onClick={() => setView("week")}>
              Tuần
            </Button>
            <Button variant={view === "day" ? "default" : "outline"} size="sm" onClick={() => setView("day")}>
              Ngày
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Calendar Grid */}
          <div className="lg:col-span-3">
            <Card>
              <CardContent className="p-0">
                {/* Calendar Header */}
                <div className="grid grid-cols-7 border-b">
                  {["CN", "T2", "T3", "T4", "T5", "T6", "T7"].map((day) => (
                    <div key={day} className="p-4 text-center font-medium text-gray-500 border-r last:border-r-0">
                      {day}
                    </div>
                  ))}
                </div>

                {/* Calendar Body */}
                <div className="grid grid-cols-7">
                  {days.map((day, index) => (
                    <div key={index} className="min-h-[120px] p-2 border-r border-b last:border-r-0 hover:bg-gray-50">
                      {day && (
                        <>
                          <div className="font-medium text-sm mb-1">{day}</div>
                          <div className="space-y-1">
                            {getEventsForDate(day).map((event) => (
                              <div key={event.id} className={`text-xs p-1 rounded text-white truncate ${event.color}`}>
                                {event.title}
                              </div>
                            ))}
                          </div>
                        </>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Today's Events */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Sự kiện hôm nay</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {mockEvents.slice(0, 2).map((event) => (
                  <div key={event.id} className="flex items-start space-x-3 p-3 rounded-lg bg-gray-50">
                    <div className={`w-3 h-3 rounded-full mt-1 ${event.color}`} />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm">{event.title}</p>
                      <div className="flex items-center text-xs text-gray-500 mt-1">
                        <Clock className="h-3 w-3 mr-1" />
                        {event.time}
                        {event.attendees && (
                          <>
                            <Users className="h-3 w-3 ml-2 mr-1" />
                            {event.attendees}
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Upcoming Deadlines */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Deadline sắp tới</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {mockEvents
                  .filter((e) => e.type === "deadline")
                  .map((event) => (
                    <div key={event.id} className="flex items-center justify-between p-3 rounded-lg bg-red-50">
                      <div>
                        <p className="font-medium text-sm">{event.title}</p>
                        <p className="text-xs text-gray-500">{event.project}</p>
                      </div>
                      <Badge variant="destructive" className="text-xs">
                        {event.date}
                      </Badge>
                    </div>
                  ))}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Thao tác nhanh</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <CalendarIcon className="h-4 w-4 mr-2" />
                  Lên lịch họp
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <Clock className="h-4 w-4 mr-2" />
                  Đặt nhắc nhở
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <Users className="h-4 w-4 mr-2" />
                  Lịch nhóm
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
