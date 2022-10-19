module.exports = {
  presets: [
    '@babel/preset-env',
    ['@babel/preset-react', { runtime: 'automatic' }]
  ],
  plugins: [
    '@emotion',
    [
      'babel-plugin-import',
        {
          libraryName: '@mui/material',
          libraryDirectory: '',
          camel2DashComponentName: false
        },
        'core'
      ],
    // [
    //   'babel-plugin-import',
    //   {
    //     libraryName: '@mui/icons-material',
    //     libraryDirectory: '',
    //     camel2DashComponentName: false,
    //   },
    //   'icons',
    // ],
    [
      'babel-plugin-direct-import',
      // { modules: ['@mui/material', '@mui/icons-material'] },
      { modules: ['@mui/material'] },
    ],
  ]
}
