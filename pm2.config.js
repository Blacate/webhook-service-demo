module.exports = {
  apps: [
    {
      name: 'webhook-service-demo',
      script: 'src/app.js',
      instances: 'max',
      exec_mode: 'cluster',
      watch: false,
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      instance_var: 'INSTANCE_ID',
      env: {
        NODE_ENV: 'production',
      },
    },
  ],
}
