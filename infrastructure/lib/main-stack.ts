import { Construct } from 'constructs';
import { MStack, MStackProps } from './patterns';
import { CloudfrontStack } from './cloudfront-stack';

export class ChatStack extends MStack {
  constructor(scope: Construct, id: string, props?: MStackProps) {
    super(scope, id, props);

    new CloudfrontStack(this, this.getName('cloudfront-stack'), {
      mEnvironment: {
        ...this.mEnvironment,
      },
    });
  }
}
