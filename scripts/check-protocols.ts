// scripts/check-protocols.ts
// Protocol validation runner for CI/CD and local development

import { validateProtocols, ProtocolIssue } from '../services/validateProtocols';
import { PROTOCOLS } from '../src/audio/constants';

function formatIssue(issue: ProtocolIssue): string {
  const scope = issue.phaseId
    ? `${issue.protocolId}/${issue.phaseId}`
    : issue.protocolId;
  return `[${issue.level.toUpperCase()}] ${scope}: ${issue.message}`;
}

function main(): void {
  console.log('Validating SynSync protocols...\n');
  
  const issues = validateProtocols(PROTOCOLS);

  if (issues.length === 0) {
    console.log('✅ All protocols validated with no issues.');
    process.exit(0);
  }

  // Separate errors and warnings
  const errors = issues.filter(i => i.level === 'error');
  const warnings = issues.filter(i => i.level === 'warning');

  // Print errors first
  if (errors.length > 0) {
    console.log(`❌ Found ${errors.length} error(s):\n`);
    errors.forEach(issue => console.log(formatIssue(issue)));
    console.log('');
  }

  // Print warnings
  if (warnings.length > 0) {
    console.log(`⚠️  Found ${warnings.length} warning(s):\n`);
    warnings.forEach(issue => console.log(formatIssue(issue)));
    console.log('');
  }

  // Summary
  console.log(`\n📊 Validation Summary:`);
  console.log(`   Total protocols checked: ${Object.keys(PROTOCOLS).length}`);
  console.log(`   Errors: ${errors.length}`);
  console.log(`   Warnings: ${warnings.length}`);

  // Exit with error code if any errors found
  const hasErrors = errors.length > 0;
  process.exit(hasErrors ? 1 : 0);
}

// Run validation
main();
