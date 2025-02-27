// @ts-check
import { defineConfig, devices } from '@playwright/test';
import { time, trace } from 'console';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * @see https://playwright.dev/docs/test-configuration
 */
const config=({
  testDir: './tests',
  timeout:50000,
   
  expect:{
    timeout: 60_000

  },
  reporter:'html',
  
  use: {
    browserName: 'chromium',
    headless: true,
    // screenshot:'on',
    // trace:'retain-on-failure'
  },
    
});
module.exports=config

