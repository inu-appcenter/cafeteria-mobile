import React from 'react';
import Config from '../../../../common/Config';
import LoadingWebView from '../../../components/LoadingWebView';

export default function OpenSourceLicenses() {
  return <LoadingWebView uri={Config.webPageUrl.ossNotices} />;
}
