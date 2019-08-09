# Serverless Plugin Package

![Packt](https://img.shields.io/badge/Packt--%23555?logo=data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAVlpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IlhNUCBDb3JlIDUuNC4wIj4KICAgPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICAgICAgPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIKICAgICAgICAgICAgeG1sbnM6dGlmZj0iaHR0cDovL25zLmFkb2JlLmNvbS90aWZmLzEuMC8iPgogICAgICAgICA8dGlmZjpPcmllbnRhdGlvbj4xPC90aWZmOk9yaWVudGF0aW9uPgogICAgICA8L3JkZjpEZXNjcmlwdGlvbj4KICAgPC9yZGY6UkRGPgo8L3g6eG1wbWV0YT4KTMInWQAAAYVJREFUOBG1Uj1Lw1AUvTepIJq21E10KLZ+gJsOooODk+DmrOCgIAg2xUHxBygutXEQVBBUxElxFKTOLv0HTdsfIJam1io27/pefQkhbXTyQXjnnnvOeXk3QfAtazMxgwrccLqHAOoKsTXNKD36ZG6JLvKANz25TECXkqoyBeejmcKzR+JCxUUeoGULV0CwLqmowujO2oqPeSQu7BggumHDPCGiHansR1u9f0+PDLhOCQIDRD9iFA8QaF9qRxk1b6vpwT5Zt7ZfA4RCyxZ3AfBaYAKcUqH7QmBn/RlQ0eNx7px0DEAs52IOOn4FR/C6PRTt+sQnXk+0OKLjsFHccPpiD3wD/g8gN59zzY8ZIac1YrrX/GtAPZXc44JFaTAxZC/haf7LH9DxCpaeXOXTP5NiS2Ew13tk5v1mUYf8ZC01PAvAMpxv8qdBCCtBZuFtC1BVVrIJp0lp2rYNH7HDclkI/221zaCmJx74aZGgE4mgEjHMBaffdgXeGOcDjDkC/06IL17uG4mlcYBwFN/dAAAAAElFTkSuQmCC)
[![serverless](http://public.serverless.com/badges/v3.svg)](http://www.serverless.com)
![npm](https://img.shields.io/npm/v/@packt/serverless-plugin-package?color=%23ec6611)
![CircleCI](https://img.shields.io/circleci/build/gh/PacktDev/serverless-plugin-package?token=4aaf88650817da45b98c8f6d3e306d5dd9f1579f&logo=circleci)
![Codecov](https://img.shields.io/codecov/c/gh/PacktDev/serverless-plugin-package?logo=codecov)

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

