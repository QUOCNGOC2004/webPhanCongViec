"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { KanbanBoard } from "./kanban-board"
import { CreateTaskModal } from "./create-task-modal"
import { EditTaskModal } from "./edit-task-modal"
import { TaskFilters } from "./task-filters"
import { Plus, Search, Filter } from "lucide-react"

export interface Task {
  id: string
  title: string
  description: string
  status: "todo" | "in-progress" | "done"
  priority: "low" | "medium" | "high"
  assignee: string
  dueDate: string
  tags: string[]
  createdAt: string
}

const mockTasks: Task[] = [
  {
    id: "1",
    title: "Thiết kế giao diện trang chủ",
    description: "Tạo mockup và prototype cho trang chủ website",
    status: "in-progress",
    priority: "high",
    assignee: "Nguyễn Văn A",
    dueDate: "2024-12-25",
    tags: ["Design", "UI/UX"],
    createdAt: "2024-12-20",
  },
  {
    id: "2",
    title: "Phát triển API đăng nhập",
    description: "Xây dựng endpoint authentication và authorization",
    status: "done",
    priority: "medium",
    assignee: "Trần Thị B",
    dueDate: "2024-12-23",
    tags: ["Backend", "API"],
    createdAt: "2024-12-18",
  },
  {
    id: "3",
    title: "Kiểm thử tính năng thanh toán",
    description: "Test các luồng thanh toán và xử lý lỗi",
    status: "todo",
    priority: "high",
    assignee: "Lê Văn C",
    dueDate: "2024-12-28",
    tags: ["Testing", "Payment"],
    createdAt: "2024-12-19",
  },
  {
    id: "4",
    title: "Viết tài liệu hướng dẫn",
    description: "Tạo documentation cho API và user guide",
    status: "todo",
    priority: "low",
    assignee: "Phạm Thị D",
    dueDate: "2024-12-30",
    tags: ["Documentation"],
    createdAt: "2024-12-21",
  },
  {
    id: "5",
    title: "Tối ưu hiệu suất database",
    description: "Optimize queries và thêm indexing",
    status: "in-progress",
    priority: "medium",
    assignee: "Hoàng Văn E",
    dueDate: "2024-12-27",
    tags: ["Database", "Performance"],
    createdAt: "2024-12-20",
  },
]

export function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>(mockTasks)
  const [searchQuery, setSearchQuery] = useState("")
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [editingTask, setEditingTask] = useState<Task | null>(null)
  const [showFilters, setShowFilters] = useState(false)
  const [filters, setFilters] = useState({
    priority: "",
    assignee: "",
    tags: "",
  })

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesPriority = !filters.priority || task.priority === filters.priority
    const matchesAssignee = !filters.assignee || task.assignee.toLowerCase().includes(filters.assignee.toLowerCase())
    const matchesTags = !filters.tags || task.tags.some((tag) => tag.toLowerCase().includes(filters.tags.toLowerCase()))

    return matchesSearch && matchesPriority && matchesAssignee && matchesTags
  })

  const handleCreateTask = (newTask: Omit<Task, "id" | "createdAt">) => {
    const task: Task = {
      ...newTask,
      id: Date.now().toString(),
      createdAt: new Date().toISOString().split("T")[0],
    }
    setTasks([...tasks, task])
  }

  const handleUpdateTask = (taskId: string, updates: Partial<Task>) => {
    setTasks(tasks.map((task) => (task.id === taskId ? { ...task, ...updates } : task)))
  }

  const handleDeleteTask = (taskId: string) => {
    setTasks(tasks.filter((task) => task.id !== taskId))
  }

  const handleEditTask = (task: Task) => {
    setEditingTask(task)
    setShowEditModal(true)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Quản lý công việc</h1>
          <p className="text-muted-foreground mt-2">Theo dõi và quản lý tất cả công việc của nhóm</p>
        </div>
        <Button onClick={() => setShowCreateModal(true)} className="gap-2">
          <Plus className="h-4 w-4" />
          Tạo công việc mới
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Tìm kiếm công việc..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button variant="outline" onClick={() => setShowFilters(!showFilters)} className="gap-2">
          <Filter className="h-4 w-4" />
          Bộ lọc
        </Button>
      </div>

      {/* Filters */}
      {showFilters && <TaskFilters filters={filters} onFiltersChange={setFilters} tasks={tasks} />}

      {/* Kanban Board */}
      <KanbanBoard
        tasks={filteredTasks}
        onUpdateTask={handleUpdateTask}
        onDeleteTask={handleDeleteTask}
        onEditTask={handleEditTask}
      />

      {/* Create Task Modal */}
      <CreateTaskModal open={showCreateModal} onOpenChange={setShowCreateModal} onCreateTask={handleCreateTask} />

      {/* Edit Task Modal */}
      <EditTaskModal
        open={showEditModal}
        onOpenChange={setShowEditModal}
        task={editingTask}
        onUpdateTask={handleUpdateTask}
      />
    </div>
  )
}
