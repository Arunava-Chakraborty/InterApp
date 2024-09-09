/** @type { import("drizzle-kit").Config } */
export default {
  schema: "./utils/schema.js",
  dialect: 'postgresql',
  dbCredentials: {
    url: 'postgresql://InterApp_owner:DKQjLa9iqSg4@ep-shiny-band-a5qhibi3.us-east-2.aws.neon.tech/InterApp?sslmode=require',
  }
};