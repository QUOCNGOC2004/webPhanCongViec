"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { CreateTeamModal } from "./create-team-modal"
import { Plus, Search, Users, Calendar, MoreHorizontal } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export interface Team {
  id: string
  name: string
  description: string
  memberCount: number
  activeProjects: number
  createdAt: string
  leader: string
  members: TeamMember[]
  status: "active" | "inactive"
}

export interface TeamMember {
  id: string
  name: string
  email: string
  role: "leader" | "member" | "viewer"
  avatar?: string
  joinedAt: string
}

const mockTeams: Team[] = [
  {
    id: "1",
    name: "Đội phát triển Frontend",
    description: "Chuyên trách phát triển giao diện người dùng và trải nghiệm UX",
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
      {
        id: "4",
        name: "Phạm Thị D",
        email: "phamthid@company.com",
        role: "leader",
        joinedAt: "2024-12-05",
      },
      {
        id: "5",
        name: "Hoàng Văn E",
        email: "hoangvane@company.com",
        role: "member",
        joinedAt: "2024-12-06",
      },
    ],
  },
  {
    id: "3",
    name: "Đội QA & Testing",
    description: "Kiểm thử chất lượng và đảm bảo sản phẩm",
    memberCount: 3,
    activeProjects: 4,
    createdAt: "2024-12-10",
    leader: "Vũ Thị F",
    status: "active",
    members: [
      {
        id: "6",
        name: "Vũ Thị F",
        email: "vuthif@company.com",
        role: "leader",
        joinedAt: "2024-12-10",
      },
    ],
  },
]

export function TeamsPage() {
  const [teams, setTeams] = useState<Team[]>(mockTeams)
  const [searchQuery, setSearchQuery] = useState("")
  const [showCreateModal, setShowCreateModal] = useState(false)

  const filteredTeams = teams.filter(
    (team) =>
      team.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      team.description.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleCreateTeam = (newTeam: Omit<Team, "id" | "createdAt" | "members">) => {
    const team: Team = {
      ...newTeam,
      id: Date.now().toString(),
      createdAt: new Date().toISOString().split("T")[0],
      members: [],
    }
    setTeams([...teams, team])
  }

  const handleDeleteTeam = (teamId: string) => {
    setTeams(teams.filter((team) => team.id !== teamId))
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Quản lý nhóm</h1>
          <p className="text-muted-foreground mt-2">Tạo và quản lý các nhóm làm việc trong tổ chức</p>
        </div>
        <Button onClick={() => setShowCreateModal(true)} className="gap-2">
          <Plus className="h-4 w-4" />
          Tạo nhóm mới
        </Button>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Tìm kiếm nhóm..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Stats */}
      <div className="grid gap-6 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tổng số nhóm</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{teams.length}</div>
            <p className="text-xs text-muted-foreground">+2 nhóm mới tháng này</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tổng thành viên</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{teams.reduce((sum, team) => sum + team.memberCount, 0)}</div>
            <p className="text-xs text-muted-foreground">Trên {teams.length} nhóm</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Dự án đang thực hiện</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{teams.reduce((sum, team) => sum + team.activeProjects, 0)}</div>
            <p className="text-xs text-muted-foreground">Tất cả các nhóm</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Nhóm hoạt động</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{teams.filter((team) => team.status === "active").length}</div>
            <p className="text-xs text-muted-foreground">100% nhóm đang hoạt động</p>
          </CardContent>
        </Card>
      </div>

      {/* Teams Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredTeams.map((team) => (
          <Card key={team.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <CardTitle className="text-lg">
                    <a href={`/teams/${team.id}`} className="hover:text-primary transition-colors">
                      {team.name}
                    </a>
                  </CardTitle>
                  <CardDescription className="line-clamp-2">{team.description}</CardDescription>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem asChild>
                      <a href={`/teams/${team.id}`}>Xem chi tiết</a>
                    </DropdownMenuItem>
                    <DropdownMenuItem>Chỉnh sửa</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleDeleteTeam(team.id)} className="text-destructive">
                      Xóa nhóm
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Team Stats */}
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    {team.memberCount} thành viên
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    {team.activeProjects} dự án
                  </span>
                </div>
                <Badge variant={team.status === "active" ? "default" : "secondary"}>
                  {team.status === "active" ? "Hoạt động" : "Không hoạt động"}
                </Badge>
              </div>

              {/* Team Leader */}
              <div className="flex items-center gap-2 text-sm">
                <span className="text-muted-foreground">Trưởng nhóm:</span>
                <span className="font-medium">{team.leader}</span>
              </div>

              {/* Team Members Preview */}
              <div className="space-y-2">
                <span className="text-sm text-muted-foreground">Thành viên:</span>
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    {team.members.slice(0, 4).map((member) => (
                      <Avatar key={member.id} className="h-8 w-8 border-2 border-background">
                        <AvatarFallback className="text-xs">{getInitials(member.name)}</AvatarFallback>
                      </Avatar>
                    ))}
                    {team.members.length > 4 && (
                      <div className="h-8 w-8 rounded-full bg-muted border-2 border-background flex items-center justify-center">
                        <span className="text-xs text-muted-foreground">+{team.members.length - 4}</span>
                      </div>
                    )}
                  </div>
                  {team.members.length === 0 && (
                    <span className="text-sm text-muted-foreground">Chưa có thành viên</span>
                  )}
                </div>
              </div>

              {/* Created Date */}
              <div className="text-xs text-muted-foreground">
                Tạo ngày: {new Date(team.createdAt).toLocaleDateString("vi-VN")}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredTeams.length === 0 && (
        <div className="text-center py-12">
          <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">Không tìm thấy nhóm nào</h3>
          <p className="text-muted-foreground mb-4">Thử thay đổi từ khóa tìm kiếm hoặc tạo nhóm mới</p>
          <Button onClick={() => setShowCreateModal(true)} className="gap-2">
            <Plus className="h-4 w-4" />
            Tạo nhóm đầu tiên
          </Button>
        </div>
      )}

      {/* Create Team Modal */}
      <CreateTeamModal open={showCreateModal} onOpenChange={setShowCreateModal} onCreateTeam={handleCreateTeam} />
    </div>
  )
}
