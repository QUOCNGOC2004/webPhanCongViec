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
import { Badge } from "@/components/ui/badge"
import type { Task } from "../tasks/tasks-page"
import type { Team } from "../teams/teams-page"

interface BulkAssignModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onBulkAssign: (assignmentData: {
    assignedTo: string
    assignedBy: string
    dueDate: string
    priority: Task["priority"]
    assignmentType: "individual" | "team"
    teamId?: string
    notes?: string
    estimatedHours?: number
  }) => void
  selectedTasks: string[]
  tasks: Task[]
  teams: Team[]
}

export function BulkAssignModal({
  open,
  onOpenChange,
  onBulkAssign,
  selectedTasks,
  tasks,
  teams,
}: BulkAssignModalProps) {
  const [formData, setFormData] = useState({
    assignmentType: "individual" as "individual" | "team",
    assignedTo: "",
    teamId: "",
    assignedBy: "Quản lý dự án",
    dueDate: "",
    priority: "medium" as Task["priority"],
    notes: "",
    estimatedHours: "",
  })

  const selectedTasksData = tasks.filter((task) => selectedTasks.includes(task.id))

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.assignedTo || !formData.dueDate) return

    const assignmentData = {
      assignedTo: formData.assignedTo,
      assignedBy: formData.assignedBy,
      dueDate: formData.dueDate,
      priority: formData.priority,
      assignmentType: formData.assignmentType,
      teamId: formData.assignmentType === "team" ? formData.teamId : undefined,
      notes: formData.notes || undefined,
      estimatedHours: formData.estimatedHours ? Number.parseInt(formData.estimatedHours) : undefined,
    }

    onBulkAssign(assignmentData)

    // Reset form
    setFormData({
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
          <DialogTitle>Giao việc hàng loạt</DialogTitle>
          <DialogDescription>
            Giao {selectedTasks.length} công việc cho cùng một người hoặc nhóm thực hiện
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Selected Tasks Preview */}
          <div className="space-y-2">
            <Label>Các công việc được chọn ({selectedTasks.length})</Label>
            <div className="max-h-32 overflow-y-auto space-y-2 p-3 border border-border rounded-lg bg-muted/50">
              {selectedTasksData.map((task) => (
                <div key={task.id} className="flex items-center justify-between text-sm">
                  <span className="font-medium">{task.title}</span>
                  <Badge
                    variant={
                      task.priority === "high" ? "destructive" : task.priority === "medium" ? "default" : "secondary"
                    }
                  >
                    {task.priority === "high" ? "Cao" : task.priority === "medium" ? "Trung bình" : "Thấp"}
                  </Badge>
                </div>
              ))}
            </div>
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
                <RadioGroupItem value="individual" id="bulk-individual" />
                <Label htmlFor="bulk-individual">Cá nhân</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="team" id="bulk-team" />
                <Label htmlFor="bulk-team">Nhóm</Label>
              </div>
            </RadioGroup>
          </div>

          {/* Assignee Selection */}
          {formData.assignmentType === "individual" ? (
            <div className="space-y-2">
              <Label htmlFor="bulk-assignedTo">Giao cho (cá nhân) *</Label>
              <Input
                id="bulk-assignedTo"
                value={formData.assignedTo}
                onChange={(e) => handleInputChange("assignedTo", e.target.value)}
                placeholder="Nhập tên người thực hiện"
                required
              />
            </div>
          ) : (
            <div className="space-y-2">
              <Label htmlFor="bulk-teamId">Giao cho (nhóm) *</Label>
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
              <Label htmlFor="bulk-dueDate">Hạn hoàn thành *</Label>
              <Input
                id="bulk-dueDate"
                type="date"
                value={formData.dueDate}
                onChange={(e) => handleInputChange("dueDate", e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="bulk-priority">Độ ưu tiên chung</Label>
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

          {/* Estimated Hours per Task */}
          <div className="space-y-2">
            <Label htmlFor="bulk-estimatedHours">Thời gian ước tính mỗi công việc (giờ)</Label>
            <Input
              id="bulk-estimatedHours"
              type="number"
              min="1"
              value={formData.estimatedHours}
              onChange={(e) => handleInputChange("estimatedHours", e.target.value)}
              placeholder="Nhập số giờ ước tính cho mỗi công việc"
            />
          </div>

          {/* Notes */}
          <div className="space-y-2">
            <Label htmlFor="bulk-notes">Ghi chú chung</Label>
            <Textarea
              id="bulk-notes"
              value={formData.notes}
              onChange={(e) => handleInputChange("notes", e.target.value)}
              placeholder="Thêm ghi chú chung cho tất cả công việc được giao"
              rows={3}
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Hủy
            </Button>
            <Button type="submit">Giao {selectedTasks.length} công việc</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
