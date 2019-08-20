// define paths
const paths = {
  base: {
    src: '**/*',
  },
  assets: {
    src: 'src/assets/**/*',
    dest: 'build/assets/',
  },
  style: {
    src: 'src/style/index.scss',
    watch: 'src/style/**/*',
    dest: 'build/style',
  },
  script: {
    src: 'src/script/index.js',
    watch: 'src/script/**/*',
    dest: 'build/script',
  },
  template: {
    src: 'views/*.pug',
    watch: 'views/**/*',
    dest: 'build/',
  },
};

module.exports = paths;
