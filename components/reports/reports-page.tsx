"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DatePickerWithRange } from "@/components/ui/date-range-picker"
import { ProjectProgressReport } from "./project-progress-report"
import { TeamPerformanceReport } from "./team-performance-report"
import { TaskAnalyticsReport } from "./task-analytics-report"
import { IndividualReport } from "./individual-report"
import { OverviewStats } from "./overview-stats"
import { Download, Filter } from "lucide-react"
import type { DateRange } from "react-day-picker"

export function ReportsPage() {
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(2024, 11, 1), // December 1, 2024
    to: new Date(2024, 11, 31), // December 31, 2024
  })
  const [selectedTeam, setSelectedTeam] = useState<string>("all")
  const [selectedProject, setSelectedProject] = useState<string>("all")

  const handleExportReport = (reportType: string) => {
    // This would implement actual export functionality
    console.log(`Exporting ${reportType} report`)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Báo cáo và phân tích</h1>
          <p className="text-muted-foreground mt-2">Theo dõi tiến độ, hiệu suất và phân tích dữ liệu dự án</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => handleExportReport("overview")} className="gap-2">
            <Download className="h-4 w-4" />
            Xuất báo cáo
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Bộ lọc báo cáo
          </CardTitle>
          <CardDescription>Chọn khoảng thời gian và phạm vi để tạo báo cáo</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <label className="text-sm font-medium">Khoảng thời gian</label>
              <DatePickerWithRange date={dateRange} setDate={setDateRange} />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Nhóm</label>
              <Select value={selectedTeam} onValueChange={setSelectedTeam}>
                <SelectTrigger>
                  <SelectValue placeholder="Chọn nhóm" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả nhóm</SelectItem>
                  <SelectItem value="frontend">Đội phát triển Frontend</SelectItem>
                  <SelectItem value="backend">Đội phát triển Backend</SelectItem>
                  <SelectItem value="qa">Đội QA & Testing</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Dự án</label>
              <Select value={selectedProject} onValueChange={setSelectedProject}>
                <SelectTrigger>
                  <SelectValue placeholder="Chọn dự án" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả dự án</SelectItem>
                  <SelectItem value="ecommerce">Website thương mại điện tử</SelectItem>
                  <SelectItem value="mobile">Ứng dụng di động</SelectItem>
                  <SelectItem value="dashboard">Dashboard quản trị</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Overview Stats */}
      <OverviewStats dateRange={dateRange} selectedTeam={selectedTeam} selectedProject={selectedProject} />

      {/* Report Tabs */}
      <Tabs defaultValue="projects" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="projects">Tiến độ dự án</TabsTrigger>
          <TabsTrigger value="teams">Hiệu suất nhóm</TabsTrigger>
          <TabsTrigger value="tasks">Phân tích công việc</TabsTrigger>
          <TabsTrigger value="individual">Báo cáo cá nhân</TabsTrigger>
        </TabsList>

        <TabsContent value="projects">
          <ProjectProgressReport
            dateRange={dateRange}
            selectedTeam={selectedTeam}
            selectedProject={selectedProject}
            onExport={() => handleExportReport("projects")}
          />
        </TabsContent>

        <TabsContent value="teams">
          <TeamPerformanceReport
            dateRange={dateRange}
            selectedTeam={selectedTeam}
            onExport={() => handleExportReport("teams")}
          />
        </TabsContent>

        <TabsContent value="tasks">
          <TaskAnalyticsReport
            dateRange={dateRange}
            selectedTeam={selectedTeam}
            selectedProject={selectedProject}
            onExport={() => handleExportReport("tasks")}
          />
        </TabsContent>

        <TabsContent value="individual">
          <IndividualReport
            dateRange={dateRange}
            selectedProject={selectedProject}
            onExport={() => handleExportReport("individual")}
          />
        </TabsContent>
      </Tabs>
    </div>
  )
}
