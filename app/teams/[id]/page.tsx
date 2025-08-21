import { DashboardLayout } from "@/components/dashboard-layout"
import { TeamDetailPage } from "@/components/teams/team-detail-page"

interface TeamDetailProps {
  params: {
    id: string
  }
}

export default function TeamDetail({ params }: TeamDetailProps) {
  return (
    <DashboardLayout>
      <TeamDetailPage teamId={params.id} />
    </DashboardLayout>
  )
}
