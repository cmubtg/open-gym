import initAggregateScheduler from "./AggregateScheduler/aggregateScheduler";
import initLogScanScheduler from "./log-scan";

/**
 * Initializes all cron jobs
 */
export const initJobs = () => {

  // Removes and aggregates bluetooth data daily at midnight
  initAggregateScheduler();
  initLogScanScheduler();
};