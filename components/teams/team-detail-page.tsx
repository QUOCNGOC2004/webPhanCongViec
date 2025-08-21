"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { AddMemberModal } from "./add-member-modal"
import {
  ArrowLeft,
  Users,
  Calendar,
  Settings,
  Plus,
  Search,
  MoreHorizontal,
  Mail,
  Crown,
  User,
  Eye,
  CheckSquare,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import type { Team, TeamMember } from "./teams-page"

interface TeamDetailPageProps {
  teamId: string
}

// Mock data for team detail
const mockTeamDetail: Team = {
  id: "1",
  name: "Đội phát triển Frontend",
  description: "Chuyên trách phát triển giao diện người dùng và trải nghiệm UX cho các sản phẩm của công ty",
  memberCount: 5,
  activeProjects: 3,
  createdAt: "2024-12-01",
  leader: "Nguyễn Văn A",
  status: "active",
  members: [
    {
      id: "1",
      name: "Nguyễn Văn A",
      email: "nguyenvana@company.com",
      role: "leader",
      joinedAt: "2024-12-01",
    },
    {
      id: "2",
      name: "Trần Thị B",
      email: "tranthib@company.com",
      role: "member",
      joinedAt: "2024-12-02",
    },
    {
      id: "3",
      name: "Lê Văn C",
      email: "levanc@company.com",
      role: "member",
      joinedAt: "2024-12-03",
    },
    {
      id: "4",
      name: "Phạm Thị D",
      email: "phamthid@company.com",
      role: "viewer",
      joinedAt: "2024-12-05",
    },
    {
      id: "5",
      name: "Hoàng Văn E",
      email: "hoangvane@company.com",
      role: "member",
      joinedAt: "2024-12-07",
    },
  ],
}

const mockProjects = [
  {
    id: "1",
    name: "Website thương mại điện tử",
    status: "in-progress",
    progress: 75,
    dueDate: "2024-12-30",
    assignedMembers: 3,
  },
  {
    id: "2",
    name: "Ứng dụng di động",
    status: "planning",
    progress: 25,
    dueDate: "2025-01-15",
    assignedMembers: 2,
  },
  {
    id: "3",
    name: "Dashboard quản trị",
    status: "completed",
    progress: 100,
    dueDate: "2024-12-15",
    assignedMembers: 4,
  },
]

export function TeamDetailPage({ teamId }: TeamDetailPageProps) {
  const [team, setTeam] = useState<Team>(mockTeamDetail)
  const [searchQuery, setSearchQuery] = useState("")
  const [showAddMemberModal, setShowAddMemberModal] = useState(false)

  const filteredMembers = team.members.filter(
    (member) =>
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.email.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleAddMember = (newMember: Omit<TeamMember, "id" | "joinedAt">) => {
    const member: TeamMember = {
      ...newMember,
      id: Date.now().toString(),
      joinedAt: new Date().toISOString().split("T")[0],
    }
    setTeam((prev) => ({
      ...prev,
      members: [...prev.members, member],
      memberCount: prev.memberCount + 1,
    }))
  }

  const handleRemoveMember = (memberId: string) => {
    setTeam((prev) => ({
      ...prev,
      members: prev.members.filter((member) => member.id !== memberId),
      memberCount: prev.memberCount - 1,
    }))
  }

  const handleUpdateMemberRole = (memberId: string, newRole: TeamMember["role"]) => {
    setTeam((prev) => ({
      ...prev,
      members: prev.members.map((member) => (member.id === memberId ? { ...member, role: newRole } : member)),
    }))
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  const getRoleIcon = (role: TeamMember["role"]) => {
    switch (role) {
      case "leader":
        return <Crown className="h-4 w-4 text-yellow-500" />
      case "member":
        return <User className="h-4 w-4 text-blue-500" />
      case "viewer":
        return <Eye className="h-4 w-4 text-gray-500" />
      default:
        return <User className="h-4 w-4" />
    }
  }

  const getRoleText = (role: TeamMember["role"]) => {
    switch (role) {
      case "leader":
        return "Trưởng nhóm"
      case "member":
        return "Thành viên"
      case "viewer":
        return "Người xem"
      default:
        return "Thành viên"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" asChild>
          <a href="/teams" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Quay lại
          </a>
        </Button>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-foreground">{team.name}</h1>
          <p className="text-muted-foreground mt-2">{team.description}</p>
        </div>
        <Button variant="outline" className="gap-2 bg-transparent">
          <Settings className="h-4 w-4" />
          Cài đặt nhóm
        </Button>
      </div>

      {/* Team Stats */}
      <div className="grid gap-6 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Thành viên</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{team.memberCount}</div>
            <p className="text-xs text-muted-foreground">+2 thành viên mới</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Dự án đang thực hiện</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{team.activeProjects}</div>
            <p className="text-xs text-muted-foreground">1 dự án hoàn thành</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Công việc hoàn thành</CardTitle>
            <CheckSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">Tuần này</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Hiệu suất</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">92%</div>
            <p className="text-xs text-muted-foreground">+5% từ tháng trước</p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="members" className="space-y-6">
        <TabsList>
          <TabsTrigger value="members">Thành viên</TabsTrigger>
          <TabsTrigger value="projects">Dự án</TabsTrigger>
          <TabsTrigger value="activity">Hoạt động</TabsTrigger>
        </TabsList>

        <TabsContent value="members" className="space-y-6">
          {/* Members Header */}
          <div className="flex items-center justify-between">
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Tìm kiếm thành viên..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button onClick={() => setShowAddMemberModal(true)} className="gap-2">
              <Plus className="h-4 w-4" />
              Thêm thành viên
            </Button>
          </div>

          {/* Members List */}
          <div className="grid gap-4">
            {filteredMembers.map((member) => (
              <Card key={member.id}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-12 w-12">
                        <AvatarFallback>{getInitials(member.name)}</AvatarFallback>
                      </Avatar>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium">{member.name}</h4>
                          {getRoleIcon(member.role)}
                          <Badge variant="outline">{getRoleText(member.role)}</Badge>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Mail className="h-3 w-3" />
                            {member.email}
                          </span>
                          <span>Tham gia: {new Date(member.joinedAt).toLocaleDateString("vi-VN")}</span>
                        </div>
                      </div>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleUpdateMemberRole(member.id, "leader")}>
                          Đặt làm trưởng nhóm
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleUpdateMemberRole(member.id, "member")}>
                          Đặt làm thành viên
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleUpdateMemberRole(member.id, "viewer")}>
                          Đặt làm người xem
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleRemoveMember(member.id)} className="text-destructive">
                          Xóa khỏi nhóm
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="projects" className="space-y-6">
          <div className="grid gap-4">
            {mockProjects.map((project) => (
              <Card key={project.id}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-2">
                      <h4 className="font-medium">{project.name}</h4>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <Badge
                          variant={
                            project.status === "completed"
                              ? "default"
                              : project.status === "in-progress"
                                ? "secondary"
                                : "outline"
                          }
                        >
                          {project.status === "completed"
                            ? "Hoàn thành"
                            : project.status === "in-progress"
                              ? "Đang thực hiện"
                              : "Lên kế hoạch"}
                        </Badge>
                        <span>{project.assignedMembers} thành viên</span>
                        <span>Hạn: {new Date(project.dueDate).toLocaleDateString("vi-VN")}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold">{project.progress}%</div>
                      <div className="text-sm text-muted-foreground">Tiến độ</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="activity" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Hoạt động gần đây</CardTitle>
              <CardDescription>Các hoạt động của nhóm trong 7 ngày qua</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    action: "Hoàng Văn E đã tham gia nhóm",
                    time: "2 giờ trước",
                    type: "member",
                  },
                  {
                    action: "Trần Thị B đã hoàn thành task 'Thiết kế giao diện login'",
                    time: "5 giờ trước",
                    type: "task",
                  },
                  {
                    action: "Nguyễn Văn A đã tạo dự án mới 'Dashboard quản trị'",
                    time: "1 ngày trước",
                    type: "project",
                  },
                  {
                    action: "Lê Văn C đã cập nhật tiến độ dự án 'Website thương mại điện tử'",
                    time: "2 ngày trước",
                    type: "project",
                  },
                ].map((activity, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 border border-border rounded-lg">
                    <div className="h-2 w-2 rounded-full bg-primary" />
                    <div className="flex-1">
                      <p className="text-sm">{activity.action}</p>
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Add Member Modal */}
      <AddMemberModal open={showAddMemberModal} onOpenChange={setShowAddMemberModal} onAddMember={handleAddMember} />
    </div>
  )
}
