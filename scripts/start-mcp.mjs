#!/usr/bin/env node
import { spawnSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(__dirname, '..');
const args = new Set(process.argv.slice(2));
const dryRun = args.has('--dry-run');
const NODE_MAJOR_MIN = 20;
const NODE_RECOMMENDED_MAJOR = 22;

function commandFor(binary) {
    return process.platform === 'win32' ? `${binary}.cmd` : binary;
}

function parseMajor(version) {
    const major = Number(version.split('.')[0]);
    return Number.isFinite(major) ? major : NaN;
}

function log(message) {
    console.error(`[start:mcp] ${message}`);
}

function fail(message) {
    console.error(`[start:mcp] ERROR: ${message}`);
    process.exit(1);
}

function run(cmd, runArgs) {
    const result = spawnSync(cmd, runArgs, {
        cwd: projectRoot,
        stdio: 'inherit',
        env: process.env,
    });
    if (result.status !== 0) {
        process.exit(result.status ?? 1);
    }
}

function validateNodeVersion() {
    const nodeVersion = process.versions.node;
    const nodeMajor = parseMajor(nodeVersion);
    if (!Number.isFinite(nodeMajor) || nodeMajor < NODE_MAJOR_MIN) {
        fail(`Unsupported Node.js version ${nodeVersion}. Use Node.js ${NODE_MAJOR_MIN}+.`);
    }
    if (nodeMajor !== NODE_RECOMMENDED_MAJOR) {
        log(`Node.js ${nodeVersion} detected. Recommended major version is ${NODE_RECOMMENDED_MAJOR}.x for team consistency.`);
    }
}

function needsSetup() {
    const envExists = existsSync(resolve(projectRoot, '.env'));
    const distExists = existsSync(resolve(projectRoot, 'dist/index.js'));
    const dependenciesInstalled = existsSync(resolve(projectRoot, 'node_modules/typescript/bin/tsc'));
    return !envExists || !distExists || !dependenciesInstalled;
}

function main() {
    validateNodeVersion();

    if (needsSetup()) {
        log('Missing prerequisites detected, running npm run setup...');
        run(commandFor('npm'), ['run', 'setup']);
    }

    if (dryRun) {
        log('Dry run completed.');
        return;
    }

    run(process.execPath, [resolve(projectRoot, 'dist/index.js')]);
}

main();
