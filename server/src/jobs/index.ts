import initAggregateScheduler from "./AggregateScheduler/aggregateScheduler";

/**
 * Initializes all cron jobs
 */
export const initJobs = () => {

  // Removes and aggregates bluetooth data daily at midnight
  initAggregateScheduler();
};