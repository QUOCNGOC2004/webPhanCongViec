// Dữ liệu mẫu cho trang chi tiết
export const memberDetailData = {
  id: 1,
  name: "Nguyễn Văn An",
  position: "Frontend Developer",
  avatarInitial: "A",
  avatarColor: "bg-green-500",
  status: "Hoạt động",
  email: "an.nguyen@email.com",
  phone: "0901234567",
  department: "Phát triển sản phẩm",
  manager: "Trần Thị Manager",
  location: "Hà Nội",
  joinDate: "15/01/2024",
};

export const overviewStats = [
  { title: "Nhóm tham gia", value: "3", color: "blue" },
  { title: "Công việc hoàn thành", value: "1", color: "green" },
  { title: "Công việc đang thực hiện", value: "2", color: "yellow" },
  { title: "Công việc quá hạn", value: "1", color: "red" },
];

export const memberGroups = [
  {
    id: 1,
    name: "Đội phát triển Frontend",
    description: "Chuyên trách phát triển giao diện người dùng và trải nghiệm UX",
    members: 5,
    role: "Thành viên chính",
    status: "Hoạt động",
  },
  {
    id: 2,
    name: "Đội phát triển Backend",
    description: "Phụ trách API, database và hệ thống server",
    members: 4,
    role: "Thành viên",
    status: "Hoạt động",
  },
];

export const memberTasks = [
  {
    id: 1,
    title: "Thiết kế giao diện trang đăng nhập",
    description: "Tạo giao diện đăng nhập responsive cho ứng dụng mobile",
    project: "Ứng dụng TaskFlow Mobile",
    dueDate: "25/03/2024",
    priority: "Cao",
    status: "Đang thực hiện",
  },
  {
    id: 2,
    title: "Tối ưu performance trang chủ",
    description: "Giảm thời gian tải trang và tối ưu các tài nguyên",
    project: "Website TaskFlow",
    dueDate: "30/03/2024",
    priority: "Trung bình",
    status: "Chờ thực hiện",
  },
];