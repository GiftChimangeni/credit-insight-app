import { useQuery } from "@tanstack/react-query"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { DollarSign, Users, Activity, AlertTriangle, TrendingUp, TrendingDown, AlertCircle } from "lucide-react"
import Layout from "@/components/layout/Layout"

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar
} from "recharts"

const stagingData = [
  { name: "Stage 1", value: 65, amount: 6500000 },
  { name: "Stage 2", value: 22, amount: 2200000 },
  { name: "Stage 3", value: 8, amount: 800000 },
]

const trendData = [
  { month: "Jan", ecl: 120, pd: 1.2 },
  { month: "Feb", ecl: 135, pd: 1.4 },
  { month: "Mar", ecl: 140, pd: 1.5 },
  { month: "Apr", ecl: 155, pd: 1.8 },
  { month: "May", ecl: 170, pd: 2.0 },
  { month: "Jun", ecl: 185, pd: 2.2 },
]

const COLORS = ["#3b82f6", "#eab308", "#ef4444"]

export default function Dashboard() {
  const { data: metrics = {} } = useQuery(["metrics"], async () => {
    const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/portfolio/metrics`)
    return res.json()
  }, { initialData: { total_portfolio: 9500000, ecl: 185000, npl_ratio: 8.4, borrowers: 1248 } })

  const kpis = [
    { title: "Total Portfolio", value: `$${(metrics.total_portfolio / 1000000).toFixed(1)}M`, icon: DollarSign, change: "+5.2%", up: true },
    { title: "Expected Credit Loss", value: `$${metrics.ecl.toLocaleString()}`, icon: Activity, change: "+8.1%", up: true },
    { title: "NPL Ratio", value: `${metrics.npl_ratio}%`, icon: AlertTriangle, change: "+2.1%", up: true },
    { title: "Active Borrowers", value: metrics.borrowers.toLocaleString(), icon: Users, change: "-1.2%", up: false },
  ]

  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold">Dashboard Overview</h1>
          <p className="text-muted-foreground">Real-time credit risk analytics and portfolio insights</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {kpis.map((kpi) => (
            <Card key={kpi.title}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">{kpi.title}</CardTitle>
                <kpi.icon className="h-5 w-5 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{kpi.value}</div>
                <div className="flex items-center text-xs text-muted-foreground mt-1">
                  {kpi.up ? <TrendingUp className="mr-1 h-4 w-4 text-green-500" /> : <TrendingDown className="mr-1 h-4 w-4 text-red-500" />}
                  {kpi.change} from last month
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Early Warning Alerts</CardTitle>
              <CardDescription>Potential risk indicators</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Stage Migration</AlertTitle>
                <AlertDescription>12 loans moved to Stage 2</AlertDescription>
              </Alert>
              <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Past Due</AlertTitle>
                <AlertDescription>3 loans >90 days overdue</AlertDescription>
              </Alert>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Portfolio by Stage</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={stagingData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    label={({ name, amount }) => `${name}: $${(amount/1000000).toFixed(1)}M`}
                  >
                    {stagingData.map((entry, index) => (
                      <Cell key={index} fill={COLORS[index]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>ECL and PD Trends</CardTitle>
            <CardDescription>Last 6 months</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis yAxisId="ecl" />
                <YAxis yAxisId="pd" orientation="right" />
                <Tooltip />
                <Legend />
                <Line yAxisId="ecl" type="monotone" dataKey="ecl" stroke="#3b82f6" name="ECL ($K)" strokeWidth={2} />
                <Line yAxisId="pd" type="monotone" dataKey="pd" stroke="#ef4444" name="PD (%)" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </Layout>
  )
}
