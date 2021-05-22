import UseCase from './UseCase';
import DeviceInfo from 'react-native-device-info';
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
    const version = '0.1.0'; // TODO 버저닝 어케하지..

    await this.directInquiryRepository.ask(deviceInfo, version, params.content);
  }
}

export default new MakeInquiry(DirectInquiryRepository.instance);
