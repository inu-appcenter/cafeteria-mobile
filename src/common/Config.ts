import {Platform} from 'react-native';

/**
 * This file is part of INU Cafeteria.
 *
 * Copyright (C) 2021 INU Global App Center <potados99@gmail.com>
 *
 * INU Cafeteria is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * INU Cafeteria is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

export default {
  baseUrl: 'https://api.inu-cafeteria.app',

  contacts: {
    uicoopPhoneNumber: '0328359795',
    serviceAdminPhoneNumber: '01029222661',
    inuAppcenterKakaoTalkUrl: 'https://pf.kakao.com/_xgxaSLd/chat',
  },

  webPageUrl: {
    frequentQuestions: 'https://web.inu-cafeteria.app/faq',
    serviceManual: 'https://web.inu-cafeteria.app/manual',
    termsAndConditions:
      'https://raw.githubusercontent.com/inu-appcenter/terms-and-conditions/master/카페테리아-개인정보처리방침.txt',
    ossNotices: 'https://web.inu-cafeteria.app/oss-notices/index.txt',
  },

  version: {
    minimumSupported: Platform.OS === 'ios' ? 'iOS 12.0' : 'Android 8.0',
  },
};
