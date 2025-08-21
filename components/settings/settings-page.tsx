"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { User, Bell, Shield, Palette, Globe, Database, Mail, Lock, Camera, Save, Trash2 } from "lucide-react"

export function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile")
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    desktop: true,
    taskUpdates: true,
    teamInvites: true,
    deadlines: true,
  })

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Cài đặt</h1>
          <p className="text-gray-600">Quản lý tài khoản và tùy chọn ứng dụng</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="profile" className="flex items-center space-x-2">
              <User className="h-4 w-4" />
              <span>Hồ sơ</span>
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center space-x-2">
              <Bell className="h-4 w-4" />
              <span>Thông báo</span>
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center space-x-2">
              <Shield className="h-4 w-4" />
              <span>Bảo mật</span>
            </TabsTrigger>
            <TabsTrigger value="appearance" className="flex items-center space-x-2">
              <Palette className="h-4 w-4" />
              <span>Giao diện</span>
            </TabsTrigger>
            <TabsTrigger value="integrations" className="flex items-center space-x-2">
              <Database className="h-4 w-4" />
              <span>Tích hợp</span>
            </TabsTrigger>
          </TabsList>

          {/* Profile Settings */}
          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Thông tin hồ sơ</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Avatar Section */}
                <div className="flex items-center space-x-4">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src="/diverse-user-avatars.png" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <div className="space-y-2">
                    <Button variant="outline" size="sm">
                      <Camera className="h-4 w-4 mr-2" />
                      Đổi ảnh
                    </Button>
                    <p className="text-sm text-gray-500">JPG, PNG hoặc GIF. Kích thước tối đa 2MB.</p>
                  </div>
                </div>

                {/* Form Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="displayName">Tên hiển thị</Label>
                    <Input id="displayName" defaultValue="Nguyễn Văn A" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" defaultValue="nguyen@example.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="role">Vai trò</Label>
                    <Input id="role" defaultValue="Quản lý dự án" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="timezone">Múi giờ</Label>
                    <Input id="timezone" defaultValue="UTC+7 (Asia/Ho_Chi_Minh)" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">Giới thiệu</Label>
                  <Textarea
                    id="bio"
                    placeholder="Hãy giới thiệu về bản thân..."
                    defaultValue="Quản lý dự án có kinh nghiệm 5+ năm trong phát triển phần mềm."
                  />
                </div>

                <Button className="bg-green-700 hover:bg-green-800">
                  <Save className="h-4 w-4 mr-2" />
                  Lưu thay đổi
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notifications Settings */}
          <TabsContent value="notifications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Tùy chọn thông báo</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label>Thông báo Email</Label>
                      <p className="text-sm text-gray-500">Nhận thông báo qua email</p>
                    </div>
                    <Switch
                      checked={notifications.email}
                      onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, email: checked }))}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label>Thông báo đẩy</Label>
                      <p className="text-sm text-gray-500">Nhận thông báo đẩy trên di động</p>
                    </div>
                    <Switch
                      checked={notifications.push}
                      onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, push: checked }))}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label>Thông báo desktop</Label>
                      <p className="text-sm text-gray-500">Hiển thị thông báo trên desktop</p>
                    </div>
                    <Switch
                      checked={notifications.desktop}
                      onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, desktop: checked }))}
                    />
                  </div>
                </div>

                <hr />

                <div className="space-y-4">
                  <h4 className="font-medium">Thông báo hoạt động</h4>

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label>Cập nhật công việc</Label>
                      <p className="text-sm text-gray-500">Khi công việc được cập nhật hoặc hoàn thành</p>
                    </div>
                    <Switch
                      checked={notifications.taskUpdates}
                      onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, taskUpdates: checked }))}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label>Lời mời nhóm</Label>
                      <p className="text-sm text-gray-500">Khi bạn được mời tham gia nhóm</p>
                    </div>
                    <Switch
                      checked={notifications.teamInvites}
                      onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, teamInvites: checked }))}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label>Nhắc nhở deadline</Label>
                      <p className="text-sm text-gray-500">Nhắc nhở về deadline sắp tới</p>
                    </div>
                    <Switch
                      checked={notifications.deadlines}
                      onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, deadlines: checked }))}
                    />
                  </div>
                </div>

                <Button className="bg-green-700 hover:bg-green-800">
                  <Save className="h-4 w-4 mr-2" />
                  Lưu tùy chọn
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security Settings */}
          <TabsContent value="security" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Cài đặt bảo mật</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="currentPassword">Mật khẩu hiện tại</Label>
                    <Input id="currentPassword" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="newPassword">Mật khẩu mới</Label>
                    <Input id="newPassword" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Xác nhận mật khẩu mới</Label>
                    <Input id="confirmPassword" type="password" />
                  </div>
                </div>

                <Button className="bg-green-700 hover:bg-green-800">
                  <Lock className="h-4 w-4 mr-2" />
                  Cập nhật mật khẩu
                </Button>

                <hr />

                <div className="space-y-4">
                  <h4 className="font-medium">Xác thực hai yếu tố</h4>
                  <p className="text-sm text-gray-500">Thêm lớp bảo mật cho tài khoản của bạn</p>
                  <Button variant="outline">Bật 2FA</Button>
                </div>

                <hr />

                <div className="space-y-4">
                  <h4 className="font-medium text-red-600">Vùng nguy hiểm</h4>
                  <div className="p-4 border border-red-200 rounded-lg bg-red-50">
                    <p className="text-sm text-red-600 mb-3">
                      Khi bạn xóa tài khoản, sẽ không thể khôi phục. Hãy chắc chắn về quyết định này.
                    </p>
                    <Button variant="destructive">
                      <Trash2 className="h-4 w-4 mr-2" />
                      Xóa tài khoản
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Appearance Settings */}
          <TabsContent value="appearance" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Cài đặt giao diện</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <Label className="text-base font-medium">Chủ đề</Label>
                    <p className="text-sm text-gray-500 mb-3">Chọn chủ đề yêu thích</p>
                    <div className="grid grid-cols-3 gap-3">
                      <div className="p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                        <div className="w-full h-20 bg-white border rounded mb-2"></div>
                        <p className="text-sm text-center">Sáng</p>
                      </div>
                      <div className="p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                        <div className="w-full h-20 bg-gray-900 border rounded mb-2"></div>
                        <p className="text-sm text-center">Tối</p>
                      </div>
                      <div className="p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                        <div className="w-full h-20 bg-gradient-to-br from-white to-gray-900 border rounded mb-2"></div>
                        <p className="text-sm text-center">Hệ thống</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <Label className="text-base font-medium">Ngôn ngữ</Label>
                    <p className="text-sm text-gray-500 mb-3">Chọn ngôn ngữ ưa thích</p>
                    <select className="w-full p-2 border rounded-md">
                      <option>Tiếng Việt</option>
                      <option>English</option>
                      <option>中文</option>
                      <option>日本語</option>
                    </select>
                  </div>

                  <div>
                    <Label className="text-base font-medium">Định dạng ngày</Label>
                    <p className="text-sm text-gray-500 mb-3">Chọn cách hiển thị ngày tháng</p>
                    <select className="w-full p-2 border rounded-md">
                      <option>DD/MM/YYYY</option>
                      <option>MM/DD/YYYY</option>
                      <option>YYYY-MM-DD</option>
                    </select>
                  </div>
                </div>

                <Button className="bg-green-700 hover:bg-green-800">
                  <Save className="h-4 w-4 mr-2" />
                  Lưu tùy chọn
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Integrations Settings */}
          <TabsContent value="integrations" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Tích hợp đã kết nối</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <Database className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium">Supabase</p>
                      <p className="text-sm text-gray-500">Cơ sở dữ liệu và xác thực</p>
                    </div>
                  </div>
                  <Badge variant="secondary" className="bg-green-100 text-green-700">
                    Đã kết nối
                  </Badge>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Mail className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium">Dịch vụ Email</p>
                      <p className="text-sm text-gray-500">Gửi thông báo và cập nhật</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Kết nối
                  </Button>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                      <Globe className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                      <p className="font-medium">Slack</p>
                      <p className="text-sm text-gray-500">Giao tiếp nhóm và cập nhật</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Kết nối
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
