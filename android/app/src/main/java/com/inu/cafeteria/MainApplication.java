package com.inu.cafeteria;

import android.app.Application;
import android.content.Context;

import com.facebook.react.PackageList;
import com.facebook.react.ReactApplication;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.soloader.SoLoader;

import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.List;

// 코드푸시
import com.microsoft.codepush.react.CodePush;

public class MainApplication extends Application implements ReactApplication {

    private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
        @Override
        public boolean getUseDeveloperSupport() {
            return BuildConfig.DEBUG;
        }

        @Override
        protected List<ReactPackage> getPackages() {
            return new PackageList(this).getPackages();
        }

        @Override
        protected String getJSMainModuleName() {
            return "index";
        }

        @Override
        protected String getJSBundleFile() {
            return CodePush.getJSBundleFile(); // 코드푸시
        }
    };

    @Override
    public ReactNativeHost getReactNativeHost() {
        return mReactNativeHost;
    }

    @Override
    public void onCreate() {
        super.onCreate();

        SoLoader.init(this, false);
        initializeFlipper(this, getReactNativeHost().getReactInstanceManager());
    }

    private static void initializeFlipper(Context context, ReactInstanceManager reactInstanceManager) {
        if (!BuildConfig.DEBUG) {
            // We do it only for debug build.
            return;
        }

        try {
            Class<?> flipperClass = Class.forName("com.inu.cafeteria.ReactNativeFlipper");
            Method initializeMethod = flipperClass.getMethod(
                "initializeFlipper",
                Context.class,
                ReactInstanceManager.class
            );

            initializeMethod.invoke(null, context, reactInstanceManager);
        } catch (ClassNotFoundException | IllegalAccessException | NoSuchMethodException | InvocationTargetException e) {
            e.printStackTrace();
        }
    }
}
