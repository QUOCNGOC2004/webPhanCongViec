"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TaskCard } from "./task-card"
import { Badge } from "@/components/ui/badge"
import type { Task } from "./tasks-page"

interface KanbanBoardProps {
  tasks: Task[]
  onUpdateTask: (taskId: string, updates: Partial<Task>) => void
  onDeleteTask: (taskId: string) => void
  onEditTask: (task: Task) => void
}

const columns = [
  { id: "todo", title: "Cần làm", status: "todo" as const },
  { id: "in-progress", title: "Đang thực hiện", status: "in-progress" as const },
  { id: "done", title: "Hoàn thành", status: "done" as const },
]

export function KanbanBoard({ tasks, onUpdateTask, onDeleteTask, onEditTask }: KanbanBoardProps) {
  const [draggedTask, setDraggedTask] = useState<Task | null>(null)

  const handleDragStart = (task: Task) => {
    setDraggedTask(task)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleDrop = (e: React.DragEvent, status: Task["status"]) => {
    e.preventDefault()
    if (draggedTask && draggedTask.status !== status) {
      onUpdateTask(draggedTask.id, { status })
    }
    setDraggedTask(null)
  }

  const getTasksByStatus = (status: Task["status"]) => {
    return tasks.filter((task) => task.status === status)
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {columns.map((column) => {
        const columnTasks = getTasksByStatus(column.status)
        return (
          <Card
            key={column.id}
            className="min-h-[600px]"
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, column.status)}
          >
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>{column.title}</span>
                <Badge variant="secondary">{columnTasks.length}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {columnTasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onDragStart={() => handleDragStart(task)}
                  onUpdateTask={onUpdateTask}
                  onDeleteTask={onDeleteTask}
                  onEditTask={onEditTask}
                />
              ))}
              {columnTasks.length === 0 && (
                <div className="text-center text-muted-foreground py-8">Không có công việc nào</div>
              )}
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
