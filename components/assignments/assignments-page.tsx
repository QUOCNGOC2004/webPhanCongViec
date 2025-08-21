"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AssignTaskModal } from "./assign-task-modal"
import { BulkAssignModal } from "./bulk-assign-modal"
import { AssignmentsList } from "./assignments-list"
import { AssignmentStats } from "./assignment-stats"
import { Search, Users, UserPlus, Calendar, CheckSquare } from "lucide-react"
import type { Task } from "../tasks/tasks-page"
import type { Team } from "../teams/teams-page"

export interface Assignment {
  id: string
  taskId: string
  taskTitle: string
  taskDescription: string
  assignedTo: string
  assignedBy: string
  assignedAt: string
  dueDate: string
  priority: Task["priority"]
  status: "pending" | "accepted" | "in-progress" | "completed" | "rejected"
  assignmentType: "individual" | "team"
  teamId?: string
  notes?: string
  estimatedHours?: number
}

const mockAssignments: Assignment[] = [
  {
    id: "1",
    taskId: "1",
    taskTitle: "Thiết kế giao diện trang chủ",
    taskDescription: "Tạo mockup và prototype cho trang chủ website",
    assignedTo: "Nguyễn Văn A",
    assignedBy: "Quản lý dự án",
    assignedAt: "2024-12-20",
    dueDate: "2024-12-25",
    priority: "high",
    status: "in-progress",
    assignmentType: "individual",
    notes: "Cần hoàn thành trước deadline để team backend có thể bắt đầu",
    estimatedHours: 16,
  },
  {
    id: "2",
    taskId: "2",
    taskTitle: "Phát triển API đăng nhập",
    taskDescription: "Xây dựng endpoint authentication và authorization",
    assignedTo: "Đội phát triển Backend",
    assignedBy: "Tech Lead",
    assignedAt: "2024-12-18",
    dueDate: "2024-12-23",
    priority: "medium",
    status: "completed",
    assignmentType: "team",
    teamId: "2",
    estimatedHours: 24,
  },
  {
    id: "3",
    taskId: "3",
    taskTitle: "Kiểm thử tính năng thanh toán",
    taskDescription: "Test các luồng thanh toán và xử lý lỗi",
    assignedTo: "Lê Văn C",
    assignedBy: "QA Lead",
    assignedAt: "2024-12-19",
    dueDate: "2024-12-28",
    priority: "high",
    status: "pending",
    assignmentType: "individual",
    notes: "Cần test trên cả môi trường staging và production",
    estimatedHours: 12,
  },
  {
    id: "4",
    taskId: "4",
    taskTitle: "Viết tài liệu hướng dẫn",
    taskDescription: "Tạo documentation cho API và user guide",
    assignedTo: "Đội QA & Testing",
    assignedBy: "Product Manager",
    assignedAt: "2024-12-21",
    dueDate: "2024-12-30",
    priority: "low",
    status: "accepted",
    assignmentType: "team",
    teamId: "3",
    estimatedHours: 8,
  },
]

const mockTeams: Team[] = [
  {
    id: "1",
    name: "Đội phát triển Frontend",
    description: "Chuyên trách phát triển giao diện người dùng",
    memberCount: 5,
    activeProjects: 3,
    createdAt: "2024-12-01",
    leader: "Nguyễn Văn A",
    status: "active",
    members: [
      { id: "1", name: "Nguyễn Văn A", email: "nguyenvana@company.com", role: "leader", joinedAt: "2024-12-01" },
      { id: "2", name: "Trần Thị B", email: "tranthib@company.com", role: "member", joinedAt: "2024-12-02" },
    ],
  },
  {
    id: "2",
    name: "Đội phát triển Backend",
    description: "Phụ trách API, database và hệ thống server",
    memberCount: 4,
    activeProjects: 2,
    createdAt: "2024-12-05",
    leader: "Phạm Thị D",
    status: "active",
    members: [
      { id: "4", name: "Phạm Thị D", email: "phamthid@company.com", role: "leader", joinedAt: "2024-12-05" },
      { id: "5", name: "Hoàng Văn E", email: "hoangvane@company.com", role: "member", joinedAt: "2024-12-06" },
    ],
  },
]

const mockTasks: Task[] = [
  {
    id: "5",
    title: "Tối ưu hiệu suất database",
    description: "Optimize queries và thêm indexing",
    status: "todo",
    priority: "medium",
    assignee: "",
    dueDate: "2024-12-27",
    tags: ["Database", "Performance"],
    createdAt: "2024-12-20",
  },
  {
    id: "6",
    title: "Thiết kế responsive mobile",
    description: "Tạo giao diện responsive cho mobile devices",
    status: "todo",
    priority: "high",
    assignee: "",
    dueDate: "2024-12-29",
    tags: ["Mobile", "UI/UX"],
    createdAt: "2024-12-21",
  },
]

