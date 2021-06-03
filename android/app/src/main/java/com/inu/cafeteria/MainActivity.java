package com.inu.cafeteria;

import android.os.Bundle;
import com.facebook.react.ReactActivity;

// 스플래시
import com.zoontek.rnbootsplash.RNBootSplash;

public class MainActivity extends ReactActivity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(null/*react-native-screen을 제대로 쓰려면 이렇게!*/);

        // 스플래시 띄웁니다.
        RNBootSplash.init(R.drawable.splash_background, MainActivity.this);
    }

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "cafeteria";
    }
}
