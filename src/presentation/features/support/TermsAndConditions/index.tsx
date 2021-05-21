import React from 'react';
import Config from '../../../../common/Config';
import LoadingWebView from '../../../components/LoadingWebView';

export default function TermsAndConditions() {
  return <LoadingWebView uri={Config.webPageUrl.termsAndConditions} />;
}
