function camelCaseToPhrase(attribute) {
  return attribute
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/[-_]/g, ' ');
}

export function parseTestTreeHierarchy(fileName, logger) {
  const testFolder = 'tests/';
  const normalizedPath = fileName.replace(/\\/g, '/');

  const attributesCamelCase = normalizedPath
    .substring(normalizedPath.indexOf(testFolder) + testFolder.length)
    .split('/');

  let attributes = attributesCamelCase.map(attribute =>
    camelCaseToPhrase(attribute).replace(/^./, character =>
      character.toUpperCase(),
    ),
  );

  if (attributes[2].includes('.spec.js')) {
    attributes = attributes.slice(0, 2);
  }

  logger.debug(`Parsed test hierarchy: ${JSON.stringify(attributes)}`);

  return attributes;
}
