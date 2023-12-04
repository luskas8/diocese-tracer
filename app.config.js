export default {
  expo: {
    name: 'DioceseMap',
    slug: 'DioceseMap',
    version: '1.0.0',
    orientation: 'portrait',
    icon: './assets/icon.png',
    userInterfaceStyle: 'light',
    splash: {
      image: './assets/splash.png',
      resizeMode: 'contain',
      backgroundColor: '#ffffff'
    },
    assetBundlePatterns: [
      '**/*'
    ],
    ios: {
      supportsTablet: true,
      bundleIdentifier: 'com.cupuladaquermesse.diocesemap'
    },
    android: {
      config: {
        googleMaps: {
          apiKey: process.env.API_KEY
        }
      },
      adaptiveIcon: {
        foregroundImage: './assets/adaptive-icon.png',
        backgroundColor: '#ffffff'
      },
      permissions: [
        'android.permission.ACCESS_COARSE_LOCATION',
        'android.permission.ACCESS_FINE_LOCATION',
        'android.permission.FOREGROUND_SERVICE'
      ],
      package: 'com.cupuladaquermesse.diocesemap'
    },
    web: {
      favicon: './assets/favicon.png'
    },
    plugins: [
      [
        'expo-location',
        {
          locationAlwaysAndWhenInUsePermission: 'Allow $(PRODUCT_NAME) to use your location.'
        }
      ]
    ],
    extra: {
      eas: {
        projectId: '6f2118a2-81ac-49f1-83ce-369858b4168d'
      }
    }
  }
}
