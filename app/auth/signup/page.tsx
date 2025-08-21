"use client"

import type React from "react"

import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function SignUpPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [displayName, setDisplayName] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    if (password !== confirmPassword) {
      setError("Mật khẩu xác nhận không khớp")
      setIsLoading(false)
      return
    }

    try {
      console.log("[v0] Starting signup process...")
      const supabase = createClient()
      console.log("[v0] Supabase client created successfully")

      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            display_name: displayName,
          },
        },
      })

      console.log("[v0] Signup response:", { data, error })

      if (error) throw error

      if (data.user && !data.user.email_confirmed_at) {
        // If email confirmation is required, show message
        setError(
          "Vui lòng kiểm tra email để xác nhận tài khoản. Nếu không nhận được email, hãy thử đăng nhập trực tiếp.",
        )
        setIsLoading(false)
        return
      }

      console.log("[v0] Signup successful, redirecting to dashboard...")
      router.push("/")
    } catch (error: unknown) {
      console.error("[v0] Signup error:", error)
      let errorMessage = "Đã xảy ra lỗi"
      if (error instanceof Error) {
        if (error.message.includes("User already registered")) {
          errorMessage = "Email này đã được đăng ký. Vui lòng sử dụng email khác hoặc đăng nhập."
        } else if (error.message.includes("Password")) {
          errorMessage = "Mật khẩu phải có ít nhất 6 ký tự."
        } else {
          errorMessage = error.message
        }
      }
      setError(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-green-100 p-4">
      <div className="w-full max-w-md">
        <Card className="shadow-xl">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-green-800">Đăng ký TaskFlow</CardTitle>
            <CardDescription>Tạo tài khoản để bắt đầu quản lý công việc hiệu quả</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSignUp} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="displayName">Tên hiển thị</Label>
                <Input
                  id="displayName"
                  type="text"
                  placeholder="Nguyễn Văn A"
                  required
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Mật khẩu</Label>
                <Input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Xác nhận mật khẩu</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
              {error && <div className="text-sm text-red-600 bg-red-50 p-3 rounded-md">{error}</div>}
              <Button type="submit" className="w-full bg-green-700 hover:bg-green-800" disabled={isLoading}>
                {isLoading ? "Đang tạo tài khoản..." : "Đăng ký"}
              </Button>
            </form>
            <div className="mt-6 text-center text-sm">
              Đã có tài khoản?{" "}
              <Link href="/auth/login" className="text-green-700 hover:text-green-800 font-medium">
                Đăng nhập
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
