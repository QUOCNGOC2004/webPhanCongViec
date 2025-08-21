"use client"

import type React from "react"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import type { Assignment } from "./assignments-page"
import type { Task } from "../tasks/tasks-page"
import type { Team } from "../teams/teams-page"

interface AssignTaskModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onCreateAssignment: (assignment: Omit<Assignment, "id" | "assignedAt">) => void
  teams: Team[]
  tasks: Task[]
}

export function AssignTaskModal({ open, onOpenChange, onCreateAssignment, teams, tasks }: AssignTaskModalProps) {
  const [formData, setFormData] = useState({
    taskId: "",
    assignmentType: "individual" as "individual" | "team",
    assignedTo: "",
    teamId: "",
    assignedBy: "Quản lý dự án", // This would come from current user context
    dueDate: "",
    priority: "medium" as Task["priority"],
    notes: "",
    estimatedHours: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.taskId || !formData.assignedTo || !formData.dueDate) return

    const selectedTask = tasks.find((task) => task.id === formData.taskId)
    if (!selectedTask) return

    const newAssignment: Omit<Assignment, "id" | "assignedAt"> = {
      taskId: formData.taskId,
      taskTitle: selectedTask.title,
      taskDescription: selectedTask.description,
      assignedTo: formData.assignedTo,
      assignedBy: formData.assignedBy,
      dueDate: formData.dueDate,
      priority: formData.priority,
      status: "pending",
      assignmentType: formData.assignmentType,
      teamId: formData.assignmentType === "team" ? formData.teamId : undefined,
      notes: formData.notes || undefined,
      estimatedHours: formData.estimatedHours ? Number.parseInt(formData.estimatedHours) : undefined,
    }

    onCreateAssignment(newAssignment)

    // Reset form
    setFormData({
      taskId: "",
      assignmentType: "individual",
      assignedTo: "",
      teamId: "",
      assignedBy: "Quản lý dự án",
      dueDate: "",
      priority: "medium",
      notes: "",
      estimatedHours: "",
    })

    onOpenChange(false)
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleAssignmentTypeChange = (type: "individual" | "team") => {
    setFormData((prev) => ({
      ...prev,
      assignmentType: type,
      assignedTo: "",
      teamId: "",
    }))
  }

  const handleTeamSelect = (teamId: string) => {
    const selectedTeam = teams.find((team) => team.id === teamId)
    if (selectedTeam) {
      setFormData((prev) => ({
        ...prev,
        teamId: teamId,
        assignedTo: selectedTeam.name,
      }))
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Giao việc mới</DialogTitle>
          <DialogDescription>Giao công việc cho cá nhân hoặc nhóm thực hiện</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Task Selection */}
          <div className="space-y-2">
            <Label htmlFor="taskId">Chọn công việc *</Label>
            <Select value={formData.taskId} onValueChange={(value) => handleInputChange("taskId", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Chọn công việc cần giao" />
              </SelectTrigger>
              <SelectContent>
                {tasks.map((task) => (
                  <SelectItem key={task.id} value={task.id}>
                    <div className="space-y-1">
                      <div className="font-medium">{task.title}</div>
                      <div className="text-sm text-muted-foreground line-clamp-1">{task.description}</div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Assignment Type */}
          <div className="space-y-3">
            <Label>Loại phân công *</Label>
            <RadioGroup
              value={formData.assignmentType}
              onValueChange={handleAssignmentTypeChange}
              className="flex gap-6"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="individual" id="individual" />
                <Label htmlFor="individual">Cá nhân</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="team" id="team" />
                <Label htmlFor="team">Nhóm</Label>
              </div>
            </RadioGroup>
          </div>

          {/* Assignee Selection */}
          {formData.assignmentType === "individual" ? (
            <div className="space-y-2">
              <Label htmlFor="assignedTo">Giao cho (cá nhân) *</Label>
              <Input
                id="assignedTo"
                value={formData.assignedTo}
                onChange={(e) => handleInputChange("assignedTo", e.target.value)}
                placeholder="Nhập tên người thực hiện"
                required
              />
            </div>
          ) : (
            <div className="space-y-2">
              <Label htmlFor="teamId">Giao cho (nhóm) *</Label>
              <Select value={formData.teamId} onValueChange={handleTeamSelect}>
                <SelectTrigger>
                  <SelectValue placeholder="Chọn nhóm thực hiện" />
                </SelectTrigger>
                <SelectContent>
                  {teams.map((team) => (
                    <SelectItem key={team.id} value={team.id}>
                      <div className="space-y-1">
                        <div className="font-medium">{team.name}</div>
                        <div className="text-sm text-muted-foreground">{team.memberCount} thành viên</div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Due Date and Priority */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="dueDate">Hạn hoàn thành *</Label>
              <Input
                id="dueDate"
                type="date"
                value={formData.dueDate}
                onChange={(e) => handleInputChange("dueDate", e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="priority">Độ ưu tiên</Label>
              <Select value={formData.priority} onValueChange={(value) => handleInputChange("priority", value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Thấp</SelectItem>
                  <SelectItem value="medium">Trung bình</SelectItem>
                  <SelectItem value="high">Cao</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Estimated Hours */}
          <div className="space-y-2">
            <Label htmlFor="estimatedHours">Thời gian ước tính (giờ)</Label>
            <Input
              id="estimatedHours"
              type="number"
              min="1"
              value={formData.estimatedHours}
              onChange={(e) => handleInputChange("estimatedHours", e.target.value)}
              placeholder="Nhập số giờ ước tính"
            />
          </div>

          {/* Notes */}
          <div className="space-y-2">
            <Label htmlFor="notes">Ghi chú</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => handleInputChange("notes", e.target.value)}
              placeholder="Thêm ghi chú hoặc hướng dẫn cho người thực hiện"
              rows={3}
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Hủy
            </Button>
            <Button type="submit">Giao việc</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
