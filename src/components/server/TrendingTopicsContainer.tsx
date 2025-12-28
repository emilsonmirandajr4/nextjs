import { fetchBrazilTrendsServer } from "@/server/twitter";
import TrendingTopics from "../TrendingTopics";

export default async function TrendingTopicsContainer() {
    // Now runs in its own suspense boundary, not blocking the page
    const trends = await fetchBrazilTrendsServer();

    return <TrendingTopics initialTrends={trends} />;
}
