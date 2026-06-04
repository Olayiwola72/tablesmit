const fs = require('fs')
const path = require('path')

const ROOT = path.resolve(__dirname, '..')

const pkg = JSON.parse(fs.readFileSync(path.join(ROOT, 'package.json'), 'utf-8'))
const newVersion = pkg.version

if (!newVersion) {
  console.error('version-bump: could not read version from package.json')
  process.exit(1)
}

const verTag = `v${newVersion}`
let changed = 0

// --- AGENTS.md ---
const agentsPath = path.join(ROOT, 'AGENTS.md')
let agents = fs.readFileSync(agentsPath, 'utf-8')
const agentsRegex = /(> Current Release: )v\d+\.\d+\.\d+/
if (!agentsRegex.test(agents)) {
  console.error('version-bump: could not find "Current Release: vX.Y.Z" in AGENTS.md')
  process.exit(1)
}
const updatedAgents = agents.replace(agentsRegex, `$1${verTag}`)
if (updatedAgents !== agents) {
  fs.writeFileSync(agentsPath, updatedAgents)
  changed++
  console.log(`  AGENTS.md  → ${verTag}`)
} else {
  console.log(`  AGENTS.md  → already ${verTag}`)
}

// --- changelog.ts ---
const changelogPath = path.join(ROOT, 'src/config/changelog/changelog.ts')
let changelog = fs.readFileSync(changelogPath, 'utf-8')
const changelogRegex = /(version:\s*')\d+\.\d+\.\d+(')/
const firstMatch = changelog.match(changelogRegex)
if (firstMatch) {
  const current = firstMatch[0]
  const updated = changelog.replace(changelogRegex, `$1${newVersion}$2`)
  if (updated !== changelog) {
    changelog = updated
    fs.writeFileSync(changelogPath, changelog)
    changed++
    console.log(`  changelog.ts  → ${newVersion} (was ${current})`)
  } else {
    console.log(`  changelog.ts  → already ${newVersion}`)
  }
} else {
  console.error('version-bump: could not find "version: \'X.Y.Z\'" in changelog.ts')
  process.exit(1)
}

if (changed > 0) {
  console.log(`\nUpdated ${changed} file(s).`)
}
