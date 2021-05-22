import UseCase from './UseCase';
import DeviceInfo from 'react-native-device-info';
import PackageInfo from '../../common/PackageInfo';
import DirectInquiryRepository from '../../data/repositories/DirectInquiryRepository';

type Params = {
  content: string;
};

class MakeInquiry extends UseCase<Params, void> {
  constructor(
    private readonly directInquiryRepository: DirectInquiryRepository,
  ) {
    super();
  }

  async onExecute(params: Params): Promise<void> {
    const deviceInfo = `${DeviceInfo.getBrand()} ${DeviceInfo.getDeviceId()}; ${DeviceInfo.getSystemName()} ${DeviceInfo.getSystemVersion()}`;
    const version = PackageInfo.version;

    await this.directInquiryRepository.ask(deviceInfo, version, params.content);
  }
}

export default new MakeInquiry(DirectInquiryRepository.instance);
