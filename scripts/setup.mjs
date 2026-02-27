#!/usr/bin/env node
import { spawnSync } from 'node:child_process';
import { copyFileSync, existsSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(__dirname, '..');
const args = new Set(process.argv.slice(2));
const checkOnly = args.has('--check-only');

const NODE_MAJOR_MIN = 20;
const NODE_RECOMMENDED_MAJOR = 22;
const NPM_MAJOR_MIN = 10;

function commandFor(binary) {
    return process.platform === 'win32' ? `${binary}.cmd` : binary;
}

function parseMajor(version) {
    const major = Number(version.split('.')[0]);
    return Number.isFinite(major) ? major : NaN;
}

function log(message) {
    console.error(`[setup] ${message}`);
}

function fail(message) {
    console.error(`[setup] ERROR: ${message}`);
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
    } else {
        log(`Node.js version OK (${nodeVersion})`);
    }
}

function validateNpmVersion() {
    const npmResult = spawnSync(commandFor('npm'), ['--version'], {
        cwd: projectRoot,
        env: process.env,
        encoding: 'utf-8',
    });
    if (npmResult.status !== 0) {
        fail('Unable to read npm version.');
    }
    const npmVersion = (npmResult.stdout || '').trim();
    const npmMajor = parseMajor(npmVersion);
    if (!Number.isFinite(npmMajor) || npmMajor < NPM_MAJOR_MIN) {
        fail(`Unsupported npm version ${npmVersion}. Use npm ${NPM_MAJOR_MIN}+.`);
    }
    log(`npm version OK (${npmVersion})`);
}

function ensureEnvFile() {
    const envFilePath = resolve(projectRoot, '.env');
    const envExamplePath = resolve(projectRoot, '.env.example');

    if (existsSync(envFilePath)) {
        log('.env already exists.');
        return;
    }

    if (!existsSync(envExamplePath)) {
        fail('Missing .env.example, cannot create .env.');
    }

    copyFileSync(envExamplePath, envFilePath);
    log('Created .env from .env.example.');
}

function main() {
    validateNodeVersion();
    validateNpmVersion();
    ensureEnvFile();

    if (checkOnly) {
        log('Check only completed.');
        return;
    }

    log('Installing dependencies with npm ci...');
    run(commandFor('npm'), ['ci']);

    log('Building project...');
    run(commandFor('npm'), ['run', 'build']);

    log('Setup completed.');
}

main();
