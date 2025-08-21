import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle } from "lucide-react"
import Link from "next/link"

export default function SignUpSuccessPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-green-100 p-4">
      <div className="w-full max-w-md">
        <Card className="shadow-xl">
          <CardHeader className="text-center">
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <CardTitle className="text-2xl font-bold text-green-800">Đăng ký thành công!</CardTitle>
            <CardDescription>Vui lòng kiểm tra email để xác nhận tài khoản</CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-sm text-gray-600 mb-6">
              Chúng tôi đã gửi email xác nhận đến địa chỉ email của bạn. Vui lòng click vào link trong email để kích
              hoạt tài khoản.
            </p>
            <Link href="/auth/login" className="text-green-700 hover:text-green-800 font-medium">
              Quay lại trang đăng nhập
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
