import initAggregateScheduler from "./AggregateScheduler/aggregateScheduler";

/**
 * Initializes all cron jobs
 */
export function initJobs() {

  // Removes and aggregates bluetooth data daily at midnight
  initAggregateScheduler();
}