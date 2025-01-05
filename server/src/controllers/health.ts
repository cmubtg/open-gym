import mongoose from "mongoose";

interface HealthCheck {
  status: string;
  timestamp: string;
  service: string;
  uptime: number;
  checks: {
    database: {
      status: string;
      latency: number;
    };
    memory: {
      status: string;
      usage: string;
    };
  };
}

const measureDBLatency = async (): Promise<number> => {
    const start = Date.now();
    try {
      const db = mongoose.connection.db;
      if (!db) {
        throw new Error('Database connection not established');
      }
      await db.admin().ping();
      return Date.now() - start;
    } catch (error) {
      return -1;
    }
  };

export const getHealthStatus = async (): Promise<[HealthCheck, number]> => {
  try {
    const dbState = mongoose.connection.readyState === 1;
    
    const healthCheck: HealthCheck = {
      status: 'ok',
      timestamp: new Date().toISOString(),
      service: 'CMU OpenGym API',
      uptime: Math.floor(process.uptime()),
      checks: {
        database: {
          status: dbState ? 'ok' : 'error',
          latency: await measureDBLatency()
        },
        memory: {
          status: 'ok',
          usage: Math.round((process.memoryUsage().heapUsed / 1024 / 1024) * 100) / 100 + 'MB'
        }
      }
    };

    const statusCode = healthCheck.checks.database.status === 'ok' ? 200 : 503;
    return [healthCheck, statusCode];
  } catch (error) {
    return [{
      status: 'error',
      timestamp: new Date().toISOString(),
      service: 'CMU OpenGym API',
      uptime: Math.floor(process.uptime()),
      checks: {
        database: {
          status: 'error',
          latency: -1
        },
        memory: {
          status: 'error',
          usage: 'unknown'
        }
      }
    }, 503];
  }
};