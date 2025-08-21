"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"
import { Download, Calendar, Users } from "lucide-react"
import type { DateRange } from "react-day-picker"

interface ProjectProgressReportProps {
  dateRange: DateRange | undefined
  selectedTeam: string
  selectedProject: string
  onExport: () => void
}

const projectData = [
  {
    name: "Website thương mại điện tử",
    progress: 75,
    totalTasks: 32,
    completedTasks: 24,
    inProgressTasks: 6,
    pendingTasks: 2,
    dueDate: "2024-12-30",
    team: "Frontend + Backend",
    status: "on-track",
  },
  {
    name: "Ứng dụng di động",
    progress: 45,
    totalTasks: 28,
    completedTasks: 12,
    inProgressTasks: 10,
    pendingTasks: 6,
    dueDate: "2025-01-15",
    team: "Mobile Team",
    status: "at-risk",
  },
  {
    name: "Dashboard quản trị",
    progress: 90,
    totalTasks: 20,
    completedTasks: 18,
    inProgressTasks: 2,
    pendingTasks: 0,
    dueDate: "2024-12-25",
    team: "Frontend",
    status: "ahead",
  },
]

const chartData = projectData.map((project) => ({
  name: project.name.split(" ").slice(0, 2).join(" "),
  completed: project.completedTasks,
  inProgress: project.inProgressTasks,
  pending: project.pendingTasks,
}))

const statusData = [
  { name: "Đúng tiến độ", value: 2, color: "#22c55e" },
  { name: "Có rủi ro", value: 1, color: "#f59e0b" },
  { name: "Vượt tiến độ", value: 1, color: "#3b82f6" },
]

export function ProjectProgressReport({
  dateRange,
  selectedTeam,
  selectedProject,
  onExport,
}: ProjectProgressReportProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "on-track":
        return "default"
      case "at-risk":
        return "destructive"
      case "ahead":
        return "secondary"
      default:
        return "outline"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "on-track":
        return "Đúng tiến độ"
      case "at-risk":
        return "Có rủi ro"
      case "ahead":
        return "Vượt tiến độ"
      default:
        return "Không xác định"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Báo cáo tiến độ dự án</h2>
          <p className="text-muted-foreground">Theo dõi tiến độ và trạng thái các dự án</p>
        </div>
        <Button onClick={onExport} variant="outline" className="gap-2 bg-transparent">
          <Download className="h-4 w-4" />
          Xuất báo cáo
        </Button>
      </div>

      {/* Charts */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Tiến độ công việc theo dự án</CardTitle>
            <CardDescription>Số lượng công việc hoàn thành, đang thực hiện và chờ xử lý</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="completed" stackId="a" fill="#22c55e" name="Hoàn thành" />
                <Bar dataKey="inProgress" stackId="a" fill="#f59e0b" name="Đang thực hiện" />
                <Bar dataKey="pending" stackId="a" fill="#6b7280" name="Chờ xử lý" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Trạng thái dự án</CardTitle>
            <CardDescription>Phân bố trạng thái tiến độ các dự án</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Project Details */}
      <Card>
        <CardHeader>
          <CardTitle>Chi tiết dự án</CardTitle>
          <CardDescription>Thông tin chi tiết về tiến độ từng dự án</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {projectData.map((project, index) => (
              <div key={index} className="border border-border rounded-lg p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="space-y-1">
                    <h4 className="text-lg font-medium">{project.name}</h4>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        {project.team}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        Hạn: {new Date(project.dueDate).toLocaleDateString("vi-VN")}
                      </span>
                    </div>
                  </div>
                  <Badge variant={getStatusColor(project.status)}>{getStatusText(project.status)}</Badge>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span>Tiến độ tổng thể</span>
                    <span className="font-medium">{project.progress}%</span>
                  </div>
                  <Progress value={project.progress} className="h-2" />

                  <div className="grid grid-cols-3 gap-4 mt-4">
                    <div className="text-center p-3 bg-green-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">{project.completedTasks}</div>
                      <div className="text-sm text-green-600">Hoàn thành</div>
                    </div>
                    <div className="text-center p-3 bg-yellow-50 rounded-lg">
                      <div className="text-2xl font-bold text-yellow-600">{project.inProgressTasks}</div>
                      <div className="text-sm text-yellow-600">Đang thực hiện</div>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <div className="text-2xl font-bold text-gray-600">{project.pendingTasks}</div>
                      <div className="text-sm text-gray-600">Chờ xử lý</div>
                    </div>
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
