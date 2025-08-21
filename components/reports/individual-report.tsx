"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts"
import { Download, Calendar } from "lucide-react"
import type { DateRange } from "react-day-picker"

interface IndividualReportProps {
  dateRange: DateRange | undefined
  selectedProject: string
  onExport: () => void
}

const teamMembers = [
  { id: "1", name: "Nguyễn Văn A", role: "Frontend Developer" },
  { id: "2", name: "Trần Thị B", role: "Backend Developer" },
  { id: "3", name: "Lê Văn C", role: "QA Engineer" },
  { id: "4", name: "Phạm Thị D", role: "UI/UX Designer" },
  { id: "5", name: "Hoàng Văn E", role: "DevOps Engineer" },
]

const individualData = {
  "1": {
    name: "Nguyễn Văn A",
    role: "Frontend Developer",
    tasksCompleted: 28,
    tasksInProgress: 5,
    tasksPending: 2,
    efficiency: 94,
    avgCompletionTime: 1.8,
    hoursWorked: 168,
    projectsInvolved: 3,
    performanceData: [
      { week: "T1", completed: 4, efficiency: 90 },
      { week: "T2", completed: 6, efficiency: 92 },
      { week: "T3", completed: 8, efficiency: 95 },
      { week: "T4", completed: 7, efficiency: 94 },
      { week: "T5", completed: 3, efficiency: 93 },
    ],
    skillsData: [
      { skill: "React", level: 95 },
      { skill: "TypeScript", level: 88 },
      { skill: "CSS", level: 92 },
      { skill: "Testing", level: 78 },
    ],
    recentTasks: [
      { title: "Thiết kế component Button", status: "completed", completedAt: "2024-12-20" },
      { title: "Tối ưu performance trang chủ", status: "completed", completedAt: "2024-12-19" },
      { title: "Implement dark mode", status: "in-progress", dueDate: "2024-12-25" },
      { title: "Fix responsive issues", status: "pending", dueDate: "2024-12-27" },
    ],
  },
}

export function IndividualReport({ dateRange, selectedProject, onExport }: IndividualReportProps) {
  const [selectedMember, setSelectedMember] = useState("1")
  const memberData = individualData[selectedMember as keyof typeof individualData]

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "default"
      case "in-progress":
        return "secondary"
      case "pending":
        return "outline"
      default:
        return "outline"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "completed":
        return "Hoàn thành"
      case "in-progress":
        return "Đang thực hiện"
      case "pending":
        return "Chờ xử lý"
      default:
        return "Không xác định"
    }
  }

  if (!memberData) {
    return <div>Không tìm thấy dữ liệu cho thành viên này</div>
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Báo cáo cá nhân</h2>
          <p className="text-muted-foreground">Đánh giá hiệu suất và tiến độ làm việc cá nhân</p>
        </div>
        <Button onClick={onExport} variant="outline" className="gap-2 bg-transparent">
          <Download className="h-4 w-4" />
          Xuất báo cáo
        </Button>
      </div>

      {/* Member Selection */}
      <Card>
        <CardHeader>
          <CardTitle>Chọn thành viên</CardTitle>
          <CardDescription>Chọn thành viên để xem báo cáo chi tiết</CardDescription>
        </CardHeader>
        <CardContent>
          <Select value={selectedMember} onValueChange={setSelectedMember}>
            <SelectTrigger className="w-full max-w-md">
              <SelectValue placeholder="Chọn thành viên" />
            </SelectTrigger>
            <SelectContent>
              {teamMembers.map((member) => (
                <SelectItem key={member.id} value={member.id}>
                  <div className="flex items-center gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarFallback className="text-xs">{getInitials(member.name)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{member.name}</div>
                      <div className="text-sm text-muted-foreground">{member.role}</div>
                    </div>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* Member Overview */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarFallback className="text-lg">{getInitials(memberData.name)}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-xl">{memberData.name}</CardTitle>
              <CardDescription className="text-base">{memberData.role}</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{memberData.tasksCompleted}</div>
              <div className="text-sm text-blue-600">Công việc hoàn thành</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">{memberData.efficiency}%</div>
              <div className="text-sm text-green-600">Hiệu suất</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">{memberData.avgCompletionTime}</div>
              <div className="text-sm text-purple-600">Ngày TB hoàn thành</div>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <div className="text-2xl font-bold text-orange-600">{memberData.hoursWorked}h</div>
              <div className="text-sm text-orange-600">Giờ làm việc</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Performance Charts */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Hiệu suất theo tuần</CardTitle>
            <CardDescription>Số công việc hoàn thành và hiệu suất hàng tuần</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={memberData.performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="week" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Bar yAxisId="left" dataKey="completed" fill="#3b82f6" name="Công việc hoàn thành" />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="efficiency"
                  stroke="#22c55e"
                  strokeWidth={2}
                  name="Hiệu suất %"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Kỹ năng chuyên môn</CardTitle>
            <CardDescription>Đánh giá mức độ thành thạo các kỹ năng</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {memberData.skillsData.map((skill, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">{skill.skill}</span>
                    <span className="text-muted-foreground">{skill.level}%</span>
                  </div>
                  <Progress value={skill.level} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Tasks */}
      <Card>
        <CardHeader>
          <CardTitle>Công việc gần đây</CardTitle>
          <CardDescription>Các công việc được thực hiện trong thời gian gần đây</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {memberData.recentTasks.map((task, index) => (
              <div key={index} className="flex items-center justify-between p-4 border border-border rounded-lg">
                <div className="space-y-1">
                  <h4 className="font-medium">{task.title}</h4>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    {task.status === "completed" ? (
                      <span>Hoàn thành: {new Date(task.completedAt!).toLocaleDateString("vi-VN")}</span>
                    ) : (
                      <span>Hạn: {new Date(task.dueDate!).toLocaleDateString("vi-VN")}</span>
                    )}
                  </div>
                </div>
                <Badge variant={getStatusColor(task.status)}>{getStatusText(task.status)}</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