export function AssignmentsPage() {
  const [assignments, setAssignments] = useState<Assignment[]>(mockAssignments)
  const [searchQuery, setSearchQuery] = useState("")
  const [showAssignModal, setShowAssignModal] = useState(false)
  const [showBulkAssignModal, setShowBulkAssignModal] = useState(false)
  const [selectedTasks, setSelectedTasks] = useState<string[]>([])

  const filteredAssignments = assignments.filter(
    (assignment) =>
      assignment.taskTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      assignment.assignedTo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      assignment.assignedBy.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleCreateAssignment = (newAssignment: Omit<Assignment, "id" | "assignedAt">) => {
    const assignment: Assignment = {
      ...newAssignment,
      id: Date.now().toString(),
      assignedAt: new Date().toISOString().split("T")[0],
    }
    setAssignments([...assignments, assignment])
  }

  const handleBulkAssign = (assignmentData: {
    assignedTo: string
    assignedBy: string
    dueDate: string
    priority: Task["priority"]
    assignmentType: "individual" | "team"
    teamId?: string
    notes?: string
    estimatedHours?: number
  }) => {
    const newAssignments = selectedTasks
      .map((taskId) => {
        const task = mockTasks.find((t) => t.id === taskId)
        if (!task) return null

        const assignment: Assignment = {
          id: `${Date.now()}-${taskId}`,
          taskId: task.id,
          taskTitle: task.title,
          taskDescription: task.description,
          assignedAt: new Date().toISOString().split("T")[0],
          status: "pending",
          ...assignmentData,
        }
        return assignment
      })
      .filter(Boolean) as Assignment[]

    setAssignments([...assignments, ...newAssignments])
    setSelectedTasks([])
  }

  const handleUpdateAssignmentStatus = (assignmentId: string, status: Assignment["status"]) => {
    setAssignments(
      assignments.map((assignment) => (assignment.id === assignmentId ? { ...assignment, status } : assignment)),
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Phân công và giao việc</h1>
          <p className="text-muted-foreground mt-2">Giao việc cho cá nhân và nhóm, theo dõi tiến độ thực hiện</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => setShowBulkAssignModal(true)} className="gap-2">
            <Users className="h-4 w-4" />
            Giao việc hàng loạt
          </Button>
          <Button onClick={() => setShowAssignModal(true)} className="gap-2">
            <UserPlus className="h-4 w-4" />
            Giao việc mới
          </Button>
        </div>
      </div>

      {/* Stats */}
      <AssignmentStats assignments={assignments} />

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Tìm kiếm phân công..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Tabs */}
      <Tabs defaultValue="all" className="space-y-6">
        <TabsList>
          <TabsTrigger value="all">Tất cả</TabsTrigger>
          <TabsTrigger value="pending">Chờ xác nhận</TabsTrigger>
          <TabsTrigger value="in-progress">Đang thực hiện</TabsTrigger>
          <TabsTrigger value="completed">Hoàn thành</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <AssignmentsList assignments={filteredAssignments} onUpdateStatus={handleUpdateAssignmentStatus} />
        </TabsContent>

        <TabsContent value="pending">
          <AssignmentsList
            assignments={filteredAssignments.filter((a) => a.status === "pending")}
            onUpdateStatus={handleUpdateAssignmentStatus}
          />
        </TabsContent>

        <TabsContent value="in-progress">
          <AssignmentsList
            assignments={filteredAssignments.filter((a) => a.status === "in-progress")}
            onUpdateStatus={handleUpdateAssignmentStatus}
          />
        </TabsContent>

        <TabsContent value="completed">
          <AssignmentsList
            assignments={filteredAssignments.filter((a) => a.status === "completed")}
            onUpdateStatus={handleUpdateAssignmentStatus}
          />
        </TabsContent>
      </Tabs>

      {/* Unassigned Tasks Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckSquare className="h-5 w-5" />
            Công việc chưa phân công
          </CardTitle>
          <CardDescription>Các công việc đang chờ được giao cho thành viên hoặc nhóm</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockTasks.map((task) => (
              <div key={task.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={selectedTasks.includes(task.id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedTasks([...selectedTasks, task.id])
                      } else {
                        setSelectedTasks(selectedTasks.filter((id) => id !== task.id))
                      }
                    }}
                    className="rounded border-border"
                  />
                  <div className="space-y-1">
                    <h4 className="font-medium">{task.title}</h4>
                    <p className="text-sm text-muted-foreground line-clamp-1">{task.description}</p>
                    <div className="flex items-center gap-2">
                      <Badge
                        variant={
                          task.priority === "high"
                            ? "destructive"
                            : task.priority === "medium"
                              ? "default"
                              : "secondary"
                        }
                      >
                        {task.priority === "high" ? "Cao" : task.priority === "medium" ? "Trung bình" : "Thấp"}
                      </Badge>
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {new Date(task.dueDate).toLocaleDateString("vi-VN")}
                      </span>
                    </div>
                  </div>
                </div>
                <Button size="sm" variant="outline" onClick={() => setShowAssignModal(true)}>
                  Giao việc
                </Button>
              </div>
            ))}
            {selectedTasks.length > 0 && (
              <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                <span className="text-sm font-medium">Đã chọn {selectedTasks.length} công việc</span>
                <Button size="sm" onClick={() => setShowBulkAssignModal(true)}>
                  Giao việc hàng loạt
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Modals */}
      <AssignTaskModal
        open={showAssignModal}
        onOpenChange={setShowAssignModal}
        onCreateAssignment={handleCreateAssignment}
        teams={mockTeams}
        tasks={mockTasks}
      />

      <BulkAssignModal
        open={showBulkAssignModal}
        onOpenChange={setShowBulkAssignModal}
        onBulkAssign={handleBulkAssign}
        selectedTasks={selectedTasks}
        tasks={mockTasks}
        teams={mockTeams}
      />
    </div>
  )
}
