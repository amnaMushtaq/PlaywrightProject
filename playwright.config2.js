// @ts-check
import { defineConfig, devices } from '@playwright/test';
import { time, trace } from 'console';
import { permission } from 'process';

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
  timeout:100000,
   
  expect:{
    timeout: 60_000

  },

  reporter:'html',
  projects:[
    {
      name:'chrome',
      use: {
        browserName: 'chromium',
        headless: false,
        screenshot:'only-on-failure',
        ignoreHttpsError:true,
        permission:['geolocation'],
        // trace:'retain-on-failure'
         trace:'on',
         video:'retain-on-failure',
        // video: 'on-first-retry',
         //viewport:{width:720,height:720}
         ...devices['iPhone 11'],
        
      }
      },
      {
        name:'Safari',
        use: {
          browserName: 'webkit',
          headless: false,
          // screenshot:'on',
          // trace:'retain-on-failure'
           trace:'on',
           ... devices['iPhone 11']
          
        },        
    },
  ],
      
});
module.exports=config

