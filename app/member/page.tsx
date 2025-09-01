'use client';

import { StatCard } from "../../components/member/StatCard";
import { MembersTable } from "../../components/member/MembersTable";
import { SearchInput } from "../../components/member/SearchInput";
import { useState } from 'react';
import { statsData, membersData } from "./data";
import { DashboardLayout } from "@/components/dashboard-layout";
import { AddMemberModal } from "@/components/member/AddMemberModal";

export default function PersonnelPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        // Sử dụng React Fragment để bọc layout và modal
        <>
            <DashboardLayout>
                <main className="bg-gray-50 min-h-screen p-8">
                    <div className="max-w-7xl mx-auto">
                        {/* Header */}
                        <div className="flex justify-between items-center mb-8">
                            <div>
                                <h1 className="text-3xl font-bold text-gray-800">Quản lý cá nhân</h1>
                                <p className="text-gray-500 mt-1">Tạo và quản lý các thành viên trong tổ chức</p>
                            </div>
                            <button 
                                onClick={() => setIsModalOpen(true)}
                                className="bg-green-600 text-white font-semibold px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                            >
                                + Tạo cá nhân mới
                            </button>
                        </div>

                        {/* Search Bar */}
                        <div className="mb-6">
                            <SearchInput />
                        </div>

                        {/* Stats Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                            {statsData.map((stat) => (
                                <StatCard
                                    key={stat.title}
                                    title={stat.title}
                                    value={stat.value}
                                    note={stat.note}
                                    icon={stat.icon as any}
                                />
                            ))}
                        </div>

                        {/* Members Table */}
                        <MembersTable members={membersData} />
                    </div>
                </main>
            </DashboardLayout>

            {/* Đưa Modal ra ngoài DashboardLayout */}
            {isModalOpen && <AddMemberModal onClose={() => setIsModalOpen(false)} />}
        </>
    );
}