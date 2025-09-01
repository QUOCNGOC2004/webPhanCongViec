'use client';

import { useState } from 'react';
import Link from 'next/link';
import { MemberAvatar } from '../../../components/member/MemberAvatar';
import { StatusBadge } from '../../../components/member/StatusBadge';
import { memberDetailData, overviewStats, memberGroups, memberTasks } from './data';
import { ChevronLeft, ExternalLink, User, CheckCircle, Clock, AlertTriangle, Users, Calendar, Briefcase } from 'lucide-react';
import { DashboardLayout } from '@/components/dashboard-layout';
import { useRouter } from "next/navigation"


// Main Component
export default function MemberDetailPage({ params }: { params: { id: string } }) {
    const router = useRouter()
    const [activeTab, setActiveTab] = useState('Tổng quan');
    const tabs = ['Tổng quan', `Nhóm tham gia (${memberGroups.length})`, `Công việc được giao (${memberTasks.length})`];

    return (
        <DashboardLayout>
            <div className="bg-gray-50 min-h-screen">
                <div className="max-w-5xl mx-auto p-8">
                    {/* Header */}
                    <button
                        onClick={() => router.back()}
                        className="flex items-center text-sm text-gray-500 hover:text-gray-700 mb-6"
                    >
                        <ChevronLeft size={16} className="mr-1" />
                        Quay lại
                    </button>
                    <h1 className="text-3xl font-bold text-gray-800 mb-8">Chi tiết thành viên</h1>

                    {/* Profile Header */}
                    <ProfileHeader member={memberDetailData} />

                    {/* Tabs Navigation */}
                    <div className="border-b border-gray-200 mt-8">
                        <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                            {tabs.map((tabName) => (
                                <button
                                    key={tabName}
                                    onClick={() => setActiveTab(tabName.split(' ')[0])}
                                    className={`${activeTab === tabName.split(' ')[0]
                                            ? 'border-green-500 text-green-600'
                                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                        } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                                >
                                    {tabName}
                                </button>
                            ))}
                        </nav>
                    </div>

                    {/* Tab Content */}
                    <div className="mt-8">
                        {activeTab === 'Tổng' && <OverviewTab />}
                        {activeTab === 'Nhóm' && <GroupsTab />}
                        {activeTab === 'Công' && <TasksTab />}
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );

}

// Sub-components for MemberDetailPage

const ProfileHeader = ({ member }: { member: typeof memberDetailData }) => (
    <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
        <div className="flex items-center mb-6">
            <MemberAvatar initial={member.avatarInitial} color={member.avatarColor} size="large" />
            <div className="ml-5">
                <div className="flex items-center gap-3">
                    <h2 className="text-2xl font-bold">{member.name}</h2>
                    <StatusBadge text={member.status} color="green" />
                </div>
                <p className="text-gray-500">{member.position}</p>
            </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-6 pt-6 border-t border-gray-200">
            <InfoItem label="Email" value={member.email} />
            <InfoItem label="Số điện thoại" value={member.phone} />
            <InfoItem label="Phòng ban" value={member.department} />
            <InfoItem label="Quản lý trực tiếp" value={member.manager} />
            <InfoItem label="Địa điểm làm việc" value={member.location} />
            <InfoItem label="Ngày tham gia" value={member.joinDate} />
        </div>
    </div>
);

const InfoItem = ({ label, value }: { label: string; value: string }) => (
    <div>
        <p className="text-sm text-gray-500">{label}</p>
        <p className="font-semibold text-gray-800">{value}</p>
    </div>
);

const OverviewTab = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {overviewStats.map(stat => {
            const colors: Record<string, string> = {
                blue: 'bg-blue-50 border-blue-200',
                green: 'bg-green-50 border-green-200',
                yellow: 'bg-yellow-50 border-yellow-200',
                red: 'bg-red-50 border-red-200',
            }
            const icons: Record<string, React.ReactNode> = {
                blue: <User size={20} className="text-blue-500" />,
                green: <CheckCircle size={20} className="text-green-500" />,
                yellow: <Clock size={20} className="text-yellow-500" />,
                red: <AlertTriangle size={20} className="text-red-500" />
            }
            return (
                <div key={stat.title} className={`p-4 rounded-lg border ${colors[stat.color]}`}>
                    <div className="flex justify-between items-center mb-2">
                        <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                        {icons[stat.color]}
                    </div>
                    <p className="text-3xl font-bold text-gray-800">{stat.value}</p>
                </div>
            )
        })}
    </div>
);

const GroupsTab = () => (
    <div className="space-y-6">
        {memberGroups.map(group => (
            <div key={group.id} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 flex justify-between items-start">
                <div>
                    <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-bold text-lg">{group.name}</h3>
                        <StatusBadge text={group.status} color="green" />
                    </div>
                    <p className="text-gray-500 text-sm mb-4">{group.description}</p>
                    <div className="flex items-center space-x-6 text-sm text-gray-600">
                        <span className="flex items-center"><Users size={16} className="mr-2" />{group.members} thành viên</span>
                        <span className="flex items-center"><Briefcase size={16} className="mr-2" />{group.role}</span>
                    </div>
                </div>
                <button className="text-gray-400 hover:text-green-600">
                    <ExternalLink size={20} />
                </button>
            </div>
        ))}
    </div>
);

const TasksTab = () => (
    <div className="space-y-6">
        {memberTasks.map(task => {
            const priorityColors: Record<string, string> = {
                "Cao": 'red',
                "Trung bình": 'yellow',
                "Thấp": 'blue'
            };
            return (
                <div key={task.id} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    <div className="flex justify-between items-start">
                        <h3 className="font-bold text-lg">{task.title}</h3>
                        <div className="flex items-center gap-2">
                            <StatusBadge text={task.priority} color={priorityColors[task.priority]} />
                            <StatusBadge text={task.status} color="blue" />
                        </div>
                    </div>
                    <p className="text-gray-500 text-sm my-2">{task.description}</p>
                    <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-100">
                        <div className="flex items-center space-x-6 text-sm text-gray-600">
                            <span className="flex items-center"><Briefcase size={16} className="mr-2" />{task.project}</span>
                            <span className="flex items-center"><Calendar size={16} className="mr-2" />Hạn: {task.dueDate}</span>
                        </div>
                        <a href="#" className="text-sm font-medium text-green-600 hover:text-green-700">Xem chi tiết</a>
                    </div>
                </div>
            )
        })}
    </div>
);