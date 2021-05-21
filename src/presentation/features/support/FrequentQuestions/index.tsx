import React from 'react';
import Config from '../../../../common/Config';
import LoadingWebView from '../../../components/LoadingWebView';

export default function FrequentQuestions() {
  return <LoadingWebView uri={Config.webPageUrl.frequentQuestions} />;
}
