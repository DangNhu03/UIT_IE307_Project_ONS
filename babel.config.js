module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module-resolver",
        {
          root: ["./frontend"],
          alias: {
            "@components": "./frontend/src/components",
            "@screens": "./frontend/src/screens",
            "@hooks": "./frontend/src/hooks",
            "@assets": "./frontend/src/assest",
            "@contexts": "./frontend/src/contexts",
            "@navigation": "./frontend/src/navigation",
          },
        },
      ],
      [
        "module:react-native-dotenv",
        {
          moduleName: "@env",
          path: ".env",
          allowUndefined: true,
        },
      ],
    ],
  };
};
