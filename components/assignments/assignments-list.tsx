"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Calendar, Clock, User, Users, MoreHorizontal, CheckCircle, XCircle, PlayCircle } from "lucide-react"
import type { Assignment } from "./assignments-page"

interface AssignmentsListProps {
  assignments: Assignment[]
  onUpdateStatus: (assignmentId: string, status: Assignment["status"]) => void
}

export function AssignmentsList({ assignments, onUpdateStatus }: AssignmentsListProps) {
  const getStatusColor = (status: Assignment["status"]) => {
    switch (status) {
      case "pending":
        return "outline"
      case "accepted":
        return "secondary"
      case "in-progress":
        return "default"
      case "completed":
        return "default"
      case "rejected":
        return "destructive"
      default:
        return "outline"
    }
  }

  const getStatusText = (status: Assignment["status"]) => {
    switch (status) {
      case "pending":
        return "Chờ xác nhận"
      case "accepted":
        return "Đã chấp nhận"
      case "in-progress":
        return "Đang thực hiện"
      case "completed":
        return "Hoàn thành"
      case "rejected":
        return "Từ chối"
      default:
        return "Không xác định"
    }
  }

  const getPriorityColor = (priority: Assignment["priority"]) => {
    switch (priority) {
      case "high":
        return "destructive"
      case "medium":
        return "default"
      case "low":
        return "secondary"
      default:
        return "secondary"
    }
  }

  const getPriorityText = (priority: Assignment["priority"]) => {
    switch (priority) {
      case "high":
        return "Cao"
      case "medium":
        return "Trung bình"
      case "low":
        return "Thấp"
      default:
        return "Thấp"
    }
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  const isOverdue = (dueDate: string, status: Assignment["status"]) => {
    return new Date(dueDate) < new Date() && status !== "completed"
  }

  if (assignments.length === 0) {
    return (
      <div className="text-center py-12">
        <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-medium text-foreground mb-2">Không có phân công nào</h3>
        <p className="text-muted-foreground">Chưa có phân công nào trong danh mục này</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {assignments.map((assignment) => (
        <Card
          key={assignment.id}
          className={isOverdue(assignment.dueDate, assignment.status) ? "border-destructive" : ""}
        >
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="space-y-3 flex-1">
                {/* Task Title and Description */}
                <div>
                  <h4 className="font-medium text-lg">{assignment.taskTitle}</h4>
                  <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{assignment.taskDescription}</p>
                </div>

                {/* Assignment Info */}
                <div className="flex items-center gap-6 text-sm">
                  <div className="flex items-center gap-2">
                    {assignment.assignmentType === "individual" ? (
                      <User className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Users className="h-4 w-4 text-muted-foreground" />
                    )}
                    <span className="font-medium">Giao cho:</span>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarFallback className="text-xs">{getInitials(assignment.assignedTo)}</AvatarFallback>
                      </Avatar>
                      <span>{assignment.assignedTo}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-muted-foreground">
                    <span>Giao bởi:</span>
                    <span>{assignment.assignedBy}</span>
                  </div>
                </div>

                {/* Dates and Priority */}
                <div className="flex items-center gap-6 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>Giao ngày: {new Date(assignment.assignedAt).toLocaleDateString("vi-VN")}</span>
                  </div>

                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>Hạn: {new Date(assignment.dueDate).toLocaleDateString("vi-VN")}</span>
                    {isOverdue(assignment.dueDate, assignment.status) && (
                      <Badge variant="destructive" className="ml-2">
                        Quá hạn
                      </Badge>
                    )}
                  </div>

                  {assignment.estimatedHours && (
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <span>{assignment.estimatedHours}h ước tính</span>
                    </div>
                  )}
                </div>

                {/* Notes */}
                {assignment.notes && (
                  <div className="p-3 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground">
                      <strong>Ghi chú:</strong> {assignment.notes}
                    </p>
                  </div>
                )}
              </div>

              {/* Status and Actions */}
              <div className="flex items-start gap-3">
                <div className="space-y-2">
                  <Badge variant={getStatusColor(assignment.status)}>{getStatusText(assignment.status)}</Badge>
                  <Badge variant={getPriorityColor(assignment.priority)}>{getPriorityText(assignment.priority)}</Badge>
                </div>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    {assignment.status === "pending" && (
                      <>
                        <DropdownMenuItem onClick={() => onUpdateStatus(assignment.id, "accepted")}>
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Chấp nhận
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onUpdateStatus(assignment.id, "rejected")}>
                          <XCircle className="h-4 w-4 mr-2" />
                          Từ chối
                        </DropdownMenuItem>
                      </>
                    )}
                    {assignment.status === "accepted" && (
                      <DropdownMenuItem onClick={() => onUpdateStatus(assignment.id, "in-progress")}>
                        <PlayCircle className="h-4 w-4 mr-2" />
                        Bắt đầu thực hiện
                      </DropdownMenuItem>
                    )}
                    {assignment.status === "in-progress" && (
                      <DropdownMenuItem onClick={() => onUpdateStatus(assignment.id, "completed")}>
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Hoàn thành
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuItem>Xem chi tiết</DropdownMenuItem>
                    <DropdownMenuItem>Chỉnh sửa</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
