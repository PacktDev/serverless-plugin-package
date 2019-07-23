# Serverless Plugin Package

[![serverless](http://public.serverless.com/badges/v3.svg)](http://www.serverless.com)

Makes `package.json` variables available.in `serverless.yml`, and exposes the `package.json` version as its `semver` components.

## Installing
Install the plugin using the serverless cli  
`serverless plugin install -n @packt/serverless-plugin-package`

## Manual Installation
Install the package in your service:
`npm install --save-dev @packt/serverless-plugin-package`

Then register it in your plugins array in `serverless.yml`:
```yaml
plugins:
  - "@packt/serverless-plugin-package"
```

__Note:__ Don't forget to quoe the plugin name in `serverless.yml`, `@` has a meaning in yml.

## Usage
To reference variables from your project's `package.json`.
```yaml
# Becomes name: my-awesome-service-1
name: ${package:name}-${package:semver.major}
...
custom:
  # Uses your description from package.json 
  description: ${package:description}
```

To reference `semver` parts of your project's `version`:
```yaml
custom:
    patchVersion: ${package:semver.patch}
    minorVersion: ${package:semver.minor}
    majorVersion: ${package:semver.major}
```

