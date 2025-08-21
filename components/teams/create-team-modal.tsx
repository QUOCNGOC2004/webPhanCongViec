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
import type { Team } from "./teams-page"

interface CreateTeamModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onCreateTeam: (team: Omit<Team, "id" | "createdAt" | "members">) => void
}

export function CreateTeamModal({ open, onOpenChange, onCreateTeam }: CreateTeamModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    leader: "",
    memberCount: 0,
    activeProjects: 0,
    status: "active" as Team["status"],
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.name.trim() || !formData.leader.trim()) return

    const newTeam: Omit<Team, "id" | "createdAt" | "members"> = {
      name: formData.name.trim(),
      description: formData.description.trim(),
      leader: formData.leader.trim(),
      memberCount: formData.memberCount,
      activeProjects: formData.activeProjects,
      status: formData.status,
    }

    onCreateTeam(newTeam)

    // Reset form
    setFormData({
      name: "",
      description: "",
      leader: "",
      memberCount: 0,
      activeProjects: 0,
      status: "active",
    })

    onOpenChange(false)
  }

  const handleInputChange = (field: string, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Tạo nhóm mới</DialogTitle>
          <DialogDescription>Tạo một nhóm làm việc mới cho tổ chức của bạn</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Tên nhóm *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              placeholder="Nhập tên nhóm"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Mô tả</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              placeholder="Mô tả về nhóm và nhiệm vụ"
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="leader">Trưởng nhóm *</Label>
            <Input
              id="leader"
              value={formData.leader}
              onChange={(e) => handleInputChange("leader", e.target.value)}
              placeholder="Tên trưởng nhóm"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="memberCount">Số thành viên dự kiến</Label>
              <Input
                id="memberCount"
                type="number"
                min="0"
                value={formData.memberCount}
                onChange={(e) => handleInputChange("memberCount", Number.parseInt(e.target.value) || 0)}
                placeholder="0"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="activeProjects">Số dự án hiện tại</Label>
              <Input
                id="activeProjects"
                type="number"
                min="0"
                value={formData.activeProjects}
                onChange={(e) => handleInputChange("activeProjects", Number.parseInt(e.target.value) || 0)}
                placeholder="0"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">Trạng thái</Label>
            <Select value={formData.status} onValueChange={(value) => handleInputChange("status", value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Hoạt động</SelectItem>
                <SelectItem value="inactive">Không hoạt động</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Hủy
            </Button>
            <Button type="submit">Tạo nhóm</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
