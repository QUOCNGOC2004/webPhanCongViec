import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Clock, CheckSquare, AlertCircle } from "lucide-react"
import type { Assignment } from "./assignments-page"

interface AssignmentStatsProps {
  assignments: Assignment[]
}

export function AssignmentStats({ assignments }: AssignmentStatsProps) {
  const totalAssignments = assignments.length
  const pendingAssignments = assignments.filter((a) => a.status === "pending").length
  const inProgressAssignments = assignments.filter((a) => a.status === "in-progress").length
  const completedAssignments = assignments.filter((a) => a.status === "completed").length
  const overdueAssignments = assignments.filter(
    (a) => new Date(a.dueDate) < new Date() && a.status !== "completed",
  ).length

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Tổng phân công</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalAssignments}</div>
          <p className="text-xs text-muted-foreground">+3 phân công mới tuần này</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Chờ xác nhận</CardTitle>
          <Clock className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{pendingAssignments}</div>
          <p className="text-xs text-muted-foreground">
            {Math.round((pendingAssignments / totalAssignments) * 100)}% tổng số
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Đang thực hiện</CardTitle>
          <CheckSquare className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{inProgressAssignments}</div>
          <p className="text-xs text-muted-foreground">
            {Math.round((inProgressAssignments / totalAssignments) * 100)}% tổng số
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Quá hạn</CardTitle>
          <AlertCircle className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-destructive">{overdueAssignments}</div>
          <p className="text-xs text-muted-foreground">Cần xử lý ngay</p>
        </CardContent>
      </Card>
    </div>
  )
}
