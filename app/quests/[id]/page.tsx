import DetailedQuestPage from "../detailed-quest-page"

export default function QuestDetailPage({ params }) {
  return <DetailedQuestPage questId={params.id} />
}

