import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { TrendingUp, TrendingDown, CheckSquare, Clock, Users, AlertTriangle } from "lucide-react"
import type { DateRange } from "react-day-picker"

interface OverviewStatsProps {
  dateRange: DateRange | undefined
  selectedTeam: string
  selectedProject: string
}

export function OverviewStats({ dateRange, selectedTeam, selectedProject }: OverviewStatsProps) {
  // Mock data - in real app, this would be calculated based on filters
  const stats = {
    totalTasks: 156,
    completedTasks: 124,
    inProgressTasks: 23,
    overdueTasks: 9,
    teamEfficiency: 87,
    projectProgress: 73,
    avgCompletionTime: 2.4,
    taskCompletionRate: 79.5,
  }

  const completionRate = (stats.completedTasks / stats.totalTasks) * 100

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Tổng công việc</CardTitle>
          <CheckSquare className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.totalTasks}</div>
          <div className="space-y-2 mt-2">
            <div className="flex items-center justify-between text-xs">
              <span>Hoàn thành: {stats.completedTasks}</span>
              <span>{completionRate.toFixed(1)}%</span>
            </div>
            <Progress value={completionRate} className="h-2" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Hiệu suất nhóm</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.teamEfficiency}%</div>
          <div className="flex items-center gap-1 text-xs text-green-600 mt-2">
            <TrendingUp className="h-3 w-3" />
            <span>+5% từ tháng trước</span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Thời gian hoàn thành TB</CardTitle>
          <Clock className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.avgCompletionTime} ngày</div>
          <div className="flex items-center gap-1 text-xs text-green-600 mt-2">
            <TrendingDown className="h-3 w-3" />
            <span>-0.3 ngày so với trước</span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Công việc quá hạn</CardTitle>
          <AlertTriangle className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-destructive">{stats.overdueTasks}</div>
          <div className="flex items-center gap-1 text-xs text-red-600 mt-2">
            <TrendingUp className="h-3 w-3" />
            <span>+2 từ tuần trước</span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
