/**
 * Vercel Speed Insights Initialization
 * This file initializes and injects the Vercel Speed Insights tracking script
 */

import { injectSpeedInsights } from '@vercel/speed-insights';

// Initialize Speed Insights with default configuration
injectSpeedInsights({
    debug: false, // Set to true for development debugging
});
