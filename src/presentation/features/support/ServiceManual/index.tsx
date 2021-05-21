import React from 'react';
import Config from '../../../../common/Config';
import LoadingWebView from '../../../components/LoadingWebView';

export default function ServiceManual() {
  return <LoadingWebView uri={Config.webPageUrl.serviceManual} />;
}
