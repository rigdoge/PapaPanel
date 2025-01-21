export default ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1338),
  app: {
    keys: env.array('APP_KEYS', ['PapaPanel1', 'PapaPanel2', 'PapaPanel3', 'PapaPanel4'])
  },
  webhooks: {
    populateRelations: env.bool('WEBHOOKS_POPULATE_RELATIONS', false),
  },
});
