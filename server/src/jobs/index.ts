// import StartAggregateScheduler from "./aggregate-occupancy";
import StartLogScanScheduler from "./log-scan";

/**
 * Initializes all cron jobs
 */
export default function StartCronJobs() {
  // Removes and aggregates bluetooth data daily at midnight
  // StartAggregateScheduler();
  StartLogScanScheduler();
};