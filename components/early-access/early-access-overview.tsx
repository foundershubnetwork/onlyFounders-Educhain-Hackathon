import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ClipboardList, CheckCircle, XCircle } from "lucide-react"

export function EarlyAccessOverview() {
  // This would be fetched from your API in a real implementation
  const stats = {
    totalEntries: 124,
    acceptedEntries: 78,
    rejectedEntries: 15,
  }

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card className="border border-border">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Entries</CardTitle>
          <ClipboardList className="h-4 w-4 text-primary" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.totalEntries}</div>
          <p className="text-xs text-muted-foreground">Early access requests received</p>
        </CardContent>
      </Card>

      <Card className="border border-border">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Accepted Entries</CardTitle>
          <CheckCircle className="h-4 w-4 text-primary" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.acceptedEntries}</div>
          <p className="text-xs text-muted-foreground">Approved early access requests</p>
        </CardContent>
      </Card>

      <Card className="border border-border">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Rejected Entries</CardTitle>
          <XCircle className="h-4 w-4 text-primary" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.rejectedEntries}</div>
          <p className="text-xs text-muted-foreground">Declined early access requests</p>
        </CardContent>
      </Card>
    </div>
  )
}

