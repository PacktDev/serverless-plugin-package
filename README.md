# Serverless Plugin Package
Makes `package.json` variables available.in `serverless.yml`.

Exposes version variables in `semver` for use in serverless configuration.

# Usage
## Installing
`serverless plugin install -n serverless-plugin-package`

## Use in `serverless.yml`
```yaml
name: ${package:name}-${package:semver.major}
...
custom:
    description: ${package:description}
```
