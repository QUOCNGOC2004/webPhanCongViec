"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts"
import { Download, TrendingUp, TrendingDown, Users } from "lucide-react"
import type { DateRange } from "react-day-picker"

interface TeamPerformanceReportProps {
  dateRange: DateRange | undefined
  selectedTeam: string
  onExport: () => void
}

const teamData = [
  {
    name: "Đội phát triển Frontend",
    members: 5,
    tasksCompleted: 45,
    tasksInProgress: 12,
    efficiency: 92,
    avgCompletionTime: 2.1,
    trend: "up",
    leader: "Nguyễn Văn A",
  },
  {
    name: "Đội phát triển Backend",
    members: 4,
    tasksCompleted: 38,
    tasksInProgress: 8,
    efficiency: 87,
    avgCompletionTime: 2.8,
    trend: "up",
    leader: "Phạm Thị D",
  },
  {
    name: "Đội QA & Testing",
    members: 3,
    tasksCompleted: 32,
    tasksInProgress: 6,
    efficiency: 89,
    avgCompletionTime: 1.9,
    trend: "down",
    leader: "Vũ Thị F",
  },
]

const performanceData = [
  { month: "T8", frontend: 85, backend: 82, qa: 88 },
  { month: "T9", frontend: 88, backend: 85, qa: 87 },
  { month: "T10", frontend: 90, backend: 86, qa: 89 },
  { month: "T11", frontend: 91, backend: 87, qa: 88 },
  { month: "T12", frontend: 92, backend: 87, qa: 89 },
]

const skillsData = [
  { skill: "Kỹ thuật", frontend: 90, backend: 95, qa: 85 },
  { skill: "Giao tiếp", frontend: 85, backend: 80, qa: 90 },
  { skill: "Quản lý thời gian", frontend: 88, backend: 85, qa: 92 },
  { skill: "Sáng tạo", frontend: 92, backend: 78, qa: 80 },
  { skill: "Làm việc nhóm", frontend: 89, backend: 87, qa: 88 },
]

export function TeamPerformanceReport({ dateRange, selectedTeam, onExport }: TeamPerformanceReportProps) {
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Báo cáo hiệu suất nhóm</h2>
          <p className="text-muted-foreground">Đánh giá hiệu suất và năng suất các nhóm làm việc</p>
        </div>
        <Button onClick={onExport} variant="outline" className="gap-2 bg-transparent">
          <Download className="h-4 w-4" />
          Xuất báo cáo
        </Button>
      </div>

      {/* Performance Trend */}
      <Card>
        <CardHeader>
          <CardTitle>Xu hướng hiệu suất theo thời gian</CardTitle>
          <CardDescription>Hiệu suất các nhóm trong 5 tháng gần đây</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis domain={[70, 100]} />
              <Tooltip />
              <Line type="monotone" dataKey="frontend" stroke="#22c55e" strokeWidth={2} name="Frontend" />
              <Line type="monotone" dataKey="backend" stroke="#3b82f6" strokeWidth={2} name="Backend" />
              <Line type="monotone" dataKey="qa" stroke="#f59e0b" strokeWidth={2} name="QA" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Skills Radar */}
      <Card>
        <CardHeader>
          <CardTitle>Phân tích kỹ năng nhóm</CardTitle>
          <CardDescription>Đánh giá các kỹ năng cốt lõi của từng nhóm</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <RadarChart data={skillsData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="skill" />
              <PolarRadiusAxis angle={90} domain={[0, 100]} />
              <Radar name="Frontend" dataKey="frontend" stroke="#22c55e" fill="#22c55e" fillOpacity={0.1} />
              <Radar name="Backend" dataKey="backend" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.1} />
              <Radar name="QA" dataKey="qa" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.1} />
              <Tooltip />
            </RadarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Team Details */}
      <Card>
        <CardHeader>
          <CardTitle>Chi tiết hiệu suất nhóm</CardTitle>
          <CardDescription>Thông tin chi tiết về từng nhóm làm việc</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {teamData.map((team, index) => (
              <div key={index} className="border border-border rounded-lg p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="space-y-2">
                    <h4 className="text-lg font-medium">{team.name}</h4>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarFallback className="text-xs">{getInitials(team.leader)}</AvatarFallback>
                      </Avatar>
                      <span className="text-sm text-muted-foreground">Trưởng nhóm: {team.leader}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="gap-1">
                      <Users className="h-3 w-3" />
                      {team.members} thành viên
                    </Badge>
                    {team.trend === "up" ? (
                      <Badge variant="default" className="gap-1 bg-green-100 text-green-700">
                        <TrendingUp className="h-3 w-3" />
                        Tăng
                      </Badge>
                    ) : (
                      <Badge variant="destructive" className="gap-1">
                        <TrendingDown className="h-3 w-3" />
                        Giảm
                      </Badge>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">{team.tasksCompleted}</div>
                    <div className="text-sm text-blue-600">Công việc hoàn thành</div>
                  </div>
                  <div className="text-center p-4 bg-yellow-50 rounded-lg">
                    <div className="text-2xl font-bold text-yellow-600">{team.tasksInProgress}</div>
                    <div className="text-sm text-yellow-600">Đang thực hiện</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">{team.efficiency}%</div>
                    <div className="text-sm text-green-600">Hiệu suất</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">{team.avgCompletionTime}</div>
                    <div className="text-sm text-purple-600">Ngày TB hoàn thành</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
