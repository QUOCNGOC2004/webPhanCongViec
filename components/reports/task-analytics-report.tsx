"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from "recharts"
import { Download, CheckSquare, Clock, AlertTriangle, TrendingUp } from "lucide-react"
import type { DateRange } from "react-day-picker"

interface TaskAnalyticsReportProps {
  dateRange: DateRange | undefined
  selectedTeam: string
  selectedProject: string
  onExport: () => void
}

const taskStatusData = [
  { name: "Hoàn thành", value: 124, color: "#22c55e" },
  { name: "Đang thực hiện", value: 23, color: "#f59e0b" },
  { name: "Chờ xử lý", value: 15, color: "#6b7280" },
  { name: "Quá hạn", value: 9, color: "#ef4444" },
]

const priorityData = [
  { priority: "Cao", completed: 35, inProgress: 8, pending: 3 },
  { priority: "Trung bình", completed: 56, inProgress: 12, pending: 8 },
  { priority: "Thấp", completed: 33, inProgress: 3, pending: 4 },
]

const completionTrendData = [
  { week: "Tuần 1", completed: 18, created: 22 },
  { week: "Tuần 2", completed: 24, created: 19 },
  { week: "Tuần 3", completed: 31, created: 25 },
  { week: "Tuần 4", completed: 28, created: 23 },
  { week: "Tuần 5", completed: 23, created: 18 },
]

const categoryData = [
  { category: "Frontend", tasks: 45, avgTime: 2.1 },
  { category: "Backend", tasks: 38, avgTime: 2.8 },
  { category: "Testing", tasks: 32, avgTime: 1.9 },
  { category: "Design", tasks: 28, avgTime: 3.2 },
  { category: "DevOps", tasks: 13, avgTime: 4.1 },
]

export function TaskAnalyticsReport({ dateRange, selectedTeam, selectedProject, onExport }: TaskAnalyticsReportProps) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Phân tích công việc</h2>
          <p className="text-muted-foreground">Thống kê chi tiết về các công việc và xu hướng hoàn thành</p>
        </div>
        <Button onClick={onExport} variant="outline" className="gap-2 bg-transparent">
          <Download className="h-4 w-4" />
          Xuất báo cáo
        </Button>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tỷ lệ hoàn thành</CardTitle>
            <CheckSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">79.5%</div>
            <div className="flex items-center gap-1 text-xs text-green-600 mt-2">
              <TrendingUp className="h-3 w-3" />
              <span>+5.2% từ tháng trước</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Thời gian TB</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.4 ngày</div>
            <div className="flex items-center gap-1 text-xs text-green-600 mt-2">
              <TrendingUp className="h-3 w-3" />
              <span>Cải thiện 0.3 ngày</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Công việc quá hạn</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">9</div>
            <div className="flex items-center gap-1 text-xs text-red-600 mt-2">
              <TrendingUp className="h-3 w-3" />
              <span>+2 từ tuần trước</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Hiệu suất nhóm</CardTitle>
            <CheckSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">87%</div>
            <div className="flex items-center gap-1 text-xs text-green-600 mt-2">
              <TrendingUp className="h-3 w-3" />
              <span>+3% từ tháng trước</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Trạng thái công việc</CardTitle>
            <CardDescription>Phân bố trạng thái các công việc hiện tại</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={taskStatusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {taskStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Công việc theo độ ưu tiên</CardTitle>
            <CardDescription>Phân bố công việc theo mức độ ưu tiên</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={priorityData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="priority" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="completed" stackId="a" fill="#22c55e" name="Hoàn thành" />
                <Bar dataKey="inProgress" stackId="a" fill="#f59e0b" name="Đang thực hiện" />
                <Bar dataKey="pending" stackId="a" fill="#6b7280" name="Chờ xử lý" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Completion Trend */}
      <Card>
        <CardHeader>
          <CardTitle>Xu hướng hoàn thành công việc</CardTitle>
          <CardDescription>So sánh số công việc được tạo và hoàn thành theo tuần</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={completionTrendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="week" />
              <YAxis />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="created"
                stackId="1"
                stroke="#3b82f6"
                fill="#3b82f6"
                fillOpacity={0.3}
                name="Được tạo"
              />
              <Area
                type="monotone"
                dataKey="completed"
                stackId="2"
                stroke="#22c55e"
                fill="#22c55e"
                fillOpacity={0.3}
                name="Hoàn thành"
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Category Analysis */}
      <Card>
        <CardHeader>
          <CardTitle>Phân tích theo danh mục</CardTitle>
          <CardDescription>Thống kê công việc và thời gian hoàn thành theo từng danh mục</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {categoryData.map((category, index) => (
              <div key={index} className="flex items-center justify-between p-4 border border-border rounded-lg">
                <div className="space-y-1">
                  <h4 className="font-medium">{category.category}</h4>
                  <p className="text-sm text-muted-foreground">{category.tasks} công việc</p>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold">{category.avgTime} ngày</div>
                  <div className="text-sm text-muted-foreground">Thời gian TB</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
