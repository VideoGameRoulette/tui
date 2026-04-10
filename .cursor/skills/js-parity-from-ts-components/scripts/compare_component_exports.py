#!/usr/bin/env python3
import argparse
import re
from pathlib import Path


DECL_EXPORT_RE = re.compile(
    r"^\s*export\s+(?:default\s+)?(?:function|const|class)\s+([A-Za-z0-9_]+)?",
    re.MULTILINE,
)
LIST_EXPORT_RE = re.compile(r"^\s*export\s*\{([^}]+)\}", re.MULTILINE)


def collect_exports(path: Path) -> set[str]:
    text = path.read_text(encoding="utf-8")
    names: set[str] = set()
    for match in DECL_EXPORT_RE.finditer(text):
        name = match.group(1)
        if name:
            names.add(name)
        elif "export default" in match.group(0):
            names.add("default")
    for match in LIST_EXPORT_RE.finditer(text):
        for part in match.group(1).split(","):
            symbol = part.strip().split(" as ")[0].strip()
            if symbol:
                names.add(symbol)
    return names


def main() -> None:
    parser = argparse.ArgumentParser(description="Compare exported symbols between TS and JS component files.")
    parser.add_argument("--ts", required=True, help="Path to TS/TSX source component")
    parser.add_argument("--js", required=True, help="Path to JS/JSX parity component")
    args = parser.parse_args()

    ts_file = Path(args.ts)
    js_file = Path(args.js)

    ts_exports = collect_exports(ts_file)
    js_exports = collect_exports(js_file)

    missing_in_js = sorted(ts_exports - js_exports)
    extra_in_js = sorted(js_exports - ts_exports)

    print(f"TS exports: {sorted(ts_exports)}")
    print(f"JS exports: {sorted(js_exports)}")

    if not missing_in_js and not extra_in_js:
        print("Export parity: PASS")
        return

    print("Export parity: FAIL")
    if missing_in_js:
        print(f"Missing in JS: {missing_in_js}")
    if extra_in_js:
        print(f"Extra in JS: {extra_in_js}")


if __name__ == "__main__":
    main()
