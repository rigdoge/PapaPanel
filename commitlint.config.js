module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'build',    // 构建相关
        'chore',    // 其他修改
        'ci',       // CI/CD相关
        'docs',     // 文档更新
        'feat',     // 新功能
        'fix',      // Bug修复
        'perf',     // 性能优化
        'refactor', // 代码重构
        'revert',   // 回滚
        'style',    // 代码格式
        'test',     // 测试相关
      ],
    ],
    'type-case': [2, 'always', 'lower-case'],
    'type-empty': [2, 'never'],
    'scope-case': [2, 'always', 'lower-case'],
    'subject-case': [2, 'never', ['sentence-case', 'start-case', 'pascal-case', 'upper-case']],
    'subject-empty': [2, 'never'],
    'subject-full-stop': [2, 'never', '.'],
    'header-max-length': [2, 'always', 72],
  },
};