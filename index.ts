import sls from 'serverless';
import Plugin from 'serverless/classes/Plugin';

export default class ServerlessPackagePlugin extends Plugin {
  private readonly serverless;
  private readonly options;

  public constructor(serverless: sls, options: sls.Options) {
    super(serverless, options);

    this.serverless = serverless;
    this.options = options;

    this.hooks = {
      'before:welcome:hello': this.beforeWelcome(),
    };
  }

  private async beforeWelcome(): Promise<void> {
    this.serverless.cli.log('Testing');
    this.serverless.cli.log(`options: ${this.options}`);
  }
}
