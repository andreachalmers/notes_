# React PWA
## 1. Register a service worker

 open  `index.js`and change the unregister() call to register().
 
##  2. Configure the Web Application Manifest
In `public/manifest.json` alter the metadata that is responsible for the appearance of your application.

```
{
 "short_name": "cra-pwa",
 "name": "cra-pwa",
 "icons": [
   {
       "src": "/android-chrome-192x192.png",
       "sizes": "192x192",
       "type": "image/png"
   },
   {
       "src": "/android-chrome-512x512.png",
       "sizes": "512x512",
       "type": "image/png"
   }
 ],
 "start_url": "/",
 "theme_color": "#F4BD42",
 "background_color": "#2B2929",
 "display": "standalone",
 "scope": "/"
}
```

- `short_name`: The name of your application, used within the icon, like on the users’ home screens or launchers.
- `name: The name of your app shown in the app stores or browsers on startup screens and prompts. If name property is not defined, short_name will be displayed.
- icons: The set of icons (or just one), used on the users’ home screens, launchers, task switchers, splash screens, etc.
- start_url: The URL of the page of your app that your users see on the startup.
- display: This property is responsible for the browser view. The app can hide the address bar, run in the new window, go fullscreen, etc. See the attributes you can use for it:
- fullscreen: This option is for opening the app without any browser UI, occupying the entirety of the users’ display.
- standalone: This option allows for running the app in the new window, like a native app. It will also hide the browser UI elements like an address bar.
- minimal-ui: This option is quite similar to the previous one, but it comes with the minimal set of browser UI, like back and reload buttons.
browser: This option enables the usual browser experience.
- theme_color: The color of the toolbar in your app.
- background_color: The color of the splash screen that appears when users click on the app icon in their home screens.​
A splash screen is a graphical element that appears when your app is launched. It is a window that contains your application’s name and logo, and it uses the background color defined by you. Chrome browser generates the splash screen based on the following properties in your web manifest:

- name;
- background_color;
- icons.

And finally, to make your web manifest file work, you need to add it to the pages of your web app, like in the example:

```
<link rel="manifest" href="/manifest.json">
```

```
npm run build
npx server build
```

