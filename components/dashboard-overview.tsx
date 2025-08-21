import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { CheckSquare, Clock, Users, TrendingUp, Plus, Calendar, AlertCircle } from "lucide-react"

export function DashboardOverview() {
  return (
    <div className="space-y-8">
      {/* Welcome section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Chào mừng trở lại!</h1>
          <p className="text-muted-foreground mt-2">Đây là tổng quan về các công việc và dự án của bạn</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Tạo công việc mới
        </Button>
      </div>

      {/* Stats cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tổng công việc</CardTitle>
            <CheckSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">+3 từ tuần trước</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Đang thực hiện</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">67% hoàn thành</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Thành viên nhóm</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">+2 thành viên mới</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Hiệu suất</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">85%</div>
            <p className="text-xs text-muted-foreground">+12% từ tháng trước</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Recent tasks */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Công việc gần đây</CardTitle>
            <CardDescription>Các công việc được cập nhật trong 7 ngày qua</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  title: "Thiết kế giao diện trang chủ",
                  assignee: "Nguyễn Văn A",
                  status: "Đang thực hiện",
                  priority: "Cao",
                  dueDate: "25/12/2024",
                },
                {
                  title: "Phát triển API đăng nhập",
                  assignee: "Trần Thị B",
                  status: "Hoàn thành",
                  priority: "Trung bình",
                  dueDate: "23/12/2024",
                },
                {
                  title: "Kiểm thử tính năng thanh toán",
                  assignee: "Lê Văn C",
                  status: "Chờ xử lý",
                  priority: "Cao",
                  dueDate: "28/12/2024",
                },
                {
                  title: "Viết tài liệu hướng dẫn",
                  assignee: "Phạm Thị D",
                  status: "Đang thực hiện",
                  priority: "Thấp",
                  dueDate: "30/12/2024",
                },
              ].map((task, index) => (
                <div key={index} className="flex items-center justify-between p-4 border border-border rounded-lg">
                  <div className="space-y-1">
                    <h4 className="font-medium">{task.title}</h4>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>Người thực hiện: {task.assignee}</span>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {task.dueDate}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge
                      variant={
                        task.priority === "Cao"
                          ? "destructive"
                          : task.priority === "Trung bình"
                            ? "default"
                            : "secondary"
                      }
                    >
                      {task.priority}
                    </Badge>
                    <Badge
                      variant={
                        task.status === "Hoàn thành"
                          ? "default"
                          : task.status === "Đang thực hiện"
                            ? "secondary"
                            : "outline"
                      }
                    >
                      {task.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Project progress */}
        <Card>
          <CardHeader>
            <CardTitle>Tiến độ dự án</CardTitle>
            <CardDescription>Tình trạng các dự án đang thực hiện</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {[
                { name: "Website thương mại điện tử", progress: 75, tasks: "12/16 công việc" },
                { name: "Ứng dụng di động", progress: 45, tasks: "9/20 công việc" },
                { name: "Hệ thống quản lý", progress: 90, tasks: "18/20 công việc" },
              ].map((project, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">{project.name}</span>
                    <span className="text-muted-foreground">{project.progress}%</span>
                  </div>
                  <Progress value={project.progress} className="h-2" />
                  <p className="text-xs text-muted-foreground">{project.tasks}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Upcoming deadlines */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-orange-500" />
            Deadline sắp tới
          </CardTitle>
          <CardDescription>Các công việc cần hoàn thành trong 7 ngày tới</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Hoàn thiện báo cáo tháng",
                assignee: "Nguyễn Văn E",
                dueDate: "24/12/2024",
                priority: "Cao",
              },
              {
                title: "Cập nhật database",
                assignee: "Trần Thị F",
                dueDate: "26/12/2024",
                priority: "Trung bình",
              },
              {
                title: "Họp review dự án",
                assignee: "Lê Văn G",
                dueDate: "27/12/2024",
                priority: "Cao",
              },
            ].map((task, index) => (
              <div key={index} className="p-4 border border-border rounded-lg space-y-2">
                <h4 className="font-medium">{task.title}</h4>
                <p className="text-sm text-muted-foreground">Người thực hiện: {task.assignee}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">{task.dueDate}</span>
                  <Badge variant={task.priority === "Cao" ? "destructive" : "default"}>{task.priority}</Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
