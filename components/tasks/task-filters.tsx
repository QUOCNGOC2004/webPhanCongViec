"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"
import type { Task } from "./tasks-page"

interface TaskFiltersProps {
  filters: {
    priority: string
    assignee: string
    tags: string
  }
  onFiltersChange: (filters: { priority: string; assignee: string; tags: string }) => void
  tasks: Task[]
}

export function TaskFilters({ filters, onFiltersChange, tasks }: TaskFiltersProps) {
  const handleFilterChange = (key: string, value: string) => {
    onFiltersChange({ ...filters, [key]: value })
  }

  const clearFilters = () => {
    onFiltersChange({ priority: "", assignee: "", tags: "" })
  }

  const uniqueAssignees = Array.from(new Set(tasks.map((task) => task.assignee))).filter(Boolean)
  const uniqueTags = Array.from(new Set(tasks.flatMap((task) => task.tags))).filter(Boolean)

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-medium">Bộ lọc</h3>
          <Button variant="ghost" size="sm" onClick={clearFilters} className="gap-2">
            <X className="h-4 w-4" />
            Xóa bộ lọc
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label>Độ ưu tiên</Label>
            <Select value={filters.priority} onValueChange={(value) => handleFilterChange("priority", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Tất cả" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả</SelectItem>
                <SelectItem value="high">Cao</SelectItem>
                <SelectItem value="medium">Trung bình</SelectItem>
                <SelectItem value="low">Thấp</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Người thực hiện</Label>
            <Input
              placeholder="Tìm theo tên..."
              value={filters.assignee}
              onChange={(e) => handleFilterChange("assignee", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label>Tags</Label>
            <Input
              placeholder="Tìm theo tag..."
              value={filters.tags}
              onChange={(e) => handleFilterChange("tags", e.target.value)}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
