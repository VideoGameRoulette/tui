#!/usr/bin/env python3
import argparse
from pathlib import Path


TEMPLATE = """import { Box } from "@mui/material";
import type { ReactNode } from "react";

export interface {name}Props {{
  children?: ReactNode;
}}

export function {name}({{ children }}: {name}Props) {{
  return <Box>{{children}}</Box>;
}}
"""


def main() -> None:
    parser = argparse.ArgumentParser(description="Create TSX component scaffold.")
    parser.add_argument("--name", required=True, help="Component name, e.g. FeatureCard")
    parser.add_argument("--out", required=True, help="Output file path, e.g. frontend/components/FeatureCard.tsx")
    args = parser.parse_args()

    out_path = Path(args.out)
    out_path.parent.mkdir(parents=True, exist_ok=True)
    content = TEMPLATE.format(name=args.name)
    out_path.write_text(content, encoding="utf-8")
    print(f"Created {out_path}")


if __name__ == "__main__":
    main()
