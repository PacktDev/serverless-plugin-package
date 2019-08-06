import Serverless from 'serverless';
import semver from 'semver';

const variablePrefix = 'package';
const packageFile = '/package.json';

export default class Plugin {
  private readonly serverless;
  public readonly packageJson;

  public constructor(serverless: Serverless) {
    this.serverless = serverless;
    this.packageJson = require(`${process.cwd()}/${packageFile}`);

    this.bindVariableResolution();
  }

  private bindVariableResolution(): void {
    const delegate = this.serverless.variables.getValueFromSource.bind(this.serverless.variables);

    this.serverless.variables.getValueFromSource = (variable): string => {
      if (variable.startsWith(`${variablePrefix}:`)) {
        return this.resolveVariable(variable);
      }

      return delegate(variable);
    };
  }

  private resolveVariable(variable: string): string {
    const key = variable.split(`${variablePrefix}:`)[1];
    this.serverless.cli.log(`Resolving ${key} from package.json`);

    if (key.startsWith('semver.')) return this.resolveSemverSection(key);

    return this.packageJson[key] || '';
  }

  private resolveSemverSection(key: string): string {
    const { version } = this.packageJson;
    const semverSection = key.split('semver.')[1];

    if (!version) {
      this.serverless.cli.log(
        `Could not get ${key} from package.json, package.json is missing key 'version'`,
      );
      return '';
    }

    this.serverless.cli.log(`Resolving semver ${semverSection} from: ${version}`);
    if (typeof semver[semverSection] === 'function') {
      return semver[semverSection](version);
    }

    this.serverless.cli.log(`Could not get ${key}, ${semverSection} is not a function.`);
    return '';
  }
}

module.exports = Plugin;
