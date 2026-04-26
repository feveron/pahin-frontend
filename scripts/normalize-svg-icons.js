import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const ICONS_DIR = path.join(__dirname, "../src/assets/icons")

function normalizeSvg(filePath) {
    let svg = fs.readFileSync(filePath, "utf8")

    svg = svg
        .replace(/fill="(?!none)[^"]*"/g, 'fill="currentColor"')
        .replace(/stroke="(?!none)[^"]*"/g, 'stroke="currentColor"')
        .replace(/\swidth="[^"]*"/g, "")
        .replace(/\sheight="[^"]*"/g, "")

    fs.writeFileSync(filePath, svg, "utf8")
    console.log(`Updated: ${filePath}`)
}

function walkDir(dir) {
    const files = fs.readdirSync(dir)

    files.forEach((file) => {
        const filePath = path.join(dir, file)
        const stat = fs.statSync(filePath)

        if (stat.isDirectory()) {
            walkDir(filePath)
            return
        }

        if (file.endsWith(".svg")) {
            normalizeSvg(filePath)
        }
    })
}

walkDir(ICONS_DIR)